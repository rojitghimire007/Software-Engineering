import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

import api from "api";

interface DataType {
  uname: string;
  fname: string;
  email: string;
  phone: string | null;
  pass: string;
}

const AddUser = (props: any) => {
  const [allUser, setAllUser] = useState<DataType[]>([]);
  const [user, setUser] = useState<string | null>("");

  const getAllUsers = () => {
    api
      .allUsers()
      .then((res) => {
        setAllUser(res.data);
      })
      .catch((err) => alert(err.message));
  };

  const generateDataList = () => {
    let optionList = allUser.map((usr) => {
      let fullname = usr.fname;
      let email = usr.email;
      let usrname = usr.uname;

      let display = fullname + " - " + email;
      return <option value={usrname}>{display}</option>;
    });

    return optionList;
  };

  const addUser = (e: any) => {
    e.preventDefault();
    console.log(user)
    try {
      if (user == "") {
        throw new Error("Give a valid user!");
      }
      api
        .addUserToProject({ users: [user] })
        .then((res) => {
          alert(res.message);
          props.getUsers();
        })
        .catch((err) => alert(err.message));
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <form onSubmit={(e) => addUser(e)}>
        <label
          style={{
            fontSize: "large",
            fontWeight: "bold",
            marginLeft: "1rem",
            marginTop: "1rem",
            marginRight: ".5rem",
          }}
        >
          Choose a user to add to the project:
        </label>
        <input
          list="users"
          name="user"
          id="user"
          onChange={(e) => setUser(e.target.value)}
        />
        <datalist id="users">{generateDataList()}</datalist>
        <input type="submit" />
      </form>
    </>
  );
};

export default AddUser;
