import { useEffect, useState } from 'react';
import axios from 'axios';
import FrontContext from './components/front/FrontContext';
import FrontList from './components/front/List';
import TreeList from './components/front/TreeList';

function Front() {
  const [goods, setGoods] = useState(null);
  const [trees, setTrees] = useState(null);
  const [createComment, setCreateComment] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Read gerybes
  useEffect(() => {
    axios.get('http://localhost:3003/front/gerybes').then((res) => {
      console.log(res.data);
      setGoods(res.data);
    });
  }, [lastUpdate]);

  // Read medziai
  useEffect(() => {
    axios.get('http://localhost:3003/front/medziai').then((res) => {
      console.log(res.data);
      setTrees(res.data);
    });
  }, [lastUpdate]);

  // Create
  useEffect(() => {
    if (null === createComment) return;
    axios
      .post('http://localhost:3003/front/komentarai', createComment)
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [createComment]);

  return (
    <FrontContext.Provider
      value={{
        goods,
        trees,
        setCreateComment,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-5">
            <FrontList />
          </div>
          <div className="col-7">
            <TreeList />
          </div>
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;
