import Head from 'next/head'
import { createRef } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'


const UPLOAD_URL = 'http://localhost:3000/api/upload'

export default function Home() {
  const fileInput = createRef()

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', fileInput.current.files[0])
    axios.post(UPLOAD_URL, formData)
    .then(r => console.log(r.body))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to FizzBuzz Pro!</h1>
        <form onSubmit={handleSubmit}>
          <label>Select Image: </label>
          <input type="file" name="file" ref={fileInput}></input>
        <button type="submit">Submit</button>
        </form>
        {/* {file ?
        } */}
      </main>
    </div>
  )
}
