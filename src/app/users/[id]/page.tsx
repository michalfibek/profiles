import PageTitle from "@/components/PageTitle";
import UserForm from "@/components/UserForm";
import prisma from "@/lib/db";

type Params = Promise<{ id: number }>;

export default async function UserPage({ params }: { params: Params }) {
  const { id } = await params;
  const userData = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!userData) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <PageTitle>User: {userData.email}</PageTitle>
      <div>
        <UserForm userData={userData} />
      </div>
    </div>
  );
}
