import { v4 as uuidv4 } from 'uuid'

export type Post = {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

let posts: Post[] = []

export const getPosts = (): Post[] => posts

export const createPost = (title: string, description: string): Post => {
  const newPost = {
    id: uuidv4(),
    title,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  posts = [newPost, ...posts]
  return newPost
}

export const updatePost = (id: string, title: string, description: string): Post | null => {
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) return null
  posts[index] = { ...posts[index], title, description, updatedAt: new Date().toISOString() }
  return posts[index]
}

export const deletePost = (id: string): void => {
  posts = posts.filter(p => p.id !== id)
}
