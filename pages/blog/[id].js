import { client } from "../../libs/client"
import { format, compareAsc } from 'date-fns'

export default function BlogId({ blog }) {
  const createdAt = format(new Date(blog.createdAt), 'yyyy-MM-dd')

  return (
    <main>
      <h4>{ createdAt }</h4>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" })

  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "blog", contentId: id })

  return {
    props: {
      blog: data,
    },
  }
}