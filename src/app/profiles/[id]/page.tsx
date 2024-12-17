import PageTitle from "@/components/PageTitle";
import prisma from "@/lib/db";

export default async function ProfilePage({ params }: { params: { id: number } }) {
  const profile = await prisma.profile.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <PageTitle>
        Profile: {profile.firstName} {profile.lastName}
      </PageTitle>
      <div>{profile.description}</div>
    </div>
  );
}
