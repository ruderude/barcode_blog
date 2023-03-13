import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { client } from "../libs/client"
import SideBar from '../components/layout/SideBar'
import Card from '../components/elements/Card'

const Home: NextPage<any> = ({ blogs, categories, tags }) => {

  const title = `バーコード・ブログ: トップページ、ブログ一覧`
  const description = `バーコード・ブログ: トップページ、ブログ一覧`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>BarCode Blog</h1>
          <p>40歳デビューした厨二病プログラマの日記</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            ブログ一覧
          </h2>

          <div className={styles.card_container}>
            {blogs.map((blog: any) => (
              <div className={styles.card_box} key={blog.id}>
                <Card blog={blog} />
              </div>
            ))}
          </div>

        </div>

        <SideBar categories={categories} tags={tags} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" })
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })
  console.log(data)
  // console.log(categoryData)
  // console.log(tagData)

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}

export default Home
