import React from 'react';

interface PageNumberProps {
    number: number;
    isActive: boolean;
    onClick: () => void;
}

const PageNumber: React.FC<PageNumberProps> = ({
    number,
    isActive,
    onClick,
}) => {
    const baseClasses = 'px-3 w-8 h-8 rounded-md';
    const activeClasses = 'text-white bg-blue-600';
    const inactiveClasses = 'bg-neutral-100';

    return (
        <button
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
            className={`${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
            {number}
        </button>
    );
};

interface PaginationComponentProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav
            aria-label="Pagination"
            className="flex gap-4 justify-center items-center text-base font-medium tracking-wide text-center text-blue-600 whitespace-nowrap mt-[60px]"
        >
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/2de423749e642867f9234165a24938928b2cdf9588d343cd6065b87c0140930f?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
            </button>
            <div className="flex gap-2 items-end self-stretch my-auto">
                {pageNumbers.map((number) => {
                    // Always show first page
                    if (number === 1) {
                        return (
                            <PageNumber
                                key={number}
                                number={number}
                                isActive={number === currentPage}
                                onClick={() => onPageChange(number)}
                            />
                        );
                    }

                    // Show current page and one before/after
                    if (
                        number === currentPage ||
                        number === currentPage - 1 ||
                        number === currentPage + 1
                    ) {
                        return (
                            <PageNumber
                                key={number}
                                number={number}
                                isActive={number === currentPage}
                                onClick={() => onPageChange(number)}
                            />
                        );
                    }

                    // Show last page
                    if (number === totalPages) {
                        return (
                            <PageNumber
                                key={number}
                                number={number}
                                isActive={number === currentPage}
                                onClick={() => onPageChange(number)}
                            />
                        );
                    }

                    // Show dots if there's a gap
                    if (
                        number === currentPage - 2 ||
                        number === currentPage + 2
                    ) {
                        return <span key={number}>...</span>;
                    }

                    return null;
                })}
            </div>
            <button
                onClick={() =>
                    onPageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/32e251b14d565c4eb407dc8336096dd9c021e5846afae8e292102cae656ec431?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
            </button>
        </nav>
    );
};

export default PaginationComponent;
