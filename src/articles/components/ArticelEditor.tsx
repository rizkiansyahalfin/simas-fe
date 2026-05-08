// ArticleEditor.tsx
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function ArticleEditor({ value, onChange }: any) {
  return (
    <ReactQuill theme="snow" value={value} onChange={onChange} />
  )
}