import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function Tree({ tree }) {
  const { setCreateComment } = useContext(FrontContext);

  const [com, setCom] = useState('');

  const handleComment = () => {
    setCreateComment({ com, treeId: tree.id });
    setCom('');
  };
  return (
    <li className="list-group-item">
      <div className="item-front">
        <div className="content">
          <b>{tree.title}</b>
          <span>{['Leaf', 'Spike', 'Palm'][tree.type - 1]}</span>
          <i>{tree.height.toFixed(2)} m</i> <u>{tree.good}</u>
        </div>
        <div className="form-group">
          <label>Your comment here</label>
          <textarea
            className="form-control"
            value={com}
            onCange={(e) => setCom(e.target.value)}
          ></textarea>
        </div>
        <div className="buttons">
          <button
            className="btn btn-outline-success ml-2"
            onClick={handleComment}
          >
            I want to say
          </button>
        </div>
      </div>
    </li>
  );
}

export default Tree;
