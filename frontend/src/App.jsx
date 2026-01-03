import { Routes, Route } from 'react-router-dom'
import { ApiProvider } from './contexts/ApiContext'
import List from './pages/List'
import Form from './pages/Form'

function App() {
  return (
    <ApiProvider>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </ApiProvider>
  )
}

export default App
