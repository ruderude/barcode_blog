import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import Card from '../../components/elements/Card'
import styles from './Category.module.scss'
import { BsFillBookmarkHeartFill } from 'react-icons/bs'

const Category: NextPage<any> = ({ blogs, categories, tags }) => {
  const title = `バーコード・ブログ: カテゴリー一覧`
  const description = `バーコード・ブログ: カテゴリー一覧`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Categories</h1>
          <p>カテゴリー一覧</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2>
            カテゴリー一覧
          </h2>

          <div className={styles.categories_parent}>
            {categories.map((category: any) => (
              <div key={category.id}>
                <Link href={`/category/${category.id}`}>
                  <span className={styles.categories_children} suppressHydrationWarning>
                    <BsFillBookmarkHeartFill color={'red'} />&nbsp;{category.name}
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

export default Category
