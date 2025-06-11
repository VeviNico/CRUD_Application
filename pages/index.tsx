import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, deletePost, getPosts, updatePost, Post } from '../lib/posts'

type SortOption = 'date' | 'title'

export default function Home() {
  const queryClient = useQueryClient()
  const { data: posts = [] } = useQuery({ queryKey: ['posts'], queryFn: getPosts })

  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('date')

  const create = useMutation({
    mutationFn: () => createPost(title, desc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setTitle('')
      setDesc('')
    }
  })

  const edit = useMutation({
    mutationFn: () => {
      if (!editingPost) return null
      return updatePost(editingPost.id, title, desc)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      setEditingPost(null)
      setTitle('')
      setDesc('')
    }
  })

  const remove = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries(['posts'])
  })

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Sort by:</label>
        <select
          className="border px-2 py-1"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {editingPost ? (
          <button
            className="bg-yellow-500 text-white px-4 py-2"
            onClick={() => edit.mutate()}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => create.mutate()}
          >
            Post
          </button>
        )}
      </div>

      <ul>
        {sortedPosts.map((post) => (
          <li key={post.id} className="border rounded mb-4 p-3">
            <div className="font-semibold">{post.title}</div>
            <p>{post.description}</p>
            <p className="text-sm text-gray-400">
              Created: {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              Updated: {new Date(post.updatedAt).toLocaleString()}
            </p>
            <div className="mt-2 space-x-2">
              <button
                className="text-yellow-600"
                onClick={() => {
                  setEditingPost(post)
                  setTitle(post.title)
                  setDesc(post.description)
                }}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => remove.mutate(post.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
