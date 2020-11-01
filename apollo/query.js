import gql from 'graphql-tag';

export const GET_CUSTOMER_BY_PHONE = gql`
  query getCustomerByPhone($phone: String!) {
    customer(phone: $phone) {
      id
      first_name
      last_name
      phone
      checkIn {
        id
        temperature
        tech_required
        services
        date_checkIn
        time_checkIn
      }
      created_date
    }
  }
`;

export const CUSTOMERS = gql`
  query {
    customers {
      id
      first_name
      last_name
      phone
      checkIn {
        id
        temperature
        services
        tech_required
        date_checkIn
        time_checkIn
      }
    }
  }
`;

export const GET_TODAY_CHECK_INS = gql`
  query {
    getTodayCheckIn {
      id
      temperature
      services
      date_checkIn
      time_checkIn
      tech_required
      customer {
        id
        first_name
        last_name
        phone
      }
    }
  }
`;
