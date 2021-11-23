import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import { tableIcons } from "utils/tableIcons";
import api from "api";

interface DataType {
  fromNum: string;
  toNum: string;
  id: string;
  coilNum: string | null;
  heatNum: string | null;
  diameter: string | null;
  thick: number | null;
  grade: string | null;
  iLength: number | null;
  coat: string | null;
  manufacture: string | null;
  create_date: Date;
  inspector: string | null;
  string_date: string | null;
  string_inspector: string | null;
  bends: string | null;
  bendData: string | null;
  bendPer: string | null;
  item_type: string | null;
}

const MasterLog = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    api
      .getAggreate()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Master Log Information"
        columns={[
          {
            title: "From",
            field: "fromNum",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "To",
            field: "toNum",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Item type",
            field: "item_type",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Id No.",
            field: "id",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Coil No.",
            field: "coilNum",
            type: "date",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Heat No.",
            field: "heatNum",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Diameter",
            field: "diameter",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Wall",
            field: "thick",
            type: "numeric",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Length",
            field: "iLength",
            type: "numeric",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Grade",
            field: "grade",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Coating",
            field: "coat",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Manufacture",
            field: "manufacture",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Yard Date",
            field: "create_date",
            type: "date",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Yard Inspector",
            field: "inspector",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "String Date",
            field: "string_date",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "String Inspector",
            field: "string_inspector",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Bending Degree",
            field: "bends",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Bending Date",
            field: "bendDate",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
          {
            title: "Bending Inspector",
            field: "bendPer",
            type: "string",
            cellStyle: {
              border: "solid",
            },
          },
        ]}
        data={data}
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
          pageSize: 10,
          pageSizeOptions: [5, 10, 25, 50],
          actionsCellStyle: { zIndex: 999 },
          maxBodyHeight: "70vh",
          minBodyHeight: "35vh",
          exportButton: true,
          sorting: true
        }}
      />
    </>
  );
};

export default MasterLog;
