import './App.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/trees').then((res) => {
      setTrees(res.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Medziai</h1>
        {trees.map((t) => (
          <div key={t.id}>{t.title}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
