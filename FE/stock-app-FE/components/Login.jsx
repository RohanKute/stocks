import { useState } from "react";
import axios  from 'axios'

export default function Login({ renderLandingPage }) {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    function landingPage() {
        renderLandingPage(true)
    }

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }
   
  async  function handleSubmit(e){
         e.preventDefault();
         try {
            const res = await axios.post('http://localhost:3000/user/login' , data)
            localStorage.setItem('token' , res.data);
         } catch (error) {
            console.log(error)
         }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>Login Form</p>
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email" onChange={handleChange} value={data.email} />
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="password" onChange={handleChange} value={data.password} />
                <button type="submit">Submit</button>
            </form>
            <button onClick={landingPage}>Back</button>
        </>
    )
}



