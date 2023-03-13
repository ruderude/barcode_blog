import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link"
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import styles from './Tags.module.scss'

const TagId: NextPage<any> = ({ blogs, categories, tags, tag }) => {
  const title = `バーコード・ブログ: ${tag.name}}`
  const description = `バーコード・ブログ: ${tag.name}`

  if (blogs.length === 0) {
    return <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Tag</h1>
          <p>{tag.name}</p>
        </div>
      </header>

      <div className="container">
        <div className="main">
          <p>ブログコンテンツがありません</p>
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>
    </>
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Tag</h1>
          <p>{tag.name}</p>
        </div>
      </header>

      <div className="container">
        <div className="main">
          <div>
            <ul>
              {blogs.map((blog: any) => (
                <li key={blog.id}>
                  <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>

    </>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tags" })

  const paths = data.contents.map((content: any) => `/tag/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${id}` } })
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })
  const tag = tagData.contents.find((tag: any) => tag.id === id)

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
      tag: tag
    },
  }
}

export default TagId