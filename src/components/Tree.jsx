import { useContext } from 'react';
import TreeContext from '../components/TreeContext';

function Tree({ tree }) {
  const { setDeleteData, setModalData, handleDeleteComment } =
    useContext(TreeContext);

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
      <ul className="list-group mt-2">
        {tree.coms
          ? tree.coms
              .slice(0, -5)
              .split('-^o^-,')
              .map((c, i) => (
                <li className="list-group-item" key={i}>
                  <button
                    className="btn btn-outline-danger mt-3"
                    onClick={() =>
                      handleDeleteComment(tree.coms_id.split(',')[i])
                    }
                  >
                    DELETE
                  </button>
                </li>
              ))
          : null}
      </ul>
    </li>
  );
}

export default Tree;
