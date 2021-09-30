import React, { createRef, forwardRef, useEffect, useState } from 'react';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import MaterialTable from 'material-table';
import { tableIcons } from 'utils/tableIcons';
import api from 'api';

let t = [
  { title: 'Void', field: 'void', type: 'boolean' },
  { title: 'Date', field: 'inventory_date' },
  { title: 'Inspector', field: 'inspector' },
  { title: 'Location', field: 'location' },
  { title: 'ID', field: 'id' },
  { title: 'Coil Number', field: 'coil_number' },
  { title: 'Heat Number', field: 'heat_number' },
  { title: 'Diameter', field: 'diameter' },
  { title: 'Schedule & Class', field: 'schedule_class' },
  { title: 'Grade', field: 'grade_type' },
  { title: 'Length', field: 'pipe_length' },
  { title: 'Coating', field: 'coating_type' },
  { title: 'Coating Color', field: 'coating_color' },
  { title: 'Material', field: 'type_name' },
  { title: 'P.O. Number', field: 'porder_id' },
  { title: 'Smart Label', field: 'smart_label' },
  { title: 'Comments', field: 'comments' },
];
const ShowPipes = () => {
  const materialTableRef = createRef();

  const [initialFormData, setInitialFormData] = useState({});
  const [data, setData] = useState([
    {
      void: false,
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
    // { name: 'Poyo', surname: 'Man', birthYear: 1992, birthCity: 62 },
    // { name: 'Poyo', surname: 'Man', birthYear: 1992, birthCity: 62 },
    // { name: 'Poyo', surname: 'Man', birthYear: 1992, birthCity: 62 },
  ]);

  useEffect(() => {
    api
      .getPipes()
      .then((res) => {
        setData(res.pipes);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <MaterialTable
      icons={tableIcons}
      title="Duplicate Action Preview"
      options={{
        filtering: true,
        search: false,
        // tableLayout: 'fixed',
      }}
      columns={[
        { title: 'Void', field: 'void', type: 'boolean' },
        { title: 'Date', field: 'inventory_date' },
        { title: 'Inspector', field: 'inspector' },
        { title: 'Location', field: 'location' },
        { title: 'ID', field: 'id' },
        { title: 'Coil Number', field: 'coil_number' },
        { title: 'Heat Number', field: 'heat_number' },
        { title: 'Diameter', field: 'diameter' },
        { title: 'Schedule & Class', field: 'schedule_class' },
        { title: 'Grade', field: 'grade_type' },
        { title: 'Length', field: 'pipe_length' },
        { title: 'Coating', field: 'coating_type' },
        { title: 'Coating Color', field: 'coating_color' },
        { title: 'Material', field: 'type_name' },
        { title: 'P.O. Number', field: 'porder_id' },
        { title: 'Smart Label', field: 'smart_label' },
        { title: 'Comments', field: 'comments' },
      ]}
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
        onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              console.log(newData); // only contains the new data

              resolve('Row Added');
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              // const dataUpdate = [...data];
              // const index = oldData.tableData.id;
              // dataUpdate[index] = newData;
              // setData([...dataUpdate]);

              resolve('Row Updated');
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              // const dataDelete = [...data];
              // const index = oldData.tableData.id;
              // dataDelete.splice(index, 1);
              // setData([...dataDelete]);

              resolve('Row Deleted');
            }, 1000);
          }),
      }}
      actions={[
        {
          icon: LibraryAddIcon,
          tooltip: 'Duplicate User',
          onClick: (event, rowData) => {
            const materialTable = materialTableRef.current;

            setInitialFormData({
              ...rowData,
              name: null,
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
  );
};

export default ShowPipes;
