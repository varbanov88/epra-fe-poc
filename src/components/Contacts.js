import React from "react";
import * as Queries from "../graphQL/queries";
import { useQuery } from "react-apollo";
import ContactList from "./ContactList";

export default function Contacts() {
  const { data, loading, error } = useQuery(Queries.GET_ALL_CONTACTS);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }

  return <ContactList contacts={data.allContacts} />;
}
