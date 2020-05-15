import gql from "graphql-tag";

export const GET_ALL_CONTACTS = gql`
  query AllContacts {
    allContacts {
      id
      first_name
      last_name
      email
      company {
        id
        company_name
      }
    }
  }
`;
