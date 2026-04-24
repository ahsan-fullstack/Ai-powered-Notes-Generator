import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import ChatBox from './component/Chat'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    }
  }, [])
  return (
    <>
      <ChatBox />
      {/* <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/SignUp' element={<SignUp />}></Route>
        <Route path='/' element={<ChatBox />}></Route>
      </Routes> */}
    </>
  )
}

export default App
