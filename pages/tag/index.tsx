import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import Card from '../../components/elements/Card'
import styles from './Tags.module.scss'
import { FaTags } from 'react-icons/fa'

const Tags: NextPage<any> = ({ blogs, categories, tags }) => {
  const title = `バーコード・ブログ: タグ一覧`
  const description = `バーコード・ブログ: タグ一覧`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Tags</h1>
          <p>タグ一覧</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            タグ一覧
          </h2>

          <div className={styles.tags_parent}>
            {tags.map((tag: any) => (
              <div key={tag.id}>
                <Link href={`/tag/${tag.id}`}>
                  <span className={styles.tags_children} suppressHydrationWarning>
                    <FaTags color={'red'} />&nbsp;{tag.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>

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

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}

export default Tags
