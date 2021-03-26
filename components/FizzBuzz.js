import { useState, createRef } from 'react'
import { Link } from 'next/link'
import axios from 'axios'
import FizzBuzzImage from './FizzBuzzImage'

export default function FizzBuzz(props) {
  const { domain } = props
  const fileInput = createRef()
  const [image, setImage] = useState()

  function handleImageSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', fileInput.current.files[0])
    axios
      .post(domain + '/api/upload', formData)
      .then((r) => setImage(r.data.image))
  }
  return (
    <>
      <p>
        Please upload an image that you want to "fizzbuzz". It can be any image
        with numbers.
      </p>
      {/* <Link to='/example.png'> */}
      <a href='/example.png' download>
        Click here for a sample image to use
      </a>
      {/* </Link> */}
      <form onSubmit={handleImageSubmit}>
        <label>Select Image: </label>
        <input type='file' name='file' ref={fileInput}></input>
        <br />
        <button type='submit'>FizzBuzz!</button>
      </form>
      {image ? <FizzBuzzImage image={image} /> : null}
    </>
  )
}
