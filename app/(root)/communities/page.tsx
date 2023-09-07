import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";
import Searchbar from "@/components/shared/Searchbar";
import { fetchCommunities } from "@/lib/actions/community.actions";
import {
	fetchUser,
	fetchUserPosts,
	fetchUsers,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect("/onboarding");

	// Fetch communities
	const result = await fetchCommunities({
		searchString: searchParams.q,
		pageNumber: searchParams?.page ? +searchParams.page : 1,
		pageSize: 1,
	});

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			{/* SEARCH BAR */}
			<Searchbar />
			<div className="mt-14 flex flex-col gap-9">
				{result.communities.length === 0 ? (
					<p className="no-result">No communities</p>
				) : (
					<>
						{result.communities.map((community) => (
							<CommunityCard
								key={community.id}
								id={community.id}
								name={community.name}
								username={community.username}
								imgUrl={community.image}
								bio={community.bio}
								members={community.members}
							/>
						))}
					</>
				)}
			</div>
			<Pagination
				path="communities"
				pageNumber={searchParams?.page ? +searchParams.page : 1}
				totalPages={+result.totalPages}
				isNext={result.isNext}
				searchParams={searchParams.q}
			/>
		</section>
	);
};

export default Page;
