// ArticlesPage.tsx
import {
  useArticles,
  useDeleteArticle,
} from '../hooks/useArticles'

export default function ArticlesPage() {
  const { data, isLoading } = useArticles()
  const deleteArticle = useDeleteArticle()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Manajemen Artikel</h1>

      {data?.map((a) => (
        <div
          key={a.id}
          className="border p-4 flex justify-between"
        >
          <div>
            <h2>{a.title}</h2>
            <p>{a.status}</p>
          </div>

          <button
            onClick={() => deleteArticle.mutate(a.id)}
            className="text-red-500"
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  )
}