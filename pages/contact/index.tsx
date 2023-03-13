import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import styles from './Contact.module.scss'

const Contact: NextPage<any> = ({ categories, tags }) => {
  const title = `バーコード・ブログ: お問い合わせ`
  const description = `バーコード・ブログ: お問い合わせ`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Contact</h1>
          <p>お問い合わせ</p>
        </div>
      </header>

      <div className="container">
        <div className="main">
          
          <h2 className='page_title'>
            お問い合わせ
          </h2>

        </div>

        <SideBar categories={categories} tags={tags} />
      </div>

    </>
  )
}

export const getStaticProps = async () => {
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })

  return {
    props: {
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}

export default Contact
