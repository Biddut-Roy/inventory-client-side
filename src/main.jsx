import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Route/Route'
import { HelmetProvider } from 'react-helmet-async'
import Authprovider from './Authprovider/Authprovider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Authprovider>
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    </HelmetProvider>
</Authprovider>  
  </React.StrictMode>,
)
