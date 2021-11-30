import React, { createRef, CSSProperties, useEffect, useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "utils/tableIcons";
import api from "api";
import { SketchPicker } from "react-color";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import Backdrop from "@mui/material/Backdrop";
import { unstable_batchedUpdates } from "react-dom";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { Typography, CssBaseline, Toolbar } from "@material-ui/core";
import useStyles from "style/ShowPipeStyles";
import MenuAppBar from "../../components/AppBar";
import { createFilterOptions } from "@mui/material/Autocomplete";

const classData = require("others/schedule&class.json");

interface dataType {
  color?: string;
  void: boolean;
  date: string;
  inspector: string;
  location: string;
  id: number;
  coil_no: number;
  heat_no: number;
  diameter: string;
  schedule: string;
  wall_thickness: number;
  grade: string;
  length: string;
  coating: string;
  coating_color: string;
  manufacturer: string;
  material_type: string;
  po_number: number;
  comments: string;
}

var presetColors = [
  { color: "#000", title: "black" },
  { color: "#00f", title: "blue" },
  { color: "#0f0", title: "green" },
  { color: "#0ff", title: "cyan" },
  { color: "#f00", title: "red" },
  { color: "#f0f", title: "pink" },
  { color: "#ff0", title: "yellow" },
  { color: "#fff", title: "white" }, //color:'#',title:''
];

const filterOptions = createFilterOptions({
  matchFrom: "start",
});

const diameters = [
  "1 1/2″",
  "1 1/4″",
  "1/2″",
  "1/4″",
  "1/8″",
  "1″",
  "2″",
  "2 1/2″",
  "3″",
  "3 1/2″",
  "3/4″",
  "3/8″",
  "4″",
  "4 1/2″",
  "5″",
  "6″",
  "7″",
  "8″",
  "9″",

  "10″",
  "11″",
  "12″",
  "14″",
  "16″",
  "18″",

  "20″",
  "22″",
  "24″",
  "26″",
  "28″",

  "30″",
  "32″",
  "34″",
  "36″",

  "42″",
  "46″",
  "48″",

  "54″",
];

const getRowColor = (rowData: any): CSSProperties => {
  if (rowData.void) {
    return { backgroundColor: "red" };
  } else if (rowData.cut) {
    return { backgroundColor: "yellow" };
  } else if (rowData.used) {
    return { backgroundColor: "green" };
  } else return {};
};

const ShowPipes = () => {
  const materialTableRef = createRef();

  let date = new Date();

  const [colorPicker, setColorPicker] = useState(false);
  const [color, setColor] = useState<string>("000");
  const [initialFormData, setInitialFormData] = useState({});
  const [data, setData] = useState<dataType[]>([]);

  const [schedules, setSchedules] = useState([]);
  const [grades, setGrades] = useState({});
  const [myCoatings, setMyCoatings] = useState<{ [key: string]: string }>({});
  const [materials, setMaterials] = useState({});
  const [po_numbers, setPO_numbers] = useState({});
  const [heat_numbers, setHeat_numbers] = useState({});

  useEffect(() => {
    api
      .getPipes()
      .then((res) => {
        setData(res.pipes);
        api
          .getOptions()
          .then((res2) => {
            unstable_batchedUpdates(() => {
              setPO_numbers(
                res2.po_numbers.reduce(
                  (a: any, v: any) => ({ ...a, [v]: v }),
                  {}
                )
              );
              setSchedules(res2.schedules);
              setGrades(
                res2.grades.reduce((a: any, v: any) => ({ ...a, [v]: v }), {})
              );
              setMyCoatings(res2.coatings);
              setHeat_numbers(
                res2.heat_numbers.reduce(
                  (a: any, v: any) => ({ ...a, [v]: v }),
                  {}
                )
              );
            });
          })
          .catch((err) => alert(err.message));
      })
      .catch((err) => alert(err.message));
  }, []);

  const getThickness = (diameter: string) => {
    if (!diameter || diameter === "") return [];

    let x = classData[diameter];

    let ans: Array<string> = [];

    for (let i = 0; i < x[0].length; i++) {
      ans.push(`${x[0][i]} - ${x[1][i]}`);
    }
    return ans;
  };

  const onRowAdd = (newData: dataType) => {
    return api
      .addPipe({
        ...newData,
        isVoid: newData.void,
        schedule: `${newData.schedule} - ${newData.wall_thickness}`,
      })
      .then((res) => {
        setData([...data, newData]);
        return res;
      })
      .catch((err) => alert(err.message));
  };

  const onRowUpdate = (newData: dataType, oldData: dataType | undefined) => {
    console.log(oldData);
    console.log(newData);

    return api
      .editPipe(
        {
          oldData,
          newData,
        },
        oldData ? oldData.id : ""
      )
      .then((res) => {
        const dataUpdate = [];
        for (let i = 0; i < data.length; i++) {
          if (oldData && data[i].id == oldData.id) dataUpdate.push(newData);
          else dataUpdate.push(data[i]);
        }
        setData([...dataUpdate]);

        console.log(res);
      })
      .catch((err) => alert(err.message));
  };

  const classes = useStyles();

  const [animationA, setAnimationA] = useState<string>("");
  const [animationB, setAnimationB] = useState<string>("");

  return (
    <>
      <div className={classes.wrapper}>
        {/* {console.log(date)} */}
        
          <MenuAppBar />
          <CssBaseline />
          <Toolbar className={classes.title}>
            <Typography variant="h4" className={classes.titleContent}>
              Pipe Inventory
            </Typography>
          </Toolbar>
        

        {colorPicker ? (
          <Backdrop open={colorPicker} style={{ zIndex: 99999 }}>
            <div style={{ display: "fles", flexDirection: "column" }}>
              <div style={{ color: "white" }}>Pick a Color</div>
              <div>
                <SketchPicker
                  color={color}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  disableAlpha={true}
                  presetColors={presetColors}
                  onChange={(colorChosen: any) => setColor(colorChosen.hex)}
                />
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    marginRight: "0",
                    marginTop: "3%",
                    fontSize: "24px",
                    fontStyle: "Fenix serif",
                    backgroundColor: "green",
                    boxShadow: "0 0 0 1px olive",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    padding: "3%",
                    color: "white",
                    transform: `${animationA}`,
                    transition: ".25s ease-in-out",
                  }}
                  onClick={() => {
                    setColorPicker(!colorPicker);
                    presetColors = [
                      ...presetColors,
                      { color: color, title: "newColor" },
                    ];
                  }}
                  onMouseOver={() => {
                    setAnimationA("skewX(2deg) scale(.97,.97)");
                  }}
                  onMouseOut={() => {
                    setAnimationA("");
                  }}
                >
                  Finish
                </div>
                <div
                  style={{
                    marginLeft: "31%",
                    marginRight: "auto",
                    marginTop: "3%",
                    fontSize: "24px",
                    fontStyle: "Fenix serif",
                    backgroundColor: "red",
                    boxShadow: "0 0 0 3px crimson",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    padding: "3%",
                    transform: `${animationB}`,
                    transition: ".25s ease-in-out",
                  }}
                  onClick={() => {
                    setColorPicker(!colorPicker);
                  }}
                  onMouseOver={() => {
                    setAnimationB("skewX(-2deg) scale(.97,.97)");
                  }}
                  onMouseOut={() => {
                    setAnimationB("");
                  }}
                >
                  Abort
                </div>
              </div>
            </div>
          </Backdrop>
        ) : (
          <></>
        )}

        <div className={classes.stickyActions}>
          <MaterialTable
            icons={tableIcons}
            //removes title toolbar
            title=""
            options={{
              filtering: true,
              search: true,
              rowStyle: getRowColor,
              // tableLayout: 'fixed', // idk if this is important
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
              exportFileName:
                "Pipe_Data_" +
                date.getFullYear() +
                "_" +
                (date.getMonth() + 1) +
                "_" +
                date.getDate(),
            }}
            components={{
              Toolbar: (props) => (
                <div className={classes.toolbar}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
            columns={[
              { title: "Void", field: "void", type: "boolean" },
              { title: "Date", field: "date", editable: "never", hidden: true },
              { title: "ID", field: "id" }, //took off type: numeric b/c letters would possibly be added
              { title: "Inspector", field: "inspector", editable: "never" }, //extract
              { title: "Location", field: "location" },
              { title: "Coil", field: "coil_no" },
              { title: "Heat", field: "heat_no" /*lookup: heat_numbers*/ }, //took out lookup b/c this will be manual input
              {
                title: "Manufacturer",
                field: "manufacturer",
              },
              {
                title: "Diameter",
                field: "diameter",
                render: (rowData) => <>{rowData.diameter}</>,
                editComponent: ({ onRowDataChange, rowData }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={diameters}
                    sx={{ width: 300 }}
                    onChange={(event: any, newValue: any) => {
                      onRowDataChange({
                        ...rowData,
                        diameter: newValue ?? "",
                        schedule: "",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Add Item" />
                    )}
                    filterOptions={filterOptions}
                  />
                ),
              },
              {
                title: "Schedule-Thickness",
                field: "schedule",
                render: (rowData) => (
                  <>
                    {rowData.schedule} - {rowData.wall_thickness}
                  </>
                ),
                editComponent: ({ rowData, onRowDataChange }) => (
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e: SelectChangeEvent) => {
                      let breakSchedule = e.target.value.split("-");
                      onRowDataChange({
                        ...rowData,
                        schedule: breakSchedule[0].trim(),
                        wall_thickness: Number(breakSchedule[1].trim()),
                      });
                    }}
                    defaultValue={`${rowData.schedule} - ${rowData.wall_thickness}`}
                  >
                    {getThickness(rowData.diameter).map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                ),
              },
              { title: "Grade", field: "grade", lookup: grades }, // Extract SMYS as well
              { title: "Length", field: "length" },
              {
                title: "Coating",
                field: "coating",
                render: (rowData) => (
                  <span>
                    {/* {rowData.coating} - {myCoatings[rowData.coating]} */}
                    {rowData.coating} -{" "}
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: myCoatings[rowData.coating],
                        height: "1em",
                        width: "1em",
                      }}
                    ></span>
                  </span>
                ),
                editComponent: ({ rowData, onRowDataChange }) => (
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e: SelectChangeEvent) => {
                      onRowDataChange({ ...rowData, coating: e.target.value });
                    }}
                    defaultValue={rowData.coating}
                  >
                    {Object.keys(myCoatings).map((key) => (
                      <MenuItem key={key} value={key}>
                        {key} - {myCoatings[key]}
                      </MenuItem>
                    ))}
                  </Select>
                ),
              },
              { title: "Material", field: "material_type", type: 'string'},
              { title: "P.O.", field: "po_number" /*lookup: po_numbers*/ },
              { title: "Smart Label", field: "smart_label" },
              { title: "Comments", field: "comments" },
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
              onRowUpdate: onRowUpdate,
              onRowDelete: (oldData) => {
                return api.deletePipe(oldData.id.toString());
              },
            }}
            actions={[
              {
                icon: () => <LibraryAddIcon style={{ color: "white" }} />,
                tooltip: "Duplicate Pipe",
                onClick: (event, rowData) => {
                  const materialTable = materialTableRef.current;

                  setInitialFormData({
                    ...rowData,
                    name: null,
                    id: null,
                    inspector: null,
                    coil_no: null,
                  });

                  (materialTable as any).dataManager.changeRowEditing();
                  (materialTable as any).setState({
                    ...(materialTable as any).dataManager.getRenderState(),
                    showAddRow: true,
                  });
                },
              },
              {
                icon: () => <InvertColorsIcon style={{ color: "white" }} />,
                tooltip: "Edit Pipe Color",
                onClick: () => {
                  setColorPicker(!colorPicker);
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
export default ShowPipes;
