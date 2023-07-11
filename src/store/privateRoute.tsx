import { Outlet, Navigate } from "react-router"

export default function PrivateRoute() {
 
  const token = localStorage.getItem('tokenAndDate'); 

  return (
    token ? <Outlet/> : <Navigate to='/'/>
  )
}
