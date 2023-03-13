import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link"
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import styles from './Category.module.scss'
import { BsFillBookmarkHeartFill } from 'react-icons/bs'

const CategoryId: NextPage<any> = ({ blogs, categories, tags, category }) => {
  const title = `バーコード・ブログ: カテゴリー【${category.name}】`
  const description = `バーコード・ブログ: カテゴリー【${category.name}】`

  if (blogs.length === 0) {
    return <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Category</h1>
          <p>{category.name}</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            カテゴリー：{category.name}
          </h2>

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
          <h1>Category</h1>
          <p>{category.name}</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            カテゴリー：{category.name}
          </h2>

          <div className={styles.categories_parent}>
            {categories.map((item: any) => (
              category.id === item.id ?
              <div key={item.id}>
                <Link href={`/category/${item.id}`}>
                  <span className={styles.categories_children} suppressHydrationWarning>
                    <BsFillBookmarkHeartFill color={'green'} />&nbsp;{item.name}
                  </span>
                </Link>
              </div>
              :
              <div key={item.id}>
                <Link href={`/category/${item.id}`}>
                  <span className={styles.categories_children} suppressHydrationWarning>
                    <BsFillBookmarkHeartFill color={'red'} />&nbsp;{item.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>

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
  const data = await client.get({ endpoint: "categories" })

  const paths = data.contents.map((content: any) => `/category/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${id}` } })
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })
  const category = await client.get({ endpoint: "categories", contentId: id })

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
      category: category
    },
  }
}

export default CategoryId