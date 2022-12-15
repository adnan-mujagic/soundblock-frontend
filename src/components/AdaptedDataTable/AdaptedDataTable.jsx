import React from "react";
import DataTable from "react-data-table-component";
import colors from "../../utils/colors";
import typography from "../../utils/typography";

export function getColumnsWithImage(imageKey, columns) {
  return [
    {
      cell: (row) => (
        <div
          style={{
            borderRadius: "4px",
            overflow: "hidden",
            margin: "10px",
            aspectRatio: "1 / 1",
            height: "40px",
            backgroundImage: `url(${row[imageKey]})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      ),
    },
    ...columns,
  ];
}

function AdaptedDataTable(props) {
  const customStyles = {
    headCells: {
      style: {
        color: colors.green,
        fontSize: typography.header,
      },
    },
    rows: {
      style: {
        fontSize: typography.normal,
      },
    },
  };

  return <DataTable {...props} customStyles={customStyles} />;
}

export default AdaptedDataTable;
