import Head from 'next/head'
import { createRef, useState } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import Register from '../components/Register'
import Authorize from '../components/Authorize'
import FizzBuzz from '../components/FizzBuzz'



export async function getServerSideProps(context) {
  const API_URL = `http://${context.req.headers.host}/api`
  const res = await axios({
    method: 'get',
    url: `${API_URL}/state`,
    headers: context?.req?.headers?.cookie
      ? { cookie: context.req.headers.cookie }
      : undefined,
  })
  return { props: { authorized: res.data.authorized } }
}

export default function Home(props) {
  const [page, setPage] = useState(props.authorized ? 'fizzbuzz' : '')
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
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
