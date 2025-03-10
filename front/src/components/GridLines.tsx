import React from 'react';

interface GridLinesProps {
  cols?: number; 
  rows?: number; 
  colWidth?: number | string; 
  rowHeight?: number | string; 
}

const GridLines: React.FC<GridLinesProps> = ({
  cols = 12,
  rows = 7,
  colWidth = 'auto',
  rowHeight = 'auto',
}) => {
  const colWidthStyle = typeof colWidth === 'number' ? `${colWidth}px` : colWidth;
  const rowHeightStyle = typeof rowHeight === 'number' ? `${rowHeight}px` : rowHeight;

  const columns = Array.from({ length: cols }, (_, index) => (
    <div
      key={`col-${index}`}
      className="border-r-1 border-gray-300 dark:border-gray-700 h-full border-dashed"
      style={{ width: colWidthStyle }}
    ></div>
  ));

  const rowsElements = Array.from({ length: rows }, (_, index) => (
    <div
      key={`row-${index}`}
      className="border-b-1 border-gray-300 dark:border-gray-700 w-full border-dashed"
      style={{ height: rowHeightStyle }}
    ></div>
  ));

  return (
    <>
      <div
        className="grid w-full h-full absolute z-0 pt-6"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${colWidthStyle})`,
          justifyItems: 'center',
        }}
      >
        {columns}
      </div>

      <div
        className="grid w-full h-full absolute z-0 px-6"
        style={{
          gridTemplateRows: `repeat(${rows}, ${rowHeightStyle})`,
          alignItems: 'center',
        }}
      >
        {rowsElements}
      </div>
    </>
  );
};

export default GridLines;