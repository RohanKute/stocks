import React, { createContext, useEffect, useState } from "react"
import SearchStockAndDisplay from "./SearchStockAndDisplay"
import MainPage from "./MainPage"
import Logout from "./logout";
import authUser from "../utils/authUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetOnBoard from "./GetOnBoard";
import Trade from "./Trade";
import AccountDetail from "./Userdetail";
import ViewStocks from "./ViewStock";

export const loginContext = createContext();


export default function MasterPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isOnBoard, setIsOnBoard] = useState(false)
    useEffect(() => {
        const checkAuth = async () => {
            let authStatus = await authUser();
            setIsLoggedIn(authStatus.data)
        };

        checkAuth();
    }, []);

    return (
        <>
            <loginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
                <Router>
                    <Routes>
                        <Route path="/" element={
                            <>
                                {!isOnBoard && <SearchStockAndDisplay />}
                                {isLoggedIn && <Trade loggedInStatus={setIsLoggedIn} />}
                                {!isLoggedIn && <GetOnBoard setIsOnBoard={setIsOnBoard} />}
                                {isLoggedIn && <Logout setIsOnBoard={setIsOnBoard} />}
                                {isLoggedIn && <AccountDetail/>}
                                {isLoggedIn && <ViewStocks/>}


                            </>
                        } />
                    <Route path="/trade" element={
                            <>
                                {!isOnBoard && <SearchStockAndDisplay />}
                                {isLoggedIn && <Logout />}
                                {isLoggedIn && <AccountDetail/>}
                            </>
                        } />

                    <Route path="/view-stocks" element={
                            <>
                                {isLoggedIn && <ViewStocks/>}
                            </>
                        } />
                    </Routes>
                </Router>

            </loginContext.Provider>
        </>
    )
}
