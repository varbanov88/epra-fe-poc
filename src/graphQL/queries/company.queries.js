import gql from "graphql-tag";

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    allCompanies {
      id
      company_name
    }
  }
`;
