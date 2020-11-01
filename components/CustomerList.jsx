import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { DELETE_CHECKIN } from '../apollo/mutation';
import { GET_TODAY_CHECK_INS } from '../apollo/query';
import { DeleteOutline } from '@material-ui/icons';
import React from 'react';
import { formatPhoneNumber } from '../utils/func';

const CustomerList = ({ customers }) => {
  const [deleteCheckIn] = useMutation(DELETE_CHECKIN, {
    refetchQueries: [{ query: GET_TODAY_CHECK_INS }],
  });

  const handleClick = (checkInId) => {
    deleteCheckIn({
      variables: {
        id: checkInId,
      },
      update: (cache) => {
        const { getTodayCheckIn } = cache.readQuery({
          query: GET_TODAY_CHECK_INS,
        });

        cache.writeQuery({
          query: GET_TODAY_CHECK_INS,
          data: {
            getTodayCheckIn: getTodayCheckIn.filter(
              (checkIn) => checkIn.id !== checkInId
            ),
          },
        });
      },
    });
  };

  return (
    <Box component={Paper} mt={2} p={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Phone</TableCell>
              <TableCell align='right'>Temperature</TableCell>
              <TableCell align='right'>Time</TableCell>
              <TableCell align='right'>Date</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers &&
              customers.map((customer, i) => (
                <TableRow
                  key={customer.id}
                  style={{ background: i % 2 === 0 && '#f4f4f4' }}
                >
                  <TableCell>
                    {customer.customer.first_name} {customer.customer.last_name}
                  </TableCell>
                  <TableCell align='right'>
                    {formatPhoneNumber(customer.customer.phone)}
                  </TableCell>
                  <TableCell align='right'>{customer.temperature}</TableCell>
                  <TableCell align='right'>{customer.time_checkIn}</TableCell>
                  <TableCell align='right'>{customer.date_checkIn}</TableCell>
                  <TableCell align='right'>
                    <IconButton
                      color='secondary'
                      onClick={() => handleClick(customer.id)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
