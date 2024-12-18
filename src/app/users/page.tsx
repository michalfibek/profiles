import { Metadata } from "next";
import prisma from "@/lib/db";
import PageTitle from "@/components/PageTitle";
import UsersTable from "@/components/tables/UsersTable";

export const metadata: Metadata = {
  title: "All profiles",
};

export const dynamic = "force-dynamic";

export default async function ProfilesPage() {
  // const router = useRouter();
  const users = await prisma.user.findMany();

  // async function handleChange() {
  //   router.refresh();
  // }

  return (
    <div>
      <PageTitle>All users</PageTitle>

      {/* <div className="my-4">
        <Link href="/users/register" className={buttonVariants({ variant: "default" })}>
          Add New User
        </Link>
      </div> */}

      <UsersTable users={users} />
    </div>
  );
}
