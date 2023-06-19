import React, { useState, useCallback } from "react";
import classes from "./App.module.css";
import DynamicTable, { Row } from "./components/DynamicTable";

function App() {
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<Row[]>([]);

  const handleRowClick = useCallback((row: Row) => {
    setSelectedRow(row);
    setBreadcrumbPath((prev) => [...prev, row]); // Append the new path to the breadcrumb
  }, []);

  const handleBreadcrumbClick = useCallback((index: number) => {
    const newBreadcrumbPath = breadcrumbPath.slice(0, index + 1); // Remove paths after the clicked path
    setBreadcrumbPath(newBreadcrumbPath);
    setSelectedRow(newBreadcrumbPath[newBreadcrumbPath.length - 1]); // Set the selected row to the one we've navigated back to
  }, [breadcrumbPath]);

  return (
    <div className={classes.App}>
      <div className={classes.Breadcrumb}>
        {breadcrumbPath.map((path, index) => (
          <span key={index} onClick={() => handleBreadcrumbClick(index)}>
            {path.title + (index < breadcrumbPath.length - 1 ? " > " : "")}
          </span>
        ))}
      </div>
      <DynamicTable onRowClick={handleRowClick} />
      <div className={classes.Details}>
        {selectedRow && (
          <>
            <p><span>Title:</span> {selectedRow.title}</p>
            <p><span>ID:</span> {selectedRow.id}</p>
            <p><span>Authors:</span> {selectedRow.authors}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
