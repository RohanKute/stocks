import React, { useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';

export default function AccountDetail() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [details, setDetails] = useState(null); // Initialize details as null

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
      const res = await axiosInstance.get('http://localhost:3000/user/user-details');
      setDetails(res.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  function handleOnClickBack() {
    setIsButtonClicked(false);
    setDetails(null); // Reset details when going back
  }

  return (
    <>
      {!isButtonClicked ? (
        <button onClick={handleOnClick}>View Account Details</button>
      ) : (
        <>
          {details ? ( // Check if details is not null
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right">Money Withdrawn</TableCell>
                    <TableCell align="right">Trading Statement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableRow>
                    <TableCell align="right">{details.username}</TableCell>
                    <TableCell align="right">{details.userAccount?.balance?.toFixed(2)}</TableCell>
                    <TableCell align="right">{details.userAccount?.moneyWithdrawn?.toFixed(2)}</TableCell>
                    <TableCell align="right">{details.userAccount?.tradingStatement?.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
             <p>
              <CircularProgress size={20} color="inherit" />
             </p> // Display loading indicator while details are being fetched
          )}
          <button onClick={handleOnClickBack}>Back</button>
        </>
      )}
    </>
  );
}
