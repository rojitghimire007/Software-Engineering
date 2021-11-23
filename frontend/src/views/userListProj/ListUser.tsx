import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

import { tableIcons } from "utils/tableIcons";
import AddUser from "./AddUser";
import api from "api";

interface DataType {
  uname: string;
  fname: string;
  email: string;
  phone: string | null;
  pass: string;
}

const ListUser = () => {
  const [data, setData] = useState<DataType[]>([]);

  const getUsersInProject = () => {
    api.usersInProject().then((res) => {
      setData(res.data);
    }).catch(err => alert(err.message));
  }

  const rowDeleteFunc = (oldData: any) => {
    return api.removeUserFromProject(oldData.uname).then((res) => {
      const dataDelete = [...data];
      const index = oldData.tableData.id;
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
    })
    .catch(err=> {
      alert(err.message);
    });
  };

  useEffect(() => {
    getUsersInProject()
  }, []);

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title={'User List'}
        columns={[
          { title: "Name", field: "fname", type: "string" },
          { title: "Email", field: "email", type: "string" },
          { title: "Username", field: "uname", type: "string" },
          { title: "Phone", field: "string", type: "string" },
        ]}
        data={data}
        editable={{
          onRowDelete: rowDeleteFunc
        }}
      />
      <AddUser getUsers={getUsersInProject}/>
    </>
  );
};

export default ListUser;