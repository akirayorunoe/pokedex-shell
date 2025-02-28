import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import PokeList from "./components/PokeList"
import { Suspense } from "react"
import './App.css'

const client = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <PokeList /></Suspense>
    </QueryClientProvider>
  )
}

export default App
