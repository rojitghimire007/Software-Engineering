import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

import { tableIcons } from "utils/tableIcons";
import AddUser from "./AddUser";
import useStyles from "style/ShowPipeStyles";
import MenuAppBar from "../../components/AppBar";
import { Typography, CssBaseline, Toolbar } from "@material-ui/core";
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

  const classes = useStyles();

  const getUsersInProject = () => {
    api
      .usersInProject()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err.message));
  };

  const rowDeleteFunc = (oldData: any) => {
    return api
      .removeUserFromProject(oldData.uname)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getUsersInProject();
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <div>
          <MenuAppBar />
          <CssBaseline />
          <Toolbar className={classes.title}>
            <Typography variant="h4" className={classes.titleContent}>
              User List In Project
            </Typography>
          </Toolbar>
        </div>
        <div className={classes.stickyActions}>
          <MaterialTable
            icons={tableIcons}
            title={"User List"}
            columns={[
              {
                title: "Name",
                field: "fname",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Email",
                field: "email",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Username",
                field: "uname",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Phone",
                field: "string",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
            ]}
            data={data}
            editable={{
              onRowDelete: rowDeleteFunc,
            }}
            options={{
              headerStyle: {
                backgroundColor: "lightgrey",
                fontWeight: "bold",
                border: "solid",
              },
              filterCellStyle: {
                border: "solid",
              },
              filtering: true,
              columnsButton: true,
              search: true,
              loadingType: "linear",
              draggable: true,
              showTextRowsSelected: true,
              toolbarButtonAlignment: "left",
              pageSize: 5,
              pageSizeOptions: [5, 10, 25, 50],
              actionsCellStyle: { zIndex: 999 },
              maxBodyHeight: "70vh",
              minBodyHeight: "35vh",
              exportButton: true,
              sorting: true,
            }}
          />
        </div>
      </div>
      <AddUser getUsers={getUsersInProject} />
    </>
  );
};

export default ListUser;
