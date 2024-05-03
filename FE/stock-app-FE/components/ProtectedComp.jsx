import axios from "axios"
import { useEffect, useState } from "react"


export default function ProtectedComponent(){
     const [userAuth, setUserAuth] = useState(false)
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (!token) {
            // No token found in localStorage, user is not authenticated
            setUserAuth(false);
            return;
          }
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}` // Include JWT token from localStorage
            }
          });
        async function auth(){
            const isValid = await axiosInstance.get('/auth');
            console.log(isValid);
            if(isValid.data){
                setUserAuth(true);
            }
            else{
                setUserAuth(false)
            }
      }
      auth();
    },[])
     return (
        <>
            {userAuth && <p>your in a protected route</p>}
        </>
     )
}