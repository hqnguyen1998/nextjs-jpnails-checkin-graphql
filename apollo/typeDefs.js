import { gql } from '@apollo/client';

export const typeDefs = gql`
  scalar Date

  type Customer {
    id: ID!
    first_name: String!
    last_name: String!
    phone: String!
    checkIn: [CheckIn!]
    created_date: Date!
  }

  type CheckIn {
    id: ID!
    temperature: String!
    services: [String!]
    date_checkIn: String!
    time_checkIn: String!
    tech_required: [String!]
    customer: Customer!
    created_date: Date!
  }

  input CustomerInput {
    first_name: String!
    last_name: String!
    phone: String!
  }

  input CheckInInput {
    temperature: String
    services: [String]
    tech_required: [String]
  }

  type Query {
    customers: [Customer!]
    customer(phone: String!): Customer!
    getTodayCheckIn: [CheckIn!]
  }

  type Mutation {
    insert_customer(input: CustomerInput, checkInInput: CheckInInput): Customer!
    delete_checkin(id: ID!): CheckIn
  }
`;
