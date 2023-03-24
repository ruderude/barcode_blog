import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type CommentInput = {
    blogId: string,
    name: string,
    comment: string,
}

export async function createComment(params: CommentInput) {
    return await prisma.comment.create({data: params});
}

export async function fetchComments() {
  return await prisma.comment.findMany();
}