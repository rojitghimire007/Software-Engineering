import React, { createRef, forwardRef, useEffect, useState } from 'react';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MaterialTable from 'material-table';
import { tableIcons } from 'utils/tableIcons';
import api from 'api';
import { unstable_batchedUpdates } from 'react-dom';
import { MenuItem } from '@mui/material';

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
  const [data, setData] = useState<dataType[]>([
    // {
    //     id: 1234,
    //     inspector: "Todd Deville",
    //     location: "Shreveport",
    //     dimension: "20",
    //     style: "Tee",
    //     wall_thickness: 0.375,
    //     grade: "Y65",
    //     heat_number: "A15AAT",
    //     mfg: "Hackney Ladish",
    //     coating_type: "Bare",
    //     description: "Barred",
    //     material: "Steel",
    //     purchase_order: 6969420,
    //     smart_label: '',
    // }
  ]);

  // const [schedules, setSchedules] = useState({});
  // const [grades, setGrades] = useState({});
  // const [coatings, setCoatings] = useState({});
  // const [materials, setMaterials] = useState({});
  // const [po_numbers, setPO_numbers] = useState({});

  useEffect(() => {
    api
      .getFittings()
      .then((res) => {
        setData(res);
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
        columnsButton: true,
      }}
      columns={[
        { title: 'Void', field: 'isvoid', type: 'boolean' },
        { title: 'Date', field: 'inventory_date', editable: 'never' },
        { title: 'Inspector', field: 'inspector', editable: 'never' },
        { title: 'ID', field: 'id' },
        { title: 'Location', field: 'location' },
        { title: 'Dimensions', field: 'dimension' },
        { title: 'Style', field: 'style' },
        { title: 'Type' },
        { title: 'Wall Thickness', field: 'wall_thickness' },
        { title: 'Grade Type', field: 'grade' },
        { title: 'Heat Number', field: 'heat_number' },
        { title: 'Manufacturer', field: 'mfg', editable: 'never' },
        { title: 'Length', field: 'length' },
        { title: 'Coating', field: 'coating_type' },
        { title: 'Description', field: 'description' },
        { title: 'Material', field: 'material' },
        { title: 'P.O. Number', field: 'purchase_order' },
        { title: 'Smart Label', field: 'smart_label' },
        { title: 'Comments', field: 'comments' },
      ]}
      data={data}
      tableRef={materialTableRef}
      initialFormData={initialFormData}
      editable={{
        onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
        onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),
        onRowAdd: onRowAdd,
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve('Row Updated');
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve('Row Deleted');
            }, 1000);
          }),
      }}
      actions={[
        {
          icon: () => <LibraryAddIcon />,
          tooltip: 'Duplicate Fitting',
          onClick: (event, rowData) => {
            const materialTable = materialTableRef.current;

            setInitialFormData({
              ...rowData,
              id: null,
              inspector: null,
              inventory_date: null,
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

export default ShowFittings;
