import { useState } from "react";
import axios from 'axios';

export default function Register(props) {
    const [formData, setFromData] = useState({ email: '', firstName: '', lastName: '', password: '' });

    function handleChange(e) {
        setFromData({ ...formData, [e.target.name]: e.target.value })
    }

    function landingPage() {
       props.renderMainPage(true);
    }

    async function handleSubmit(e){
       e.preventDefault();
         try {
            const res = await axios.post('http://localhost:3000/user/register' , formData);
            localStorage.setItem('token' , res.data);
            props.setIsOnBoard(false);
            loggedInStatus(true)
         } catch (error) {
            console.log('Something went wrong' , error);
         }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email </label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />

                <label htmlFor="firstName">First Name </label>
                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />

                <label htmlFor="lastName">Last Name </label>
                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />

                <label htmlFor="password">Password </label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
            <p>Register Form</p>
            <button onClick={landingPage}>Back</button>
        </>
    )
}
