import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import { tableIcons } from "utils/tableIcons";
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

    if(newData.degree === oldData.degree && newData.bdirection === oldData.bdirection && newData.blength == oldData.blength){
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
        id: oldData.id
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
    return api.removeBend(oldData.bend_id).then((res) => {
      const dataDelete = [...data];
      const index = oldData.tableData.id;
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
    })
    .catch(err=> {
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
      <MaterialTable
        icons={tableIcons}
        title="Bend Information"
        columns={[
          { title: "Item ID", field: "id", type: "string", editable: 'onAdd' },
          { title: "Degree", field: "degree", type: "string" },
          { title: "Bend Direction", field: "bdirection", type: "string" },
          { title: "Length", field: "blength", type: "string" },
          {
            title: "Bend Date",
            field: "bdate",
            type: "date",
            editable: "never",
          },
          {
            title: "Bend Inspector",
            field: "created_by",
            type: "string",
            editable: "never",
          },
          {
            title: "Bend_id",
            field: "bend_id",
            editable: "never",
            hidden: true,
          },
        ]}
        data={data}
        editable={{
          onRowAdd: rowAddFunc,
          onRowUpdate: rowUpdateFunc,
          onRowDelete: rowDeleteFunc,
        }}
      />
    </>
  );
};

export default BendInfo;
