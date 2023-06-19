import React, { useMemo, useState, useEffect } from "react";
import { useTable, Column } from "react-table";
import { fetchData } from "../api/Api";

import classes from "../assets/DynamicTable.module.css";

export interface Row {
  id: string;
  title: string;
  authors: string;
  kind: string;
}

interface DynamicTableProps {
  onRowClick: (row: Row) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ onRowClick }) => {
  const [data, setData] = useState<Row[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      if (result.error) {
        setError("FAILED TO FETCH DATA");
      } else if (result.data) {
        setData(result.data);
      }
    };

    getData();
  }, []);

  const columns: Column<Row>[] = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Title", accessor: "title" },
      { Header: "Authors", accessor: "authors" },
      { Header: "Kind", accessor: "kind" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (error) {
    return <div className={classes.error}>{error}</div>;
  }

  return (
    <div className={classes.tableContainer}>
      <table
        {...getTableProps()}
        className={classes.dynamicTable}
        style={{
          overflowX: "scroll",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  background:
                    row.original.id === selectedRowId ? "#141414" : "white",
                  color:
                    row.original.id === selectedRowId ? "white" : "#141414",
                }}
                onClick={() => {
                  setSelectedRowId(row.original.id);
                  onRowClick(row.original);
                }}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className={classes.dynamicCell}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
