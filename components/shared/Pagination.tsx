"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ReactEventHandler } from "react";

interface Props {
	pageNumber: number;
	isNext: boolean;
	path: string;
	totalPages: number;
	searchParams?: string | undefined;
}

function Pagination({
	pageNumber,
	isNext,
	path,
	totalPages,
	searchParams,
}: Props) {
	const router = useRouter();
	const pagesToShow = 2; // Number of pages to show at a time

	const handleNavigation = (type?: string, selectedPage?: number) => {
		let nextPageNumber = pageNumber;

		if (type === "prev") {
			nextPageNumber = Math.max(1, pageNumber - 1);
		} else if (type === "next") {
			nextPageNumber = Math.min(totalPages, pageNumber + 1);
		} else if (type === "page" && selectedPage) {
			nextPageNumber = selectedPage;
		}

		if (nextPageNumber > 1) {
			router.push(
				`/${path}?page=${nextPageNumber}${
					searchParams ? `&q=${searchParams}` : ""
				}`
			);
		} else {
			router.push(`/${path}${searchParams ? `?q=${searchParams}` : ""}`);
		}
	};

	if (!isNext && pageNumber === 1) return null;

	// Calculate the range of visible pages based on the current page
	const halfPagesToShow = Math.floor(pagesToShow / 2);
	let startPage = Math.max(1, pageNumber - halfPagesToShow);
	let endPage = Math.min(totalPages, pageNumber + halfPagesToShow);

	// Add ellipses if necessary
	const showEllipsesStart = startPage > 1;
	const showEllipsesEnd = endPage < totalPages;

	return (
		<div className="pagination">
			<Button
				onClick={() => handleNavigation("prev")}
				disabled={pageNumber === 1}
				className="!text-small-regular text-light-2"
			>
				Prev
			</Button>

			{showEllipsesStart && (
				<p className="text-small-semibold px-3 py-2 text-light-1">...</p>
			)}

			{Array.from({ length: endPage - startPage + 1 }, (_, index) => {
				const page = startPage + index;
				return (
					<p
						key={page}
						className={`text-small-semibold cursor-pointer px-3 py-2 hover:bg-primary-500 rounded-md text-light-1  ${
							page === pageNumber ? " bg-primary-500" : ""
						}`}
						onClick={(e) => handleNavigation("page", page)}
					>
						{page}
					</p>
				);
			})}

			{showEllipsesEnd && (
				<p className="text-small-semibold px-3 py-2 text-light-1">...</p>
			)}

			<Button
				onClick={() => handleNavigation("next")}
				disabled={!isNext}
				className="!text-small-regular text-light-2"
			>
				Next
			</Button>
		</div>
	);
}

export default Pagination;
