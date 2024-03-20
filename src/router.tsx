
import { createBrowserRouter,  } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { ChatsPage } from './pages/ChatsPage'
import { MyChatsPage } from './pages/MyChatsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'


export const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/public-chats',
      element: <ChatsPage />
    },
    {
      path: '/my-chats',
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
  ])