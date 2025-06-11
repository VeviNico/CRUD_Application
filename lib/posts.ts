import { v4 as uuidv4 } from 'uuid'

export type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

let posts: Post[] = [];

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function createPost(title: string, description: string): Promise<Post> {
  const newPost: Post = {
    id: crypto.randomUUID(),
    title,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return newPost;
}

export async function deletePost(id: string): Promise<void> {
  posts = posts.filter((post) => post.id !== id);
}

export async function updatePost(id: string, title: string, description: string): Promise<Post | null> {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    title,
    description,
    updatedAt: new Date().toISOString(),
  };

  return posts[index];
}
