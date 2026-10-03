import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Routes } from './Router' 



export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Routes /> 
    </QueryClientProvider>
  )
}