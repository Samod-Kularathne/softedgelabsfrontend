import React from "react";
import styles from "../styles/Table.module.scss";

const Table = ({ headers, data, renderRow }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>{data.map(renderRow)}</tbody>
  </table>
);

export default Table;
