import React, { useState, useEffect, Fragment } from "react";
import { useMutation } from "@apollo/react-hooks";
import MaterialTable from "material-table";
import * as Mutations from "../graphQL/mutations";
import ContactDialog from "./ContactDialog";
import { AddCircle } from "@material-ui/icons";

export default function ContactList({ contacts }) {
  const [openContactForm, setOpenContactForm] = useState(false);
  const [state, setState] = useState({
    columns: [
      {
        title: "Name",
        field: "first_name",
      },
      { title: "Last Name", field: "last_name" },
      { title: "Email", field: "email" },
      {
        title: "Company",
        field: "company.company_name",
        editable: "never",
      },
    ],
    data: contacts,
  });

  const [deleteContact] = useMutation(Mutations.DELETE_CONTACT);
  const [updateContact] = useMutation(Mutations.UPDATE_CONTACT);
  useEffect(() => {}, [openContactForm]);
  const handleOnRowUpdate = (newData) => {
    const { id, first_name, last_name, email, company } = newData;
    updateContact({
      variables: {
        id: id,
        input: {
          email,
          first_name,
          last_name,
          company_id: parseInt(company.id),
        },
      },
    });
  };

  const handleOnRowDelete = (data) => {
    const { id } = data;
    console.log(id);
    if (id) {
      deleteContact({
        variables: { id: id },
      });
    }
  };

  const handleContactAdded = (contact) => {
    setState({
      ...state,
      data: [contact, ...state.data],
    });
  };

  return (
    <Fragment>
      <MaterialTable
        title="All contacts"
        columns={state.columns}
        data={state.data}
        actions={[
          {
            icon: () => <AddCircle />,
            tooltip: "New contact",
            onClick: (event, rowData) => setOpenContactForm(true),
            isFreeAction: true,
          },
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                  handleOnRowUpdate(newData, oldData);
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
                handleOnRowDelete(oldData);
              }, 600);
            }),
        }}
      />
      <ContactDialog
        shouldOpen={openContactForm}
        handler={setOpenContactForm}
        addContact={handleContactAdded}
      />
    </Fragment>
  );
}
