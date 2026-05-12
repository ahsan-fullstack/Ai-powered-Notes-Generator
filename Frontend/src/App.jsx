import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import { useEffect } from 'react'
import { Chat } from './component/Chat'
import { Navbar } from './component/Navbar'
import { LayOut } from './component/Layout'
import { ProtectedRoute } from './component/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute><LayOut /></ProtectedRoute>}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/c/:id' element={<Chat />}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
    </>
  )
}

export default App
