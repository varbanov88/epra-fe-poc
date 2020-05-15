import React, { useState } from "react";
import MaterialTable from "material-table";

export default function CompanyList({ companies }) {
  const [state] = useState({
    columns: [
      {
        title: "Name",
        field: "company_name",
      },
    ],
    data: companies,
  });

  return (
    <MaterialTable
      title="All companies"
      columns={state.columns}
      data={state.data}
    />
  );
}
