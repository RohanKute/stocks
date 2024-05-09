import { useContext, useState } from "react";
import axios from 'axios'
import { loginContext } from "./MasterPage";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login(props) {
    const [isLoggedIn, setIsLoggedIn] = useContext(loginContext);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    function landingPage() {
        props.renderMainPage(true)
    }

    function handleClick() {
        setIsButtonClicked(true);
    };
    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/user/login', data)
            console.log(res);
            localStorage.setItem('token', res.data);
            props.setIsOnBoard(false);
            setIsLoggedIn(true)
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
                <button style={{ width: "80px" }} onClick={handleClick} type="submit">
                    {!isButtonClicked ? "Login" : <CircularProgress size={20} color="inherit" />}
                </button>
            </form>
            <button onClick={landingPage}>Back</button>
        </>
    )
}



