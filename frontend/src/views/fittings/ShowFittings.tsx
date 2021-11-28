import React, { createRef, useEffect, useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "utils/tableIcons";
import api from "api";
import { Typography, CssBaseline, Toolbar } from "@material-ui/core";
import useStyles from "../../style/ShowFittingsStyles";
import MenuAppBar from "../../components/AppBar";

interface dataType {
  id: number;
  isvoid: boolean;
  inspector: string;
  location: string;
  dimension: string;
  style: string;
  wall_thickness: number;
  grade: string;
  heat_number: string;
  mfg: string;
  coating_type: string;
  description: string;
  material: string;
  purchase_order: number;
  smart_label: string;
  comments: string;
}

const ShowFittings = () => {
  const materialTableRef = createRef();

  const [initialFormData, setInitialFormData] = useState({});
  const [data, setData] = useState<dataType[]>([]);

  useEffect(() => {
    api
      .getFittings()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err.message));
  }, []);

  const onRowAdd = (newData: dataType) => {
    return api
      .addFitting(newData)
      .then((res) => {
        setData([...data, newData]);
        return res;
      })
      .catch((err) => alert(err.message));
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <div>
          <MenuAppBar />
          <CssBaseline />
          <Toolbar className={classes.title}>
            <Typography variant="h4" className={classes.titleContent}>
              Fittings Inventory
            </Typography>
          </Toolbar>
        </div>
        <div className={classes.stickyActions}>
          <MaterialTable
            icons={tableIcons}
            title=""
            options={{
              filtering: true,
              search: true,
              columnsButton: true,
              loadingType: "linear",
              draggable: true,
              showTextRowsSelected: true,
              toolbarButtonAlignment: "left",
              pageSize: 10,
              pageSizeOptions: [5, 10, 25, 50],
              actionsCellStyle: { zIndex: 999 },
              maxBodyHeight: "70vh",
              minBodyHeight: "35vh",
              exportButton: true,
            }}
            //removes title toolbar
            components={{
              Toolbar: (props) => (
                <div className={classes.toolbar}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
            columns={[
              { title: "Void", field: "is_void", type: "boolean" },
              {
                title: "Date",
                field: "created_on",
                type: "date",
                editable: "never",
              },
              { title: "Inspector", field: "created_by", editable: "never" },
              { title: "ID", field: "id" },
              { title: "Location", field: "flocation" },
              { title: "Dimensions", field: "dimension" },
              { title: "Style", field: "style" },
              { title: "Type", field: "ftype" },
              { title: "Wall Thickness", field: "thickness" },
              { title: "Grade Type", field: "grade" },
              { title: "Heat Number", field: "heat_number" },
              {
                title: "Manufacturer",
                field: "manufacture",
              },
              { title: "Length", field: "flength" },
              { title: "Coating", field: "coat" },
              { title: "Description", field: "fdescription" },
              { title: "Material", field: "material_type" },
              { title: "P.O. Number", field: "po_number" },
              { title: "Smart Label", field: "smart_label" },
              { title: "Comments", field: "comment" },
            ]}
            data={data}
            tableRef={materialTableRef}
            initialFormData={initialFormData}
            editable={{
              onRowAddCancelled: (rowData) =>
                console.log("Row adding cancelled"),
              onRowUpdateCancelled: (rowData) =>
                console.log("Row editing cancelled"),
              onRowAdd: onRowAdd,
              onRowUpdate: (newData, oldData) => {
                console.log(newData);

                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve("Row Updated");
                  }, 1000);
                });
              },
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve("Row Deleted");
                  }, 1000);
                }),
            }}
            actions={[
              {
                icon: () => <LibraryAddIcon />,
                tooltip: "Duplicate Fitting",
                onClick: (event, rowData) => {
                  const materialTable = materialTableRef.current;

                  setInitialFormData({
                    ...rowData,
                    name: null,
                    id: null,
                    inspector: null,
                    coil_no: null,
                    //inventory_date: null,
                  });

                  (materialTable as any).dataManager.changeRowEditing();
                  (materialTable as any).setState({
                    ...(materialTable as any).dataManager.getRenderState(),
                    showAddRow: true,
                  });
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ShowFittings;
