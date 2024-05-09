// import { MDBBtn, MDBAlert } from 'mdb-react-ui-kit';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
export default function BuyStock({ stockInfo }) {
    const [tradeResult, setTradeResult] = useState({ messege: "", quantity: "", stock: "", totalPurchaceAmout: 0 });


    async function handleBuySubmit(e) {
        e.preventDefault();
        const data = {
            quantity: e.target.quantity.value,
            stockName: stockInfo.companyName
        }
        const result = await axiosInstance.post('/trade/buy', data);
        setTradeResult(result.data)
    }

    const handleCloseAlert = () => {
        setTradeResult({ message: "", quantity: "", stock: "", totalPurchaceAmout: 0 }); // Reset tradeResult to clear the alert
    };
    return (
        <>
            {tradeResult.messege == "success" ? (
                <>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={handleCloseAlert} severity="success">{`Bought ${tradeResult.quantity} ${tradeResult.stock} for ${tradeResult.totalPurchaceAmout} `}
                        </Alert>
                    </Stack>
                </>
            ) : (
                <></>
            )}
            <form onSubmit={handleBuySubmit}>
                <label htmlFor="quantity"></label>
                <input type="number" name="quantity" e />
                <button type='submit'>Buy</button>
            </form>
        </>
    )
}

