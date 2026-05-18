// ArticleForm.tsx
import { useState } from 'react'
import ArticleEditor from './ArticelEditor'


type ArticleStatus = 'draft' | 'published'

interface ArticleFormProps {
  initialData?: {
    title?: string
    content?: string
    status?: ArticleStatus
  }
  onSubmit: (data: { title: string; content: string; status: ArticleStatus }) => void
}

export default function ArticleForm({ initialData, onSubmit }: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [status, setStatus] = useState<ArticleStatus>(
    initialData?.status || 'draft'
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ title, content, status })
      }}
      className="space-y-4"
    >
      <input
        className="w-full border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul"
      />

      <ArticleEditor value={content} onChange={setContent} />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as ArticleStatus)}
        className="border p-2"
      >
        <option value="draft">Draft</option>
        <option value="published">Publish</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2">
        Simpan
      </button>
    </form>
  )
}