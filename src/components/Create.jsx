import { useContext, useState } from 'react';
import TreeContext from './TreeContext';

function Create() {
  const { setCreateData, disableCreate, setDisableCreate, goods } =
    useContext(TreeContext);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('1');
  const [height, setHeight] = useState('');
  const [good, setGood] = useState('0');

  const handleCreate = () => {
    setDisableCreate(true);
    const data = { title, type, height, good };
    setCreateData(data);
    setTitle('');
    setType('1');
    setHeight('');
    setGood('0');
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Create new Tree</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <small className="form-text text-muted">Enter Tree title here.</small>
        </div>
        <div className="form-group">
          <label>Type</label>
          <select
            className="form-control"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="1">Leaf</option>
            <option value="2">Spike</option>
            <option value="3">Palm</option>
          </select>
          <small className="form-text text-muted">Select Tree type here.</small>
        </div>
        <div className="form-group">
          <label>Goods</label>
          <select
            className="form-control"
            onChange={(e) => setGood(e.target.value)}
            value={good}
          >
            <option value="0">Select Goods</option>
            {goods
              ? goods.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title}
                  </option>
                ))
              : null}
          </select>
          <small className="form-text text-muted">Select nice goody.</small>
        </div>
        <div className="form-group">
          <label>Heigh</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setHeight(e.target.value)}
            value={height}
          />
          <small className="form-text text-muted">
            Enter tree height here.
          </small>
        </div>
        <button
          className="btn btn-outline-primary with-loader"
          onClick={handleCreate}
          disabled={disableCreate}
        >
          <span className="spinner-border spinner-border-sm mr-2"></span>
          <span className="spinner-text">Create</span>
        </button>
      </div>
    </div>
  );
}

export default Create;
