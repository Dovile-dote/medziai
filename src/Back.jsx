import { useEffect, useState } from 'react';
// import './bootstrap.css';
// import './crud.scss';
import Create from './components/Create';
import List from './components/List';
import Edit from './components/Edit';
import Message from './components/Message';
import TreeContext from './components/TreeContext';
import axios from 'axios';
import GoodContext from './components/goods/GoodContext';

import CreateGoods from './components/goods/Create';
import ListGoods from './components/goods/List';

function Back() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // /////TREES/////
  const [trees, setTrees] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  // /////GOODS////
  const [goods, setGoods] = useState(null);
  const [createDataGoods, setCreateDataGoods] = useState(null);
  const [deleteDataGoods, setDeleteDataGoods] = useState(null);

  const [message, setMessage] = useState(null);

  const [disableCreate, setDisableCreate] = useState(false);

  // reloadinti puslapi kas 3 sekundes
  useEffect(() => {
    // setInterval(() => setLastUpdate(Date.now()), 3000);
  }, []);

  // ///////////////////TREES/////////////////
  // Read
  useEffect(() => {
    axios
      .get('http://localhost:3003/medziai')
      .then((res) => setTrees(res.data));
  }, [lastUpdate]);

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios
      .post('http://localhost:3003/medziai', createData)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      // gaudo .catch errorus
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
        console.log(error);
      })
      .then(() => {
        setDisableCreate(false);
      });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios.delete('http://localhost:3003/medziai/' + deleteData.id).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [deleteData]);

  // DElete comment

  const handleDeleteComment = (id) => {
    axios.delete('http://localhost:3003/komentarai/' + id).then((_) => {
      setLastUpdate(Date.now());
    });
  };

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/medziai/' + editData.id, editData)
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // ////////////////////GOODS//////////////////

  // Create
  useEffect(() => {
    if (null === createDataGoods) return;
    axios.post('http://localhost:3003/gerybes', createDataGoods).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [createDataGoods]);

  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/gerybes').then((res) => {
      console.log(res.data);
      setGoods(res.data);
    });
  }, [lastUpdate]);

  // Delete
  useEffect(() => {
    if (null === deleteDataGoods) return;
    axios
      .delete('http://localhost:3003/gerybes/' + deleteDataGoods.id)
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [deleteDataGoods]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <TreeContext.Provider
      value={{
        trees,
        setCreateData,
        setDeleteData,
        setModalData,
        modalData,
        setEditData,
        message,
        disableCreate,
        setDisableCreate,
        goods,
        handleDeleteComment,
      }}
    >
      <GoodContext.Provider
        value={{
          setCreateData: setCreateDataGoods,
          goods,
          setDeleteData: setDeleteDataGoods,
          deleteData: deleteDataGoods,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-4 mt-4">
              <Create />
              <CreateGoods />
              <ListGoods />
            </div>

            <div className="col-8">
              <List></List>
            </div>
          </div>
        </div>
        <Edit></Edit>
        <Message></Message>
      </GoodContext.Provider>
    </TreeContext.Provider>
  );
}
export default Back;
