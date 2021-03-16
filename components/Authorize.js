import { useState } from 'react'
import axios from 'axios'

function Authorize(props) {
  const [code, setCode] = useState()
  const [warning, setWarning] = useState()
  const API_URL = 'https://fizzbuzzpro.herokuapp.com/api'

  function handleAuthorize(e) {
    e.preventDefault()
    axios
      .post(API_URL + '/authorize', { code })
      .then((r) => {
        if (r.data.authorized) {
          props.setPage('fizzbuzz')
        } else {
          setWarning('Wrong Code')
        }
      })
  }

  function handleChange(e) {
    setCode(e.target.value)
  }
  return (
    <form onSubmit={handleAuthorize}>
      <label>Code: </label>
      <input type="code" placeholder="Code" onChange={handleChange}></input>
      <button type="submit"> Submit </button>
      {warning ? <div>{warning}</div> : null}
    </form>
  )
}

export default Authorize
