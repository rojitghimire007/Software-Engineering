import React, { createRef, forwardRef, useEffect, useState } from 'react';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MaterialTable from 'material-table';
import { tableIcons } from 'utils/tableIcons';
import api from 'api';
import { unstable_batchedUpdates } from 'react-dom';
import { MenuItem } from '@mui/material';

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

const diameters = [
  '10″',
  '2 1/2″',
  '26″',
  '7″',
  '46″',
  '1″',
  '32″',
  '8″',
  '48″',
  '1 1/2″',
  '18″',
  '4 1/2″',
  '11″',
  '30″',
  '34″',
  '6″',
  '1/4″',
  '3/8″',
  '24″',
  '9″',
  '2″',
  '28″',
  '14″',
  '1 1/4″',
  '3″',
  '12″',
  '3/4″',
  '20″',
  '16″',
  '4″',
  '22″',
  '54″',
  '1/2″',
  '1/8″',
  '5″',
  '3 1/2″',
  '42″',
  '36″',
];

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
      po_number: 43526725,
      comments: 'Hello World',
    },
  ]);

  const [schedules, setSchedules] = useState({});
  const [grades, setGrades] = useState({});
  const [coatings, setCoatings] = useState({});
  const [materials, setMaterials] = useState({});
  const [po_numbers, setPO_numbers] = useState({});

  useEffect(() => {
    api
      .getPipes()
      .then((res) => {
        setData(res.pipes);
        //     api
        //       .getOptions()
        //       .then((res2) => {
        //     unstable_batchedUpdates(() => {
        //         setSchedules(res2.schedules);
        //         setGrades(res2.grades);
        //         setCoatings(res2.coatings);
        //         setMaterials(res2.materials);
        //         setPO_nos(res2.po_numbers);
        //     })
        // })
        //       .catch((err) => alert(err.message));
      })
      .catch((err) => alert(err.message));
  }, []);

  const arrayToKeyValues = (data: any[]) => {
    let ans: any = {};
    let i = 0;
    for (let element of data) {
      ans[i] = element;
      i++;
    }

    return ans;
  };

  const onRowAdd = (newData: dataType) => {
    return api
      .addPipe(newData)
      .then((res) => {
        setData([...data, newData]);
        return res;
      })
      .catch((err) => alert(err.message));
  };

  const handleDiameterChange = (event: SelectChangeEvent) => {
    // api
    //   .getSchedules(event.target.value)
    //   .then((res) => {
    //     setSchedules(res);
    //   })
    //   .catch((err) => alert(err.message));
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Duplicate Action Preview"
      options={{
        filtering: true,
        search: false,
        rowStyle: (rowData) => ({
          backgroundColor: rowData.color ? rowData.color : null,
          color: rowData.color ? 'white' : 'black',
        }),
        // tableLayout: 'fixed',
        columnsButton: true,
      }}
      columns={[
        { title: 'Void', field: 'void', type: 'boolean' },
        {
          title: 'Date',
          field: 'inventory_date',
          editable: 'never',
          hidden: true,
        },

        { title: 'Inspector', field: 'inspector', editable: 'never' }, //extract

        { title: 'Location', field: 'location' },
        // { title: 'ID', field: 'id' },
        { title: 'Coil Number', field: 'coil_number' },
        { title: 'Heat Number', field: 'heat_number' },
        { title: 'Manufacturer', field: 'mfg' },

        //Requires extraction
        {
          title: 'Diameter',
          field: 'diameter',
          // lookup: arrayToKeyValues(diameters),
          editComponent: (rowData) => (
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={handleDiameterChange}
              label="Age"
            >
              {diameters.map((value) => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: 'Schedule & Class',
          field: 'schedule_class',
          lookup: schedules,
        },

        { title: 'Grade', field: 'grade', lookup: grades }, // Extract SMYS as well

        { title: 'Length', field: 'pipe_length' },

        // Requires extraction
        {
          title: 'Coating',
          field: 'coating_type',
          lookup: Object.keys(coatings),
        },
        {
          title: 'Coating Color',
          field: 'coating_color',
          lookup: Object.values(coatings),
        },

        { title: 'Material', field: 'material', lookup: materials },
        { title: 'P.O. Number', field: 'purchase_order', lookup: po_numbers },
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
        onRowAdd: onRowAdd,
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
          icon: () => <LibraryAddIcon />,
          tooltip: 'Duplicate Pipe',
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
