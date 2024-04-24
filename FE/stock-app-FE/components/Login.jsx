import { useState } from "react";


export default function Login({ renderLandingPage }) {
           
    function landingPage() {
        renderLandingPage(true)
    }
    return (
        <>
            <p>Login Form</p>
            <button onClick={landingPage}>Back</button>
        </>
    )
}
