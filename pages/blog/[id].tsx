import React, { useEffect, useState } from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import { client } from "../../libs/client"
import { format } from 'date-fns'
import SideBar from '../../components/layout/SideBar'
import styles from './Blog.module.scss'

const BlogId: NextPage<any> = ({ blog, categories, tags }) => {

  const title = `バーコード・ブログ: ${blog.title}`
  const description = `バーコード・ブログ: ${blog.title}`

  const [createdAt, setCreatedAt] = useState<string>()
  const [updatedAt, setUpdatedAt] = useState<string>()

  useEffect(() => {
    setCreatedAt(format(new Date(blog.createdAt), 'yyyy年MM月dd日'))
    setUpdatedAt(format(new Date(blog.updatedAt), 'yyyy年MM月dd日'))
  }, [blog.createdAt, blog.updatedAt])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="container">
        <div className="main">
          <h4>作成日時：{ createdAt }</h4>
          <h4>更新日時：{ updatedAt }</h4>
          <h1>{blog.title}</h1>
          <p>{blog.category && blog.category.name}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>

    </>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" })

  const paths = data.contents.map((content: any) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "blog", contentId: id })
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })

  return {
    props: {
      blog: data,
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}

export default BlogId