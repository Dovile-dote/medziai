import { useEffect, useState } from 'react';
import './bootstrap.css';
import './crud.css';
import Create from './crud/Create';
import List from './crud/List';
import Edit from './crud/Edit';
import TreeContext from './components/TreeContext';
import axios from 'axios';

function App() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [trees, setTrees] = useState(null);

  const [modalData, setModalData] = useState(null);

  const [createData, setCreateData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);

  const [editData, setEditData] = useState(null);

  // Read
  useEffect(() => {
    axios
      .get('http://localhost:3003/medziai')
      .then((res) => setTrees(res.data));
  }, [lastUpdate]);

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios.post('http://localhost:3003/medziai', createData).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios.delete('http://localhost:3003/medziai/' + deleteData.id).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [deleteData]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/medziai/' + editData.id, editData)
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  return (
    <TreeContext.Provider
      value={{
        trees,
        setCreateData,
        setDeleteData,
        //
        setEditData,
        modalData,
        setModalData,
        //
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-4 mt-4">
            <Create></Create>
          </div>

          <div className="col-8">
            {/* <List trees={trees} setModalData={setModalData}></List> */}
            <List></List>
            {/*  */}
          </div>
        </div>
      </div>
      {/* <Edit
        setEditData={setEditData}
        modalData={modalData}
        setModalData={setModalData}
      ></Edit> */}
      <Edit></Edit>
    </TreeContext.Provider>
  );
}
export default App;
