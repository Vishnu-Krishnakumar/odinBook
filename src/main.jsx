import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx'
import Main from './components/Main.jsx';
import UsersIndex from './components/UsersIndex.jsx';
import PostsIndex from './components/PostsIndex.jsx';
import { AuthProvider } from './context/authContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "profile/usersIndex",
        element: <UsersIndex />,
      },
      {
        path: "profile/postsIndex",
        element: <PostsIndex />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
      <RouterProvider router={router} />  
    </AuthProvider>,
)
