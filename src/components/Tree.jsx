import { useContext } from 'react';
import TreeContext from '../components/TreeContext';

function Tree({ tree }) {
  const { setDeleteData, setModalData } = useContext(TreeContext);

  const handleDelete = () => {
    setDeleteData(tree);
  };

  const handleEdit = () => {
    setModalData(tree);
  };

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <b>{tree.title}</b>
          <span>{['Leaf', 'Spike', 'Palm'][tree.type - 1]}</span>
          <i>{tree.height.toFixed(2)} m</i> <u>{tree.good}</u>
        </div>
        <div className="buttons">
          <button className="btn btn-outline-success ml-2" onClick={handleEdit}>
            EDIT
          </button>
          <button
            className="btn btn-outline-danger ml-2"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </li>
  );
}

export default Tree;
