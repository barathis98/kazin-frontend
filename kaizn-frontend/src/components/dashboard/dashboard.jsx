import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from '@mui/material';

function Dashboard() {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchData();
  }, [searchField, searchValue]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      let url = `http://${process.env.REACT_APP_SERVER_IP}:8000/backend/dashboard`;
      if (searchField && searchValue) {
        url += `?${encodeURIComponent(searchField)}=${encodeURIComponent(searchValue)}`;
      }
      const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Authorization': `Token ${token}`,
          'Accept':'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.results);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    fetchData();
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('userToken');
    // Redirect or perform any other action after logout if needed
    window.location.reload();

  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard Data
      </Typography>
      <TextField
        label="Field"
        value={searchField}
        onChange={handleFieldChange}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Value"
        value={searchValue}
        onChange={handleValueChange}
        variant="outlined"
        margin="normal"
      />
      {/* <Button variant="contained" onClick={handleSearchClick}>
        Search
      </Button> */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {Object.values(item).map((value, cellIndex) => (
                  <TableCell key={cellIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Dashboard;
