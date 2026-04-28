import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import { useEffect } from 'react'
import { Chat } from './component/Chat'

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    }
  }, [navigate])
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/c/:id' element={<Chat />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/SignUp' element={<SignUp />}></Route>
      </Routes>
    </>
  )
}

export default App
