import { useState, createRef } from 'react'
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
    axios.post(domain + '/api/upload', formData).then((r) => setImage(r.data.image))
  }
  return (
    <>
    <form onSubmit={handleImageSubmit}>
      <label>Select Image: </label>
      <input type='file' name='file' ref={fileInput}></input>
      <button type='submit'>Submit</button>
    </form>
    {image ? <FizzBuzzImage image={image} /> : null}
    </>
  )
}
