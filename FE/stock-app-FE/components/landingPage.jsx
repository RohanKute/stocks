import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LandingPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [landingPage, setLandingPage] = useState(true);

    function renderLandingPage(value) {
        setLandingPage(value)
    }
    function updateLogin() {
        setShowLogin(true);
        setShowRegister(false);
        setLandingPage(false)
    }

    function updateRegister() {
        setShowRegister(true);
        setShowLogin(false);
        setLandingPage(false);
    }

    return (
        <>
            {!showLogin && !showRegister || landingPage ? (
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
                    {showLogin && !landingPage && <Login renderLandingPage={renderLandingPage} />}
                    {showRegister && !landingPage && <Register renderLandingPage={renderLandingPage} />}
                </>
            )
            }

        </>
    );
}
