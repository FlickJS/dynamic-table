import React, { useState, useCallback } from "react";
import classes from "./assets/App.module.css";
import DynamicTable, { Row } from "./components/DynamicTable";

function App() {
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>([]);

  const handleRowClick = useCallback(
    (row: Row) => {
      if (breadcrumbPath[breadcrumbPath.length - 1] !== row.title) {
        setSelectedRow(row);
        setBreadcrumbPath((prev) => [...prev, row.title]);
      }
    },
    [breadcrumbPath]
  );

  const handleBreadcrumbClick = useCallback((index: number) => {
    setBreadcrumbPath((prev) => prev.slice(0, index + 1));
    setSelectedRow(null);
  }, []);

  return (
    <div className={classes.App}>
      <div className={classes.Breadcrumb}>
        {breadcrumbPath.map((path, index) => (
          <span key={index} onClick={() => handleBreadcrumbClick(index)}>
            {path + (index < breadcrumbPath.length - 1 ? "" : "")}
          </span>
        ))}
      </div>
      <DynamicTable onRowClick={handleRowClick} />
      <div className={classes.Details}>
        {selectedRow && (
          <>
            <p>
              <span>Title:</span> {selectedRow.title}
            </p>
            <p>
              <span>ID:</span> {selectedRow.id}
            </p>
            <p>
              <span>Authors:</span> {selectedRow.authors}
            </p>
            <p>
              <span>Kind:</span> {selectedRow.kind}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
