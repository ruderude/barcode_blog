import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      Home
      <br />
      <Link href="/profile">
        Go to プロフィール
      </Link>
    </>
  )
}

export default Home
