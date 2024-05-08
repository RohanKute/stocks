import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function MainPage({ setIsOnBoard }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [MainPage, setMainPage] = useState(true);

    function renderMainPage(value) {
        setMainPage(value)
    }
    function updateLogin() {
        setShowLogin(true);
        setShowRegister(false);
        setMainPage(false)
    }

    function updateRegister() {
        setShowRegister(true);
        setShowLogin(false);
        setMainPage(false);
    }

    return (
        <>
            <div style={{ border: "2px solid aqua", padding: "2em" }}>
                {!showLogin && !showRegister || MainPage ? (
                    <>
                        <button onClick={updateLogin}>
                            Login

                        </button>
                        <button onClick={updateRegister}>
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        {showLogin && !MainPage && <Login renderMainPage={renderMainPage} setIsOnBoard={setIsOnBoard} />}
                        {showRegister && !MainPage && <Register renderMainPage={renderMainPage} setIsOnBoard={setIsOnBoard} />}
                    </>
                )
                }
            </div>
            {/* <ProtectedComponent/> */}
        </>
    );
}
