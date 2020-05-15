import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { Delete, Save } from "@material-ui/icons";
import * as Queries from "../graphQL/queries";
import * as Mutations from "../graphQL/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import SearchDropdown from "./SearchDropdown";

const defaultContact = {
  first_name: "",
  last_name: "",
  email: "",
  company_id: null,
};

const errors = {
  first_name: null,
  last_name: null,
  email: null,
  company: null,
  createError: null,
};

export default function FormDialog({ shouldOpen, handler, addContact }) {
  const [open, setOpen] = useState(shouldOpen);
  const [newContact, setNewContact] = useState(defaultContact);
  const [formErrors, setFormErrors] = useState(errors);
  const [shouldSetData, setShouldSetData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const { data } = useQuery(Queries.GET_ALL_COMPANIES);
  const [createContact, createContactResult] = useMutation(
    Mutations.CREATE_CONTACT
  );
  useEffect(() => {
    if (shouldOpen) {
      handleClickOpen();
    }
    if (shouldSetData && createContactResult.data) {
      debugger;
      setShouldSetData(false);
      setIsLoading(false);
      setFormErrors(errors);
      addContact(createContactResult.data.createContact);
      handleClose();
    }

    if (createContactResult.error) {
      setFormErrors({
        ...formErrors,
        createError: createContactResult.error,
      });
    }
    if (data) {
      setCompanies(data.allCompanies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createContactResult.data,
    createContactResult.error,
    formErrors,
    data,
    shouldOpen,
    handler,
  ]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormErrors(errors);
    setNewContact(defaultContact);
    handler(false);
    setOpen(false);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email && emailRegex.test(String(email).toLowerCase());
  };

  const isValid = () => {
    let result = true;
    let errs = {};
    if (!newContact.first_name || newContact.first_name.length < 2) {
      result = false;
      errs["first_name"] = "first name should be at least 2 symbols";
    } else {
      errs["first_name"] = null;
    }

    if (!newContact.last_name || newContact.last_name.length < 2) {
      result = false;
      errs["last_name"] = "last name should be at least 2 symbols";
    } else {
      errs["last_name"] = null;
    }
    if (!isValidEmail(newContact.email)) {
      result = false;
      errs["email"] = "invalid email";
    } else {
      errs["email"] = null;
    }
    if (!newContact.company_id) {
      result = false;
      errs["company"] = "please select company";
    } else {
      errs["company"] = null;
    }
    setFormErrors(errs);
    return result;
  };

  const handleSubmit = () => {
    if (isValid()) {
      setIsLoading(true);
      createContact({
        variables: { input: { ...newContact } },
      });
    }
  };

  const handleSelectedCompany = (newValue) => {
    const id = newValue ? newValue.id : newValue;
    setNewContact({
      ...newContact,
      company_id: id,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });
    if (name === "email" && isValidEmail(value)) {
      setFormErrors({
        ...formErrors,
        email: null,
      });
    } else if (value && value.length >= 2) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New contact</DialogTitle>
        <DialogContent>
          {(formErrors.company || formErrors.createError) && (
            <DialogContentText color="error">
              {formErrors.company}
            </DialogContentText>
          )}
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="First name"
            name="first_name"
            value={newContact.first_name}
            onChange={handleInputChange}
            type="text"
            error={formErrors.first_name !== null}
            helperText={formErrors.first_name ? formErrors.first_name : ""}
            disabled={isLoading}
            fullWidth
          />
          <TextField
            margin="normal"
            id="last_name"
            label="Last name"
            name="last_name"
            value={newContact.last_name}
            onChange={handleInputChange}
            type="text"
            error={formErrors.last_name !== null}
            helperText={formErrors.last_name ? formErrors.last_name : ""}
            disabled={isLoading}
            fullWidth
          />
          <TextField
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
            type="email"
            error={formErrors.email !== null}
            helperText={formErrors.email ? formErrors.last_name : ""}
            disabled={isLoading}
            fullWidth
          />
          <SearchDropdown
            collection={companies}
            optionLebel={"company_name"}
            label="Company"
            setter={handleSelectedCompany}
            disabled={isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            startIcon={<Delete />}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" startIcon={<Save />}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
