import { Metadata } from "next";
import prisma from "@/lib/db";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { buttonVariants } from "@/components/ui/button";
import ProfilesTable from "@/components/tables/ProfilesTable";

export const metadata: Metadata = {
  title: "All profiles",
};

export default async function ProfilesPage() {
  const profiles = await prisma.profile.findMany();

  return (
    <div>
      <PageTitle>All profiles</PageTitle>

      <div className="my-4">
        <Link href="/profiles/add" className={buttonVariants({ variant: "default" })}>
          Add New Profile
        </Link>
      </div>

      <ProfilesTable profiles={profiles} />
    </div>
  );
}
