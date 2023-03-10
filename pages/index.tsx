import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <h1>
        Home
      </h1>
      <h1>
        Home
      </h1>
      <h1>
        Home
      </h1>
      <br />
      <Link href="/profile">
        Go to プロフィール
      </Link>
      <div className={styles.test}>
        test
      </div>
    </>
  )
}

export default Home
