import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import api from 'api';

const columns: GridColDef[] = [
  { field: 'void', headerName: 'Void', width: 150 },
  { field: 'inventory_date', headerName: 'Date', width: 150 },
  { field: 'inspector', headerName: 'Inspector', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'coil_number', headerName: 'Coil Number', width: 170 },
  { field: 'heat_number', headerName: 'Heat Number', width: 170 },
  { field: 'diameter', headerName: 'Diameter', width: 170 },
  { field: 'schedule_class', headerName: 'Schedule & Class', width: 200 },
  { field: 'grade_type', headerName: 'Grade', width: 150 },
  { field: 'pipe_length', headerName: 'Length', width: 150 },
  { field: 'coating_type', headerName: 'Coating', width: 150 },
  { field: 'coating_color', headerName: 'Coating Color', width: 200 },
  { field: 'type_name', headerName: 'Material', width: 170 },
  { field: 'porder_id', headerName: 'P.O. Number', width: 170 },
  { field: 'smart_label', headerName: 'Smart Label', width: 170 },
  { field: 'comments', headerName: 'Comments', width: 150 },
  // { field: 'wall_thickenss', headerName: 'Wall Thickness', width: 200 },
  // { field: 'manufacturer', headerName: 'Manufacturer', width: 170 },
  //   { field: 'firstName', headerName: 'First name', width: 150 },
  //   { field: 'lastName', headerName: 'Last name', width: 150 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params: GridValueGetterParams) =>
  //       `${params.getValue(params.id, 'firstName') || ''} ${
  //         params.getValue(params.id, 'lastName') || ''
  //       }`,
  //   },
];

const tempRow = [
  {
    void: 'NO',
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
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ViewPipes = () => {
  const [rows, setRows] = useState(tempRow);
  useEffect(() => {
    api
      .getPipes()
      .then((res) => {
        setRows(res.pipes);
      })
      .catch((err) => alert(err.message));
  }, []);
  return (
    <div style={{ height: '95vh', width: '95%', margin: '2%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
    </div>
  );
};

export default ViewPipes;
