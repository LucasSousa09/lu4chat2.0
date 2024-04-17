
import { createBrowserRouter,  } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './layout/Layout'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { MyChatsPage } from './pages/MyChatsPage'
import { RegisterPage } from './pages/RegisterPage'
import { PublicChatsPage } from './pages/PublicChatsPage'

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/public-chats',
        element: <PublicChatsPage />
      },
      {
        path: '/my-chats',
        element: <ProtectedRoute> <MyChatsPage /> </ProtectedRoute>
      },
      {
        path: '/my-chats/:chatId',
        element: <ProtectedRoute><MyChatsPage /></ProtectedRoute>
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
    ]
  }
  ])