import { Routes, Route } from 'react-router-dom'
import { ApiProvider } from './contexts/ApiContext'
import List from './pages/List'

function App() {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </ApiProvider>
  )
}

export default App
