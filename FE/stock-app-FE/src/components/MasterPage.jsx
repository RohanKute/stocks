import { useState } from "react"
import SearchStockAndDisplay from "./SearchStockAndDisplay"
import MainPage from "./MainPage"
import Logout  from "./logout";
import authUser from "../utils/authUser";
export default function MasterPage() {
    const checkLogin = authUser();
    const [isLoggedIn, setIsLoggedIn] = useState(checkLogin)
    return (
        <>
            <div>
                <SearchStockAndDisplay isLoggedIn={isLoggedIn} />
                {!isLoggedIn && <MainPage loggedInStatus={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
                {isLoggedIn && <Logout loggedInStatus={setIsLoggedIn} />}
            </div>
        </>
    )
}