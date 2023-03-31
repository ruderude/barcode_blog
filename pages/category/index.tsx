import type { NextPage } from 'next'
import React, { useEffect } from "react"
import Head from 'next/head'
import { client } from "../../libs/client"
import { useRouter } from "next/router"

const Category: NextPage<any> = ({ categories }) => {
  const title = `バーコード・ブログ: カテゴリー一覧`
  const description = `バーコード・ブログ: カテゴリー一覧`

  console.log('categories: ', categories[0].id)

  const router = useRouter()
  const first = categories.length - 1
  const url = `/category/${categories[first].id}`

  useEffect(() => {
    router.push(url)
  }, [router, url])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  )
}

export const getStaticProps = async () => {
  const categoryData = await client.get({ endpoint: "categories" })

  return {
    props: {
      categories: categoryData.contents,
    },
  }
}

export default Category
