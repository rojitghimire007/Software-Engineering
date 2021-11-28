import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import { tableIcons } from "utils/tableIcons";
import useStyles from "style/ShowPipeStyles";
import MenuAppBar from "../../components/AppBar";
import { Typography, CssBaseline, Toolbar } from "@material-ui/core";
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

  const classes = useStyles();

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
      <div className={classes.wrapper}>
        <div>
          <MenuAppBar />
          <CssBaseline />
          <Toolbar className={classes.title}>
            <Typography variant="h4" className={classes.titleContent}>
              Data Log
            </Typography>
          </Toolbar>
        </div>
        <div className={classes.stickyActions}>
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
              {
                title: "Rote Pass",
                field: "rp",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "HP (D/W)",
                field: "hp",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "2nd HP",
                field: "hpp",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Welding Inspector",
                field: "weld",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Weld Date",
                field: "wdate",
                type: "date",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Cap (D/W)",
                field: "fl",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Fire Lane Date",
                field: "fldate",
                type: "date",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Repair",
                field: "repair",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Cut-outs",
                field: "cutout",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Procedure",
                field: "proc",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Type of Weld",
                field: "wtype",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "X-Ray",
                field: "xray",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "X-Ray Date",
                field: "xdate",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Coating Type",
                field: "ctype",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Coating Date",
                field: "cdate",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Coating Inspector",
                field: "cinspect",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Latitude",
                field: "lat",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Longitude",
                field: "long",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Elevation",
                field: "elev",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Survey",
                field: "sur",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Distance",
                field: "dist",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Elevation",
                field: "ele",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Survey Elevation",
                field: "sele",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Survey Crew",
                field: "screw",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Survey date",
                field: "sdate",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Hard Station No. (Start)",
                field: "hsns",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Hard Station No. (End)",
                field: "hsne",
                type: "string",
                cellStyle: {
                  border: "solid",
                },
              },
              {
                title: "Engineering notes",
                field: "enote",
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
              sorting: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MasterLog;
