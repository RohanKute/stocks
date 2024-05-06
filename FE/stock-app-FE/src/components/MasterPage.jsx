import React, { createContext, useState } from "react"
import SearchStockAndDisplay from "./SearchStockAndDisplay"
import MainPage from "./MainPage"
import Logout from "./logout";
import authUser from "../utils/authUser";
import { Router, Routes, Route } from "react-router-dom"
import GetOnBoard from "./GetOnBoard";

export const loginContext = createContext();
export default function MasterPage() {
    const checkLogin = authUser();
    const [isLoggedIn, setIsLoggedIn] = useState(checkLogin)
    const [isOnBoard, setIsOnBoard] = useState(false)
    return (
        <>
            <loginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
                {!isOnBoard && <SearchStockAndDisplay />}
                {/* {!isLoggedIn && <MainPage loggedInStatus={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
                {isLoggedIn && <Logout loggedInStatus={setIsLoggedIn} />} */}
                {/* {isLoggedIn && <Trade loggedInStatus={setIsLoggedIn} />} */}
                {!isLoggedIn && <GetOnBoard setIsOnBoard={setIsOnBoard} />}
                {isLoggedIn && <Logout setIsOnBoard={setIsOnBoard} />}

            </loginContext.Provider>
        </>
    )
}