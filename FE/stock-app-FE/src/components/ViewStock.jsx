import React, { useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ViewStocks() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [stocks, setStocks] = useState([]);

  async function handleOnClick() {
    setIsButtonClicked(true);
    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    });
    try {
      const res = await axiosInstance.get('http://localhost:3000/user/view-stocks');
      setStocks(res.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  async function handleOnClickSell(stock) {
    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    });
    try {
      await axiosInstance.post('http://localhost:3000/trade/sell', {
        id: stock.id,
        quantity: stock.quantity,
        stockName: stock.name,
        buyPrice : stock.buyPrice
      });
      const res = await axiosInstance.get('http://localhost:3000/user/view-stocks');
      setStocks(res.data);
    } catch (error) {
      console.error('Error selling stock:', error);
    }
  }

  function handleOnClickBack() {
    setIsButtonClicked(false);
    setStocks(null);
  }

  return (
    <>
      {!isButtonClicked ? (
        <button onClick={handleOnClick}>View Stocks</button>
      ) : (
        <>
          {stocks ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Stock Name</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Buy Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Purchase</TableCell>
                    <TableCell>Sell Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stocks.map((stock, index) => (
                    <TableRow key={index}>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell>{stock.symbol}</TableCell>
                      <TableCell>{stock.buyPrice.toFixed(2)}</TableCell>
                      <TableCell>{stock.quantity}</TableCell>
                      <TableCell>{stock.totalPurchase.toFixed(2)}</TableCell>
                      <TableCell>{stock.sellPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <button onClick={() => handleOnClickSell(stock)}>Sell</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={handleOnClickBack}>Back</button>
        </>
      )}
    </>
  );
}
