import { useState } from "react";
import { useLocation, useNavigate } from "react-router"
import { axiosInstance } from "../utils/axiosInstance";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AddAmount() {
    const navigate = useNavigate();
    const [transactionRes, setTransactionRes] = useState({});
    async function handleOnSubmit(e) {
        e.preventDefault();
        const data = {
            amount: e.target.amount.value,
        }
        const result = await axiosInstance.post('/user/add-amount', data);
        setTransactionRes(result.data);
    }
    const handleCloseAlert = () => {
        setTransactionRes({}); // Reset tradeResult to clear the alert
      };
    function handleClickBack(){
        navigate('/')
    }
    return (
        <>
            {transactionRes.messege == "success" ? (
                <>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={handleCloseAlert} severity="success">{`Amount Added Succesfully! New Balance is ${(Number(transactionRes.currentBalance).toFixed(2))}`}
                        </Alert>
                    </Stack>
                </>
            ) : (
                <></>
            )}
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="amount"></label>
                <input type="number" name="amount" />
                <button>Add Amount</button>
            </form>
            <button onClick={handleClickBack}>Back</button>
        </>
    )


}