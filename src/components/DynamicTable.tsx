import React, { useMemo, useState, useEffect } from "react";
import { useTable, Column } from "react-table";
import { fetchData } from "../api/Api";

import classes from "../assets/DynamicTable.module.css";

export interface Row {
  id: string;
  title: string;
  authors: string;
}

interface DynamicTableProps {
  onRowClick: (row: Row) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ onRowClick }) => {
  const [data, setData] = useState<Row[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setData(data);
    };

    getData();
  }, []);

  const columns: Column<Row>[] = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Title", accessor: "title" },
      { Header: "Authors", accessor: "authors" },
      // Add other relevant fields
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className={classes.dynamicTable}>
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
                color: row.original.id === selectedRowId ? "#0B68FF" : "black",
              }}
              onClick={() => {
                setSelectedRowId(row.original.id);
                onRowClick(row.original);
              }}

            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className={classes.dynamicCell}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DynamicTable;
