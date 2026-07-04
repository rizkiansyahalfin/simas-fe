import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'

import AppErrorBoundary from '@/components/error/AppErrorBoundary'
import i18n from '@/i18n/config'

const queryClient = new QueryClient()

interface AppProvidersProps {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <BrowserRouter>
            <AppErrorBoundary>
              {children}
            </AppErrorBoundary>
          </BrowserRouter>
        </HelmetProvider>
      </I18nextProvider>
    </QueryClientProvider>
  )
}
