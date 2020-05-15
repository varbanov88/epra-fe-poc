import React from "react";
import CompanyList from "./CompanyList";
import * as Queries from "../graphQL/queries";
import { useQuery } from "@apollo/react-hooks";

export default function Companies() {
  const { data, loading, error } = useQuery(Queries.GET_ALL_COMPANIES);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }

  return <CompanyList companies={data.allCompanies} />;
}
