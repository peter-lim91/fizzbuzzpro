export default function test() {
  // set from image properties
  const container = {
    // backgroundImage: 'url(./exc3.jpg)',
    // width: '500px'
    position: 'absolute',
    width: '100%',
    height: '100%',
  }

  const imageStyle = {
    position: 'absolute',
    width: '90vw',
    height: 'auto',
    margin: '50px',
  }

  const svgStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }

  const polygonStyle = {
    fill: '#FFF8',
    stroke: 'purple',
    strokeWidth: 0,
  }
  return (
    <div style={container}>
      <img src={'exc3.jpg'} style={imageStyle}></img>
      {/* <div style={{height: '200px', background: 'pink'}}></div> */}
      <svg style={svgStyle}>
        <polygon points='400,10 350,290 160,310' style={polygonStyle} />
      </svg>
    </div>
  )
}
