import { useState } from 'react'
import axios from 'axios'

function Register(props) {
  const [email, setEmail] = useState('')
  const API_URL = 'https://fizzbuzzpro.herokuapp.com/api'

  function handleGetCode(e) {
    e.preventDefault()
    if (!email) {
      return null
    }
    axios
      .post(API_URL + '/generatecode', { email })
      .then(() => props.setPage('authorize'))
  }

  function handleChange(e) {
    console.log('handlechange', e.target.value)
    setEmail(e.target.value)
  }

  return (
    <>
      <h2>Register Below!</h2>
      <form onSubmit={handleGetCode}>
        <label>Email: </label>
        <input type="email" placeholder="Email" onChange={handleChange} value={email}></input>
        <button type="submit"> Submit </button>
      </form>
    </>
  )
}

export default Register
