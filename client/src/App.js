import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'

import  MainPage  from './pages/MainPage.jsx'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage'
import { SellPage} from './pages/SellPage.jsx'
import  AddPostPage  from './pages/fixed_AddPostPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage} from './pages/ProfilePage.jsx'
import { EditPostPage } from './pages/EditPostPage'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe} from './redux/features/auth/authSlice.js'
import ChatPostDetails from './pages/ChatPostDetail.jsx';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="post/:id" element={<PostPage />} />  {/* Use exact parameter */}
        <Route path="post/:id/edit" element={<EditPostPage />} />  {/* Edit post route */}
        <Route path="new" element={<AddPostPage />} />
        <Route path="/chat" element={<ChatPostDetails />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage/>} />
      </Routes>

      <ToastContainer position ='bottom-right'/>
    </Layout>
  );
}

export default App;
