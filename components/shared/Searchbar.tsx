"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
interface Props {
	routeType?: string;
}
const Searchbar = ({ routeType }: Props) => {
	const [search, setSearch] = useState("");
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (search) router.push(`${pathname}/?q=` + search);
			else router.push(`${pathname}`);
		}, 3);

		return () => clearTimeout(debounce);
	}, [search, routeType]);

	return (
		<div className="searchbar">
			<Image
				src="/assets/search-gray.svg"
				alt="search image"
				width={24}
				height={24}
				className="object-contain"
			/>
			<Input
				id="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={`${
					routeType !== "/search" ? "Search communities" : "Search creators"
				}`}
				className="no-focus searchbar_input"
			/>
		</div>
	);
};

export default Searchbar;
