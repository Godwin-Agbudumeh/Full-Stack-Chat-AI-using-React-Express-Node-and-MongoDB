import './rootLayout.css'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import { useContext } from "react";
import { Context } from "../../context/Context";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  const { currentUser, dispatch } = useContext(Context); 

  const navigate = useNavigate()

  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"});
    navigate('/');
  }

  return (
      <QueryClientProvider client={queryClient}>
        <div className='rootLayout'>
          <header>
            <Link to='/' className='logo'>
                {/* <img src="logo.png" alt="" /> */}
                <span>GODWIN AI</span>
            </Link>
            {currentUser &&
              <div className='logout' onClick={handleLogout}>
                logout
              </div>
            }
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>  
  )
}
