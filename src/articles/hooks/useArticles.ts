// src/features/articles/hooks/useArticles.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/axios'


export interface Article {
  id: string
  title: string
  content: string
  status: 'draft' | 'published'
}

// GET
export const useArticles = () =>
  useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data } = await api.get<Article[]>('/api/articles')
      return data
    },
  })

// CREATE
export const useCreateArticle = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (payload: Omit<Article, 'id'>) => {
      const { data } = await api.post('/api/articles', payload)
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['articles'] }),
  })
}

// UPDATE
export const useUpdateArticle = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (article: Article) => {
      const { data } = await api.put(`/api/articles/${article.id}`, article)
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['articles'] }),
  })
}

// DELETE
export const useDeleteArticle = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/articles/${id}`)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['articles'] }),
  })
}