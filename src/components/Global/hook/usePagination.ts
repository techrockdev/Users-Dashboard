import { useState } from "react";
import { useBetTableData } from "./useBetTableData";

export const usePagination = () => {
  const [offset, setOffset] = useState(0);
  const { rows } = useBetTableData();
  const rowsPerPage = 5;
  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const currentPage = Math.ceil((offset + 1) / rowsPerPage);

  const handleNextClick = () => {
    if (offset + rowsPerPage < totalRows) {
      setOffset(offset + rowsPerPage);
    }
  };

  const handlePreviousClick = () => {
    if (offset > 0) {
      setOffset(offset - rowsPerPage);
    }
  };
  return { totalPages, currentPage, handleNextClick, handlePreviousClick, rowsPerPage, totalRows, offset };
};
