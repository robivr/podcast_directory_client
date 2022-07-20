import React from 'react';

interface PaginationProps {
  page: number;
  resultCount: number;
  perPage: number;
  handlePageChange(currPage: number): void;
  adjacentCount?: number;
}

const Pagination = (props: PaginationProps) => {
  const totalPageCount = Math.ceil(props.resultCount / props.perPage);
  const adjacentCount = props.adjacentCount ? props.adjacentCount : 1;
  const totalButtons = adjacentCount + 3;

  console.log(props.resultCount, props.perPage, totalPageCount);
  let pageRange = [];
  for (let i = 1; i <= totalPageCount; i++) {
    pageRange.push(i);
  }

  const buttonClass = 'border-2 border-cyan-500 p-1 mt-1 mr-1';
  const prevButton = (
    <button
      onClick={() => props.handlePageChange(props.page - 1)}
      disabled={props.page <= 1}
      className={buttonClass}
    >
      &lt;
    </button>
  );
  const nextButton = (
    <button
      onClick={() => props.handlePageChange(props.page + 1)}
      disabled={props.page >= totalPageCount}
      className={buttonClass}
    >
      &gt;
    </button>
  );

  // if (totalButtons > totalPageCount) {
  //   return (
  //     <>
  //       <button
  //         onClick={() => props.handlePageChange(props.page - 1)}
  //         disabled={props.page <= 1}
  //         className={buttonClass}
  //       >
  //         &lt;
  //       </button>

  //       {pageRange.map((page) => (
  //         <button
  //           key={page}
  //           onClick={() => props.handlePageChange(page)}
  //           className={
  //             buttonClass + (page === props.page ? ' bg-indigo-500' : '')
  //           }
  //         >
  //           {page}
  //         </button>
  //       ))}

  //       <button
  //         onClick={() => props.handlePageChange(props.page + 1)}
  //         disabled={props.page >= totalPageCount}
  //         className={buttonClass}
  //       >
  //         &gt;
  //       </button>
  //     </>
  //   );
  // }

  const leftButtons = (currentPage: number) => {
    const leftButtonArray = [];

    for (let i = currentPage - 1; i > currentPage - 1 - adjacentCount; i--) {
      if (i < 2) break;
      //console.log(currentPage, i);
      leftButtonArray.push(
        <button
          onClick={() => props.handlePageChange(i)}
          className={buttonClass}
        >
          {i}
        </button>
      );
    }

    if (currentPage !== 1) {
      leftButtonArray.push(
        <button
          onClick={() => props.handlePageChange(1)}
          className={buttonClass}
        >
          1
        </button>
      );
    }

    leftButtonArray.push(prevButton);

    return leftButtonArray.reverse();
  };

  // return <>{leftButtons(5)}</>;

  const rightButtons = (currentPage: number) => {
    const rightButtonArray = [];

    for (let i = currentPage + 1; i < currentPage + 1 + adjacentCount; i++) {
      if (i >= totalPageCount) break;
      console.log(currentPage, i);
      rightButtonArray.push(
        <button
          onClick={() => props.handlePageChange(i)}
          className={buttonClass}
        >
          {i}
        </button>
      );
    }

    if (currentPage !== totalPageCount) {
      rightButtonArray.push(
        <button
          onClick={() => props.handlePageChange(totalPageCount)}
          className={buttonClass}
        >
          {totalPageCount}
        </button>
      );
    }

    rightButtonArray.push(nextButton);

    return rightButtonArray;
  };

  // return <>{rightButtons(5)}</>;

  return (
    <>
      {leftButtons(props.page)}
      <button
        onClick={() => props.handlePageChange(props.page)}
        className={buttonClass + ' bg-red-500'}
      >
        {props.page}
      </button>
      {rightButtons(props.page)}
    </>
  );

  return (
    <>
      <button
        onClick={() => props.handlePageChange(props.page - 1)}
        disabled={props.page <= 1}
        className={buttonClass}
      >
        &lt;
      </button>

      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => props.handlePageChange(page)}
          className={buttonClass + (page === props.page ? ' bg-red-500' : '')}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => props.handlePageChange(props.page + 1)}
        disabled={props.page >= totalPageCount}
        className={buttonClass}
      >
        &gt;
      </button>
    </>
  );
};

export default Pagination;
