import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CUSTOMER_BY_PHONE, GET_TODAY_CHECK_INS } from '../apollo/query';
import { INSERT_CUSTOMER } from '../apollo/mutation';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Typography,
} from '@material-ui/core';

const CustomerForm = ({ phone, open, handleClose }) => {
  const [addCustomer] = useMutation(INSERT_CUSTOMER, {
    onCompleted: () => {
      console.log('Add Customer Success');

      handleClose();
    },
    onError: ({ graphQLErrors }) => {
      console.error(graphQLErrors);
      console.log('Error');
    },
    refetchQueries: [{ query: GET_TODAY_CHECK_INS }],
  });

  const { data } = useQuery(GET_CUSTOMER_BY_PHONE, {
    variables: {
      phone,
    },
  });

  const [customer, setCustomer] = React.useState({
    first_name: '',
    last_name: '',
    phone: phone || '',
    temperature: '',
    tech_required: [],
    services: [],
    date_checkIn: '',
    time_checkIn: '',
  });

  React.useEffect(() => {
    if (data) {
      setCustomer({ ...data.customer });
    }
  }, [data]);

  const handleChange = (e) => {
    setCustomer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addCustomer({
      variables: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        temperature: customer.temperature,
        services: customer.services,
        tech_required: customer.tech_required,
      },
    });
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography align='center' variant='h4'>
          JP Nails Customer Services
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name='first_name'
            label='First Name'
            variant='outlined'
            margin='dense'
            value={customer.first_name || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name='last_name'
            label='Last Name'
            variant='outlined'
            margin='dense'
            value={customer.last_name || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name='phone'
            label='Phone Number'
            variant='outlined'
            margin='dense'
            value={customer.phone || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type='text'
            name='temperature'
            label='Temperature'
            value={customer.temperature || ''}
            onChange={handleChange}
            variant='outlined'
            margin='dense'
            fullWidth
          />
          <FormControl variant='outlined' fullWidth margin='dense'>
            <InputLabel>Services</InputLabel>
            <Select
              name='services'
              multiple
              value={customer.services || []}
              onChange={handleChange}
            >
              <MenuItem value='pedicure'>Pedicure</MenuItem>
              <MenuItem value='manicure'>Manicure</MenuItem>
              <MenuItem value='fullset'>Full-Set</MenuItem>
              <MenuItem value='filling'>Fill-ins</MenuItem>
              <MenuItem value='mani-nochip'>Manicure Nochip</MenuItem>
              <MenuItem value='dipping'>Dipping</MenuItem>
              <MenuItem value='wax'>Wax</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='outlined' fullWidth margin='dense'>
            <InputLabel>Technicians Required</InputLabel>
            <Select
              name='tech_required'
              multiple
              value={customer.tech_required || []}
              onChange={handleChange}
            >
              <MenuItem value='rose'>Rose</MenuItem>
              <MenuItem value='jerry'>Jerry</MenuItem>
              <MenuItem value='paul'>Paul</MenuItem>
              <MenuItem value='denny'>Denny</MenuItem>
              <MenuItem value='lin'>Lin</MenuItem>
              <MenuItem value='kathy'>Kathy</MenuItem>
            </Select>
          </FormControl>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerForm;
