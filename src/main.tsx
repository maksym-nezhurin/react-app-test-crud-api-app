import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css'
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
