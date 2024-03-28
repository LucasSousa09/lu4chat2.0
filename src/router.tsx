
import { createBrowserRouter,  } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { PublicChatsPage } from './pages/PublicChatsPage'
import { MyChatsPage } from './pages/MyChatsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Layout } from './layout/Layout'


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
        element: <MyChatsPage />
      },
      {
        path: '/my-chats/:chatId',
        element: <MyChatsPage />
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