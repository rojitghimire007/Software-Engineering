import api from 'api';
import React, { useEffect, useState } from 'react';
import 'style/Poc.css';

const Poc = () => {
  const [data, setData] = useState<Array<{ name: string; phone: string }>>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNo, setNewNo] = useState('');

  useEffect(() => {
    api
      .getPOC()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const getEntries = () => {
    return data.map((entry) => {
      return (
        <div className="entryRow">
          <div>{entry.name}</div>
          <div>{entry.phone}</div>
        </div>
      );
    });
  };

  const updateNewEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      setNewName(e.target.value);
    } else {
      setNewNo(e.target.value);
    }
  };

  const updateDatabase = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForm(false);
    setData([...data, { name: newName, phone: newNo }]);

    api.postPOC({ name: newName, phone: newNo });

    setNewNo('');
    setNewName('');
  };

  return (
    <>
      <div
        style={{
          width: '75%',
          margin: 'auto',
          marginTop: '5%',
        }}
      >
        {getEntries()}
        {showForm ? (
          <div className="entryRow">
            <input
              value={newName}
              onChange={updateNewEntry}
              name="name"
              type="text"
              placeholder="Add Name"
            />
            <input
              value={newNo}
              onChange={updateNewEntry}
              name="no"
              type="text"
              placeholder="Add Phone no."
            />
          </div>
        ) : null}
        {!showForm ? (
          <input
            type="button"
            value="Add New Entry"
            onClick={(e) => {
              e.preventDefault();
              setShowForm(true);
            }}
            className="button"
          />
        ) : (
          <input
            type="button"
            value="SUBMIT"
            onClick={updateDatabase}
            className="button"
          />
        )}
      </div>
    </>
  );
};

export default Poc;
