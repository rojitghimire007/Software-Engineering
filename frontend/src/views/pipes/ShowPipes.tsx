import React, { createRef, forwardRef, useEffect, useState } from 'react';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MaterialTable, {
  MTableBodyRow,
  MTableEditRow,
  MTableFilterRow,
  MTableHeader,
  MTableToolbar,
} from 'material-table';
import { tableIcons } from 'utils/tableIcons';
import api from 'api';
import { unstable_batchedUpdates } from 'react-dom';
import { MenuItem } from '@mui/material';
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  CssBaseline,
  Grid,
  Toolbar,
  Button,
  TextField,
  Container,
  CardActionArea,
} from '@material-ui/core';
import useStyles from '../../style/ShowPipeStyles';
import ColorScheme from '../../style/ColorScheme';

const classData = require('others/schedule&class.json');

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

const diameters = {
  '10″': '10″',
  '2 1/2″': '2 1/2″',
  '26″': '26″',
  '7″': '7″',
  '46″': '46″',
  '1″': '1″',
  '32″': '32″',
  '8″': '8″',
  '48″': '48″',
  '1 1/2″': '1 1/2″',
  '18″': '18″',
  '4 1/2″': '4 1/2″',
  '11″': '11″',
  '30″': '30″',
  '34″': '34″',
  '6″': '6″',
  '1/4″': '1/4″',
  '3/8″': '3/8″',
  '24″': '24″',
  '9″': '9″',
  '2″': '2″',
  '28″': '28″',
  '14″': '14″',
  '1 1/4″': '1 1/4″',
  '3″': '3″',
  '12″': '12″',
  '3/4″': '3/4″',
  '20″': '20″',
  '16″': '16″',
  '4″': '4″',
  '22″': '22″',
  '54″': '54″',
  '1/2″': '1/2″',
  '1/8″': '1/8″',
  '5″': '5″',
  '3 1/2″': '3 1/2″',
  '42″': '42″',
  '36″': '36″',
};

const ShowPipes = () => {
  const materialTableRef = createRef();

  const [initialFormData, setInitialFormData] = useState({});
  const [data, setData] = useState<dataType[]>([
    {
      void: false,
      color: 'red',
      date: '01/18/17',
      inspector: 'Todd DeVille',
      location: 'Yard',
      id: 1,
      coil_no: 414603,
      heat_no: 643317,
      diameter: '20"',
      schedule: 'HX',
      wall_thickness: 0.5,
      grade: 'X60',
      length: '22\' 6-5/8"',
      coating: 'Bare',
      coating_color: 'Green',
      manufacturer: 'Ameriacan Steel Pipe',
      material_type: 'Steel',
      po_number: 43526725,
      comments: 'Hello World',
    },
    {
      void: false,
      // color: 'green',
      date: '01/18/17',
      inspector: 'Todd DeVille',
      location: 'Yard',
      id: 1,
      coil_no: 414603,
      heat_no: 643317,
      diameter: '20"',
      schedule: 'HX',
      wall_thickness: 0.5,
      grade: 'X60',
      length: '22\' 6-5/8"',
      coating: 'Bare',
      coating_color: 'Green',
      manufacturer: 'Ameriacan Steel Pipe',
      material_type: 'Steel',
      po_number: 1,
      comments: 'Hello World',
    },
  ]);

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
              setMaterials(
                res2.materials.reduce(
                  (a: any, v: any) => ({ ...a, [v]: v }),
                  {}
                )
              );
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
    if (!diameter || diameter == '') return [];

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
    return api
      .editPipe(
        {
          ...newData,
          isVoid: newData.void,
          schedule: `${newData.schedule} - ${newData.wall_thickness}`,
        },
        oldData ? oldData.id : ''
      )
      .then((res) => console.log(res))
      .catch((err) => alert(err));
  };

  const handleDiameterChange = (event: SelectChangeEvent) => {
    setSchedules([]);
    // api
    //   .getSchedules(event.target.value)
    //   .then((res) => {
    //     setSchedules(res);
    //   })
    //   .catch((err) => alert(err.message));
  };

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div>
        <CssBaseline />
        <Toolbar className={classes.title}>
          <Typography variant="h4" className={classes.titleContent}>
            Pipe Inventory
          </Typography>
        </Toolbar>
      </div>
      <div className={classes.table}>
        <MaterialTable
          icons={tableIcons}
          title=""
          //removes title toolbar
          options={{
            filtering: true,
            search: true,
            rowStyle: (rowData) => ({
              backgroundColor: rowData.color ? rowData.color : null,
              color: rowData.color ? 'white' : 'black',
            }),
            tableLayout: 'auto', // idk if this is important
            columnsButton: true,
            searchAutoFocus: true,
            loadingType: 'linear',
            draggable: true,
            // rowStyle: classes['row'],
          }}
          columns={[
            { title: 'Void', field: 'void', type: 'boolean' },
            {
              title: 'Date',
              field: 'date',
              editable: 'never',
              hidden: true,
            },

            { title: 'ID', field: 'id', type: 'numeric' },
            { title: 'Inspector', field: 'inspector', editable: 'never' }, //extract

            { title: 'Location', field: 'location' },
            { title: 'Coil Number', field: 'coil_no' },
            { title: 'Heat Number', field: 'heat_no', lookup: heat_numbers },
            { title: 'Manufacturer', field: 'manufacturer', editable: 'never' },

            //Requires extraction
            {
              title: 'Diameter',
              field: 'diameter',
              lookup: diameters,
              editComponent: ({ onRowDataChange, rowData }) => (
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={(e) => {
                    onRowDataChange({
                      ...rowData,
                      diameter: (e.target.value as string) ?? '',
                      schedule: '',
                    });
                  }}
                  label="Diameter"
                  defaultValue={rowData.diameter}
                >
                  {Object.keys(diameters).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              ),
            },
            {
              title: 'Schedule - Thickness',
              field: 'schedule',
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
                    let breakSchedule = e.target.value.split('-');
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

            { title: 'Grade', field: 'grade', lookup: grades }, // Extract SMYS as well

            { title: 'Length', field: 'length' },
            {
              title: 'Coaing - Coating Color',
              field: 'coating',
              render: (rowData) => (
                <>
                  {rowData.coating} - {myCoatings[rowData.coating]}
                </>
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
            { title: 'Material', field: 'material_type', lookup: materials },
            { title: 'P.O. Number', field: 'po_number', lookup: po_numbers },
            { title: 'Smart Label', field: 'smart_label' },
            { title: 'Comments', field: 'comments' },
          ]}
          // components={{
          //   Toolbar: (props) => (
          //     <div className={classes.toolbar}>
          //       <MTableToolbar {...props} />
          //     </div>
          //   ),
          //   Header: (props) => (
          //     <thead className={classes.header}>
          //       <MTableHeader {...props} />
          //     </thead>
          //   ),
          //   FilterRow: (props) => {
          //     return (
          //       <tr className={classes.filterRow}>
          //         <MTableFilterRow {...props} />
          //       </tr>
          //     );
          //   },
          //   Row: (props) => (
          //     <tbody className={classes.row}>
          //       <MTableBodyRow {...props} />
          //     </tbody>
          //   ),
          //   EditRow: (props) => (
          //     <tbody className={classes.row}>
          //       <MTableEditRow {...props} />
          //     </tbody>
          //   ),
          // }}
          //   columns={[
          //     { title: 'Name', field: 'name' },
          //     { title: 'Surname', field: 'surname' },
          //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
          //     { title: 'Birth Date', field: 'birthYear', type: 'date' },
          //     {
          //       title: 'Birth Place',
          //       field: 'birthCity',
          //       lookup: { 62: 'Cucq' },
          //     },
          //   ]}
          data={data}
          tableRef={materialTableRef}
          initialFormData={initialFormData}
          editable={{
            // isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
            // isEditHidden: rowData => rowData.name === 'x',
            // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
            // isDeleteHidden: rowData => rowData.name === 'y',
            // onBulkUpdate: changes =>
            //     new Promise((resolve, reject) => {
            //         setTimeout(() => {
            //             /* setData([...data, newData]); */

            //             resolve(void);
            //         }, 1000);
            //     }),
            onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
            onRowUpdateCancelled: (rowData) =>
              console.log('Row editing cancelled'),
            onRowAdd: onRowAdd,
            onRowUpdate: onRowUpdate,
            onRowDelete: (oldData) => {
              return api.deletePipe(oldData.id.toString());
            },
          }}
          actions={[
            {
              icon: () => <LibraryAddIcon />,
              tooltip: 'Duplicate Pipe',
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
          ]}
        />
      </div>
    </div>
  );
};
export default ShowPipes;
