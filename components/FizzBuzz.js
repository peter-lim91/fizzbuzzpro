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
    axios
      .post(domain + '/api/upload', formData)
      .then((r) => setImage(r.data.image))
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='m-2'>Please upload an image that you want to "fizzbuzz"</p>
      <form
        onSubmit={handleImageSubmit}
        className=' flex flex-col justify-center items-center m-2'
      >
        <label htmlFor='file' className=''>
          Select Image{' '}
        </label>
        <input
          id='file'
          type='file'
          name='file'
          ref={fileInput}
          className='m-2'
        ></input>
        <button
          className='border-solid border-black border-2 rounded bg-gray-100 p-2'
          type='submit'
        >
          FizzBuzz!
        </button>
      </form>
      {image ? <FizzBuzzImage image={image} /> : null}
    </div>
  )
}
