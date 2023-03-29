import { createComment, fetchComments } from "@/libs/database"
import type { NextApiRequest, NextApiResponse } from "next"

const getComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body

  const comments = await fetchComments()

  return res.status(200).json(comments)
}

const postComment = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body

    const comment = await createComment({
        blogId: body.blogId,
        name: body.name,
        comment: body.comment,
        createdAt: new Date(),
    })

    return res.status(200).json(comment)
}

const apiRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await getComments(req, res)
    case "POST":
      return await postComment(req, res)
    default:
      return res.status(405).json({message: "Method not allowed"})
  }
}

export default apiRequest
