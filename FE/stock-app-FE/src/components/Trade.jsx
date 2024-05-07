import { useState } from "react"
import BuyStock from "./BuyStock";
import SearchStockAndDisplay from "./SearchStockAndDisplay";
import { useNavigate } from "react-router-dom";


export default function Trade() {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();
    function handleClicked(){
        // setIsButtonClicked(true);
        navigate("/trade");

    }

    if (isButtonClicked) {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <button onClick={handleClicked}>Trade</button>
        </>
    )
}