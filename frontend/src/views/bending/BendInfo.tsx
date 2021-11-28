import React, { useEffect, useState, createRef } from "react";
import MaterialTable from "material-table";

import useStyles from "style/ShowPipeStyles";
import MenuAppBar from "../../components/AppBar";
import { tableIcons } from "utils/tableIcons";
import { Typography, CssBaseline, Toolbar } from "@material-ui/core";
import api from "api";

interface DataType {
  id: string;
  bend_id: string | null;
  degree: number;
  bdirection: string;
  blength: string | null;
  bdate: Date;
  created_by: string;
}

interface Bend {
  degree: number;
  bdirection: string;
  blength: string | null;
}

const BendInfo = () => {
  const [data, setData] = useState<DataType[]>([]);

  const classes = useStyles();

  const rowAddFunc = (newData: any) => {
    const bendData: Bend[] = [
      {
        degree: newData.degree,
        bdirection: newData.bdirection,
        blength: newData.blength ? newData.blength : null,
      },
    ];
    return api
      .postBend({
        bends: bendData,
        id: newData.id,
      })
      .then((res) => {
        return api.getBend();
      })
      .then((ret) => {
        setData(ret.data);
        return ret;
      })
      .catch((err) => alert(err.message));
  };

  const rowUpdateFunc = (newData: any, oldData: any) => {
    if (
      newData.degree === oldData.degree &&
      newData.bdirection === oldData.bdirection &&
      newData.blength === oldData.blength
    ) {
      return new Promise<void>((resolve, reject) => {
        resolve();
      });
    }

    const bendObj: Bend = {
      degree: newData.degree,
      bdirection: newData.bdirection,
      blength: newData.blength ? newData.blength : null,
    };

    return api
      .updateBend({
        bend_obj: bendObj,
        bend_id: oldData.bend_id,
        id: oldData.id,
      })
      .then((res) => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
      })
      .catch((err) => alert(err.message));
  };

  const rowDeleteFunc = (oldData: any) => {
    return api
      .removeBend(oldData.bend_id)
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
    api
      .getBend()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <div>
          <MenuAppBar />
          <CssBaseline />
          <Toolbar className={classes.title}>
            <Typography variant="h4" className={classes.titleContent}>
              Bending Information
            </Typography>
          </Toolbar>
        </div>
        <div className={classes.stickyActions}>
          <MaterialTable
            icons={tableIcons}
            title="Bend Information"
            columns={[
              {
                title: "Item ID",
                field: "id",
                type: "string",
                editable: "onAdd",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Degree",
                field: "degree",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Bend Direction",
                field: "bdirection",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Length",
                field: "blength",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Bend Date",
                field: "bdate",
                type: "date",
                editable: "never",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Bend Inspector",
                field: "created_by",
                type: "string",
                editable: "never",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Bend_id",
                field: "bend_id",
                editable: "never",
                cellStyle: {
                  border: "solid",
                },
                hidden: true,
              },
            ]}
            data={data}
            editable={{
              onRowAdd: rowAddFunc,
              onRowUpdate: rowUpdateFunc,
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
    </>
  );
};

export default BendInfo;
