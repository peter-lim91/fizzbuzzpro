import Head from 'next/head'
import { createRef, useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import Register from '../components/Register'
import Authorize from '../components/Authorize'
import FizzBuzz from '../components/FizzBuzz'
import { API_URL } from '../components/api'

export async function getServerSideProps(context) {
  const res = await axios({
    method: 'get',
    url: `${API_URL}/checkauth`,
    headers: context?.req?.headers?.cookie
      ? { cookie: context.req.headers.cookie }
      : undefined,
  })
  return { props: { authorized: res.data.authorized } }
}

export default function Home(props) {
  const [domain, setDomain] = useState('')
  const [page, setPage] = useState(props.authorized ? 'fizzbuzz' : '')

  useEffect(() => {
    setDomain(window.location.origin)
    console.log(window.location.origin)
  }, [])

  return (
    <div>
      <Head>
        <title>FizzBuzz Pro</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={'font-sans text-6xl m-8'}>Welcome to FizzBuzz Pro!</h1>
        <p className={'font-sans m-4'}>
          Legend:
          <br />
          Red = Fizz
          <br />
          Green = Buzz
          <br /> Blue = FizzBuzz
        </p>
        {page === '' ? <Register setPage={setPage} domain={domain} /> : null}
        {page === 'authorize' ? (
          <Authorize setPage={setPage} domain={domain} />
        ) : null}
        {page === 'fizzbuzz' ? (
          <FizzBuzz setPage={setPage} domain={domain} />
        ) : null}
      </main>
    </div>
  )
}
