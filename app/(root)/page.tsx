//app/page.tsx

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const result = await fetchPosts({
		pageNumber: searchParams?.page ? +searchParams.page : 1,
		pageSize: 2,
	});
	const user = await currentUser();
	if (!user) redirect("/sign-in");
	return (
		<div>
			<h1 className="head-text text-left">Home</h1>
			<section className="mt-9 flex flex-col gap-10">
				{result.posts.length === 0 ? (
					<p className="no-result"> No thread found </p>
				) : (
					<>
						{result.posts.map((post) => (
							<ThreadCard
								key={post._id}
								id={post._id}
								currentUserId={user?.id || ""}
								parentId={post.parentId}
								content={post.text}
								author={post.author}
								community={post.community}
								createdAt={post.createdAt}
								comments={post.children}
							/>
						))}
					</>
				)}

				<Pagination
					path=""
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					totalPages={+result.totalPages}
					isNext={result.isNext}
					searchParams={searchParams.q}
				/>
			</section>
		</div>
	);
}
