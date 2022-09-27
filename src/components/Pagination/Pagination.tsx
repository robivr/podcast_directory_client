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

  let pageRange = [];
  for (let i = 1; i <= totalPageCount; i++) {
    pageRange.push(i);
  }

  const className =
    'inline-flex items-center bg-white hover:bg-gray-50 border border-gray-300 text-gray-500 text-sm font-medium px-4 py-2';

  const prevButton = (
    <button
      key="<"
      onClick={() => props.handlePageChange(props.page - 1)}
      disabled={props.page <= 1}
      className="inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      &lt;
    </button>
  );
  const nextButton = (
    <button
      key=">"
      onClick={() => props.handlePageChange(props.page + 1)}
      disabled={props.page >= totalPageCount}
      className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      &gt;
    </button>
  );

  const leftButtons = (currentPage: number) => {
    const leftButtonArray = [];

    for (let i = currentPage - 1; i > currentPage - 1 - adjacentCount; i--) {
      if (i < 2) break;
      leftButtonArray.push(
        <button
          key={i}
          onClick={() => props.handlePageChange(i)}
          className={className}
        >
          {i}
        </button>
      );
    }

    if (currentPage !== 1) {
      leftButtonArray.push(
        <button
          key={1}
          onClick={() => props.handlePageChange(1)}
          className={className}
        >
          1
        </button>
      );
    }

    leftButtonArray.push(prevButton);

    return leftButtonArray.reverse();
  };

  const rightButtons = (currentPage: number) => {
    const rightButtonArray = [];

    for (let i = currentPage + 1; i < currentPage + 1 + adjacentCount; i++) {
      if (i >= totalPageCount) break;
      rightButtonArray.push(
        <button
          key={i}
          onClick={() => props.handlePageChange(i)}
          className={className}
        >
          {i}
        </button>
      );
    }

    if (currentPage !== totalPageCount) {
      rightButtonArray.push(
        <button
          key={totalPageCount}
          onClick={() => props.handlePageChange(totalPageCount)}
          className={className}
        >
          {totalPageCount}
        </button>
      );
    }

    rightButtonArray.push(nextButton);

    return rightButtonArray;
  };

  return (
    <div className="pagination">
      {leftButtons(props.page)}
      <button
        onClick={() => props.handlePageChange(props.page)}
        className="inline-flex items-center z-10 bg-indigo-50 border-indigo-500 border px-4 py-2 text-sm font-medium"
      >
        {props.page}
      </button>
      {rightButtons(props.page)}
    </div>
  );
};

export default Pagination;
