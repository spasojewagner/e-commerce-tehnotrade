import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Kreiranje QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Podrazumevano vreme kada se podaci smatraju "svežim" (5 minuta)
      staleTime: 5 * 60 * 1000,
      // Vreme čuvanja podataka u cache-u (10 minuta)
      gcTime: 10 * 60 * 1000, // ranije se zvalo cacheTime
      // Automatski refetch kada se fokusira prozor
      refetchOnWindowFocus: false,
      // Retry logika
      retry: (failureCount, error) => {
        // Ne pokušavaj ponovo za 404 greške
        if (error?.message?.includes('404')) return false;
        // Maksimalno 3 pokušaja
        return failureCount < 3;
      },
      // Interval za retry (eksponencijalno povećanje)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry za mutations
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)