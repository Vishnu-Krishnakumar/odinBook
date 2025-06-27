import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import SignIn from './components/SignIn.jsx';
import Profile from './components/Profile.jsx'
import Main from './components/Main.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },
  {
    path: "profile",
    element: <Profile/>,
  },
  {
    path:"signIn",
    element:<SignIn/>,
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
