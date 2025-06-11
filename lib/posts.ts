// lib/posts.ts

export type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

let posts: Post[] = [];

// GET all posts
export function getPosts(): Promise<Post[]> {
  return Promise.resolve(posts);
}

// CREATE a new post
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

// UPDATE an existing post
export async function updatePost(id: string, title: string, description: string): Promise<Post | null> {
  const post = posts.find((p) => p.id === id);
  if (!post) return null;

  post.title = title;
  post.description = description;
  post.updatedAt = new Date().toISOString();
  return post;
}

// DELETE a post
export async function deletePost(id: string): Promise<void> {
  posts = posts.filter((p) => p.id !== id);
}
