import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { client } from "../libs/client"

export const getStaticProps = async () => {
  console.log("API_KEY", process.env.API_KEY)
  const data = await client.get({ endpoint: "blog" })
  console.log(data)

  return {
    props: {
      blogs: data.contents,
    },
  }
}

const Home: NextPage<any> = ({ blogs }) => {

  return (
    <>
      <h1>
        Home
      </h1>

      <br />

      <div>
        <ul>
          {blogs.map((blog: any) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Home
