import { Login } from "@mui/icons-material";
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import useStyles from "style/ProjectSelectStyles";
import api from "api";
import { getLocalStorage, setLocalStorage } from "utils/utils";
import { AppBar, Toolbar, Typography } from "@mui/material";

const ProjectSelect = () => {
  const classes = useStyles("");
  const history = useHistory();
  const link = "dashboard";
  const [selected, setSelected] = useState([-1, ""]);
  const [errored, setErrored] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState<
    Array<{
      [index: number | string]: any;
    }>
  >([]);

  useEffect(() => {
    api
      .getAssociatedProjects()
      .then((res: any) => {
        setProjectDetails(res.data);
      })
      .catch((err: any) => alert(err.message));
  }, []);

  const logIn = () => {
    if (selected === [-1, ""]) setErrored(true);
    else {
      api
        // .selectProject(projectDetails[parseInt(selected)].project_number)
        .selectProject(
          projectDetails[parseInt(selected[0].toString())].project_number
        )
        .then((res: any) => {
          setLocalStorage("pipeline_token", res.token);

          history.push("/");
        })
        .catch((err: any) => alert(err.message));
      // setLoading(true);
      // while (loading?) {
      //   history.push(link);
      // }
    }
    console.log("logging in to " + selected);
  };

  return (
    <div className={classes.page}>
      <AppBar position="relative" className={classes.titleTop}>
        <Toolbar>
          <Typography variant="h3" className={classes.titleTopContent}>
            Honor Guard Inspections
          </Typography>
        </Toolbar>
      </AppBar>

      {errored ? (
        <div className={classes.msg}>
          Please select a project from the list.
          <span
            className={classes.exit}
            onClick={() => {
              setErrored(!errored);
            }}
          >
            X
          </span>
        </div>
      ) : null}

      {loading ? (
        <div className={classes.loading}>
          <div className={classes.loadSymb}>
            HGI
            {console.log(classes.loadSymb)}
          </div>
          <div>Loading</div>
        </div>
      ) : null}

      <div className={classes.container}>
        <div className={classes.title}>Choose A Project</div>

        <div className={classes.list}>
          {projectDetails.map((item, index) => {
            return (
              <>
                {selected[1].toString() === item.pname ? (
                  <div
                    className={`${classes.selectedItem} ${classes.item}`}
                    onClick={(e) => {
                      setSelected([e.currentTarget.id, item.pname]);
                      setErrored(false);
                    }}
                    /* onClick={() => {
                      setSelected(item.pname);
                      setErrored(false);
                    }} */
                    key={index}
                    id={`${index}`}
                  >
                    <span style={{ margin: "3px 3px" }}>
                      {item.pname}
                      {/* , last accessed {item.accessed} */}
                    </span>
                  </div>
                ) : (
                  <div
                    className={classes.item}
                    onClick={(e) => {
                      setSelected([e.currentTarget.id, item.pname]);
                      setErrored(false);
                    }}
                    /* onClick={() => {
                    setSelected(item.pname);
                    setErrored(false);
                  }} */
                    key={index}
                    id={`${index}`}
                  >
                    <span style={{ margin: "3px 3px" }}>
                      {item.pname}
                      {/* , last accessed {item.accessed} */}
                    </span>
                  </div>
                )}
              </>
            );
          })}
        </div>

        <div className={classes.bottom}>
          {/* <span>Choose A Project</span> */}
          <div className={classes.btn} onClick={() => logIn()}>
            ENTER
          </div>
          {getLocalStorage("isAdmin") ? (
            <div
              className={classes.btn}
              onClick={() => history.push("/create-project")}
            >
              CREATE PROJECT
            </div>
          ) : (
            <> </>
          )}
          {getLocalStorage("isAdmin") ? (
            <div
              className={classes.btn}
              onClick={() => history.push("/create/user")}
            >
              CREATE USER
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSelect;
