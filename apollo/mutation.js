import { gql } from '@apollo/client';

export const DELETE_CHECKIN = gql`
  mutation delete_checkIn($id: ID!) {
    delete_checkin(id: $id) {
      id
      temperature
      tech_required
      services
      time_checkIn
      date_checkIn
    }
  }
`;

export const INSERT_CUSTOMER = gql`
  mutation insert_customer(
    $first_name: String!
    $last_name: String!
    $phone: String!
    $temperature: String
    $services: [String]
    $tech_required: [String]
  ) {
    insert_customer(
      input: { first_name: $first_name, last_name: $last_name, phone: $phone }
      checkInInput: {
        temperature: $temperature
        services: $services
        tech_required: $tech_required
      }
    ) {
      id
      first_name
      last_name
      phone
      checkIn {
        id
        temperature
        tech_required
      }
      created_date
    }
  }
`;
