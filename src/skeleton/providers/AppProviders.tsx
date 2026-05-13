import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import type { ReactNode } from 'react'

import AppErrorBoundary from '../error/AppErrorBoundary'

const queryClient = new QueryClient()

interface AppProvidersProps {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppErrorBoundary>
          {children}
        </AppErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
