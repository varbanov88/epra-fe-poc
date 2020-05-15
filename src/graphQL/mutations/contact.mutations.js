import gql from "graphql-tag";

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    deleteContact(id: $id)
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: Int!, $input: ContactInput!) {
    updateContact(id: $id, input: $input)
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
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
