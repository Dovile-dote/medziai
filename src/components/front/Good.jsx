function Good({ good }) {
  return (
    <li className="list-group-item">
      <div className="item">
        <div className="nest-content">
          <h2>{good.title} </h2>
          <ul className="list-group">
            {good.tree_titles
              ? good.tree_titles.split(',').map((t, i) => (
                  <li key={i} className="list-group-item">
                    {t}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default Good;
