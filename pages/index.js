import Head from 'next/head'
import { createRef, useState } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import Register from '../components/Register'
import Authorize from '../components/Authorize'
import FizzBuzz from '../components/FizzBuzz'

const API_URL = 'http://localhost:3000/api'

export async function getServerSideProps(context) {
  const res = await axios.get(API_URL + '/state')
  const state = res.data

  return { props: { authorized: state.authorized } }
}

export default function Home(props) {
  console.log(props.authorized)
  const [page, setPage] = useState(props.authorized ? 'fizzbuzz' : '')

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to FizzBuzz Pro!</h1>
        {page === '' ? <Register setPage={setPage} /> : null}
        {page === 'authorize' ? <Authorize setPage={setPage} /> : null}
        {page === 'fizzbuzz' ? <FizzBuzz setPage={setPage} /> : null}
      </main>
    </div>
  )
}
