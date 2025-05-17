import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense, lazy } from "react"
import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom';

const PokeList = lazy(() => import('./components/PokeList'))
const PokeDetail = lazy(() => import('pokedex-detail/PokeDetail')); // Load từ App Detail
const Counter = lazy(() => import('pokedex-detail/Counter'));
import { useDispatch } from 'react-redux';
import { increment, decrement, reset } from './counterSlice';

const client = new QueryClient()
function App() {
  const dispatch = useDispatch();
  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Counter />
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())} style={{ margin: '0 10px' }}>-</button>
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
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
