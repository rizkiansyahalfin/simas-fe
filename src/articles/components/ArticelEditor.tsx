// ArticleEditor.tsx
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface ArticleEditorProps {
  value: string
  onChange: (content: string) => void
}

export default function ArticleEditor({ value, onChange }: ArticleEditorProps) {
  return (
    <ReactQuill theme="snow" value={value} onChange={onChange} />
  )
}