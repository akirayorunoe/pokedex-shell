import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense, lazy } from "react"
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const PokeList = lazy(() => import('./components/PokeList'))
const PokeDetail = lazy(() => import('pokedex-detail/PokeDetail')); // Load từ App Detail

const client = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter basename='/pokedex-shell/'>
          <Routes>
            <Route path="/" element={<PokeList />} />
            <Route path="/detail/:id" element={<PokeDetail />} />
          </Routes></BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
