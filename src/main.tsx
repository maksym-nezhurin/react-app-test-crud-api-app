import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css'

// const App = () => {
//   return (<div>Hello!</div>)
// }


const App2 = () => {
  return (<div>home!</div>)
}

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App2 />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
