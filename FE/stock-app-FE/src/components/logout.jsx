import { useNavigate } from "react-router";
import { loginContext } from "./MasterPage";
import { useContext, useState } from "react";


export default function Logout(props) {
    const [isLoggedIn, setIsLoggedIn] = useContext(loginContext);
    const navigate = useNavigate();
    function handleOnSubmit() {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/')
    }
    return (
        <>
            <button onClick={handleOnSubmit}>Logout</button>
        </>
    )
}