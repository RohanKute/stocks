import { loginContext } from "./MasterPage";
import { useContext, useState } from "react";


export default function Logout(props) {
    const [isLoggedIn, setIsLoggedIn] = useContext(loginContext);

    function handleOnSubmit() {
        localStorage.clear();
        setIsLoggedIn(false);
        props.setIsOnBoard(false);
    }
    return (
        <>
            <p>You are logged in</p>
            <button onClick={handleOnSubmit}>Logout</button>
        </>
    )
}