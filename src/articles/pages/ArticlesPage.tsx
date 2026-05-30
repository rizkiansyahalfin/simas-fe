// ArticlesPage.tsx
import {
  useArticles,
  useDeleteArticle,
} from '../hooks/useArticles'
import EmptyState from '@/components/states/EmptyState'
import ErrorState from '@/components/states/ErrorState'
import PageSectionSkeleton from '@/components/states/PageSectionSkeleton'

export default function ArticlesPage() {
  const {
    data,
    isError,
    isLoading,
    refetch,
  } = useArticles()
  const deleteArticle = useDeleteArticle()

  if (isLoading) return <PageSectionSkeleton rows={5} />

  if (isError) {
    return (
      <ErrorState
        title="Artikel gagal dimuat"
        description="Silakan coba muat ulang data artikel."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Manajemen Artikel</h1>

      {data?.length ? (
        data.map((a) => (
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
        ))
      ) : (
        <EmptyState
          title="Belum ada artikel"
          description="Artikel yang dibuat akan tampil di halaman ini."
        />
      )}
    </div>
  )
}
