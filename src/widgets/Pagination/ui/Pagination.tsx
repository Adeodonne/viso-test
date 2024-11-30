import React from 'react';
import { ArrowLeft, ArrowRight } from '../../../shared/ui/Icon/ui/Icon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPagination = () => {
    const pages: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 border rounded ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => onPageChange(1)}
        className={`px-4 py-2 w-10 h-10 border rounded mr-2 ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : 'bg-white text-blue-500'
        }`}
        disabled={currentPage === 1}
      >
        <img src={ArrowLeft} />
      </button>
      <div className="flex space-x-2">{renderPagination()}</div>
      <button
        onClick={() => onPageChange(totalPages)}
        className={`px-4 py-2 w-10 h-10 border rounded ml-2 ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'bg-white text-blue-500'
        }`}
        disabled={currentPage === totalPages}
      >
        <img src={ArrowRight} />
      </button>
    </div>
  );
};
