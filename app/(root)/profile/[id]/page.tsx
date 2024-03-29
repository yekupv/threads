import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { profileTabs } from "@/constants";
import Image from "next/image";
import { profile } from "console";
import ThreadsTabs from "@/components/shared/ThreadsTabs";

const Page = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(params.id);

	if (!userInfo?.onboarded) redirect("/onboarding");

	return (
		<section>
			<ProfileHeader
				accountId={userInfo.id}
				authUserId={user.id}
				name={userInfo.name}
				username={userInfo.username}
				imgUrl={userInfo.image}
				bio={userInfo.bio}
				type="User"
			/>

			<div className="mt-9">
				<Tabs defaultValue="threads" className="w-full">
					<TabsList className="tab">
						{profileTabs.map((tab) => (
							<TabsTrigger
								key={tab.label}
								value={tab.value}
								className="tab group"
							>
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className="object-contain group-hover:scale-105"
								/>
								<p className="max-sm:hidden group-hover:scale-105">
									{tab.label}
								</p>

								{tab.label === "Threads" && (
									<p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
										{userInfo?.threads?.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>
					{profileTabs.map((tab) => (
						<TabsContent
							key={`content-${tab.value}`}
							value={tab.value}
							className="w-full text-light-1"
						>
							<ThreadsTabs
								currentUserId={user.id}
								accountId={userInfo.id}
								accountType="User"
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
};

export default Page;
