import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import BoardPage from './pages/BoardPage'
import PostWritePage from './pages/PostWritePage'
import PostDetailPage from './pages/PostDetailPage'

const App = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return null

  return (
    <BrowserRouter basename="/my-react-website/my-community">
      <Routes>
        <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!session ? <RegisterPage /> : <Navigate to="/" replace />} />
        <Route path="/" element={session ? <BoardPage session={session} /> : <Navigate to="/login" replace />} />
        <Route path="/write" element={session ? <PostWritePage session={session} /> : <Navigate to="/login" replace />} />
        <Route path="/post/:id" element={session ? <PostDetailPage session={session} /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
