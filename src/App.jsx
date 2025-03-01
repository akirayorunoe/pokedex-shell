import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense, lazy } from "react"
import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom';

const PokeList = lazy(() => import('./components/PokeList'))
const PokeDetail = lazy(() => import('pokedex-detail/PokeDetail')); // Load từ App Detail

const client = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<PokeList />} />
            <Route path="/detail/:id" element={<PokeDetail />} />
          </Routes></HashRouter>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
