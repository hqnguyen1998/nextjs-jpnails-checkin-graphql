import { Button, TextField } from '@material-ui/core';
import CustomerList from '../components/CustomerList';
import Layout from '../layouts/Layout';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../apollo/client';
import { CUSTOMERS, GET_TODAY_CHECK_INS } from '../apollo/query';
import React from 'react';
import CustomerForm from '../components/CustomerForm';

export default function Home() {
  const {
    data: { getTodayCheckIn },
  } = useQuery(GET_TODAY_CHECK_INS);

  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState('');

  const handleSubmitForm = (e) => {
    e.preventDefault();

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout title='JP Nails - Tracking customers'>
      <form onSubmit={handleSubmitForm}>
        <TextField
          label='Phone Number'
          placeholder='1234567890'
          variant='outlined'
          margin='dense'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Submit
        </Button>
        {open && (
          <CustomerForm open={open} phone={phone} handleClose={handleClose} />
        )}
      </form>
      <CustomerList customers={getTodayCheckIn} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_TODAY_CHECK_INS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
