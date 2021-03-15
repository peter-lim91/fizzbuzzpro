import { createRef } from 'react'
import axios from 'axios'

export default function FizzBuzz() {
  const fileInput = createRef()

  function handleImageSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', fileInput.current.files[0])
    axios.post(API_URL + '/upload', formData).then((r) => console.log(r.body))
  }
  return (
    <form onSubmit={handleImageSubmit}>
      <label>Select Image: </label>
      <input type="file" name="file" ref={fileInput}></input>
      <button type="submit">Submit</button>
    </form>
  )
}
