require('dotenv').config()
const path = require('path')
const gm = require('gm')
const vision = require('@google-cloud/vision')

module.exports = { detectFulltext }

function fizzbuzz(number) {
  let result = ''
  if (number % 3 === 0) {
    result += 'fizz'
  }
  if (number % 5 === 0) {
    result += 'buzz'
  }
  return result
}

function getPolyVertices(obj) {
  const vertices = obj.boundingBox.vertices
  const verticesArray = []
  for (const vertex of vertices) {
    verticesArray.push([vertex.x, vertex.y])
  }
  return verticesArray
}

async function detectFulltext(imageBuffer) {
  return new Promise(async (resolve, reject) => {
    const client = new vision.ImageAnnotatorClient({
      credentials: {
        client_email: process.env.GV_CLIENT_EMAIL,
        private_key: process.env.GV_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      },
    })
  
    const [result] = await client.documentTextDetection(imageBuffer)
    const image = gm(imageBuffer)
    image.autoOrient()
    const fullTextAnnotation = result.fullTextAnnotation
    fullTextAnnotation.pages.forEach((page) => {
      page.blocks.forEach((block) => {
        block.paragraphs.forEach((paragraph) => {
          paragraph.words.forEach((word) => {
            const wordText = word.symbols.map((s) => s.text).join('')
            const number = parseInt(wordText)
            if ((fb = fizzbuzz(number))) {
              const corners = getPolyVertices(word)
              const vertexText = [
                word.boundingBox.vertices[0].x,
                word.boundingBox.vertices[2].y,
              ]
              const font = path.join(__dirname, 'fonts','arial.ttf')
              // const font = "Helvetica"
              console.log(font)
              image
                .font(font, 25)
                .fill('white')
                .drawPolygon(...corners)
                .fill('black')
                .drawText(...vertexText, fb)
            }
          })
        })
      })
    })
    // image.write(`${Date.now()}.jpg`, () => {})
    image.toBuffer(null, (err, buffer) => {
      if (err) reject(err)
      const base64Image = buffer.toString('base64')
      resolve(base64Image)
    })

  })
}
