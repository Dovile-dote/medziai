import { useEffect, useState } from 'react';
import axios from 'axios';
import FrontContext from './components/front/FrontContext';
import FrontList from './components/front/List';
import TreeList from './components/front/TreeList';

function Front() {
  const [goods, setGoods] = useState(null);
  const [trees, setTrees] = useState(null);
  const [createComment, setCreateComment] = useState(null);
  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/front/gerybes').then((res) => {
      console.log(res.data);
      setGoods(res.data);
    });
  }, []);

  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/front/medziai').then((res) => {
      console.log(res.data);
      setTrees(res.data);
    });
  }, []);

  // Create
  useEffect(() => {
    if(null === createComment) return;
    axios.post('http://localhost:3003/front/komentarai').then(())
  })
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
            <div className="col-7">
              <TreeList />
            </div>
          </div>
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;
