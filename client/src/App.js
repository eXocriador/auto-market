import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorMessage.jsx'
import { PageLoader } from './components/LoadingSpinner.jsx'

import MainPage from './pages/MainPage.jsx'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage'
import { SellPage } from './pages/SellPage.jsx'
import { EnhancedPostForm } from './components/EnhancedPostForm'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { EditPostPage } from './pages/EditPostPage'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMe } from './redux/features/auth/authSlice.js'
import ChatPostDetails from './pages/ChatPostDetail.jsx'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dispatch(getMe())
      } catch (error) {
        console.error('Error initializing app:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [dispatch])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="post/:id/edit" element={<EditPostPage />} />
          <Route path="new" element={<EnhancedPostForm />} />
          <Route path="/chat" element={<ChatPostDetails />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
