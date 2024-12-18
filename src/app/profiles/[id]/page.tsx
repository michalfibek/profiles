import PageTitle from "@/components/PageTitle";
import ProfileForm from "@/components/ProfileForm";
import prisma from "@/lib/db";

type Params = Promise<{ id: number }>;

export default async function ProfilePage({ params }: { params: Params }) {
  const { id } = await params;
  const profile = await prisma.profile.findUnique({
    where: {
      id: Number(id),
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
      <div>
        <ProfileForm profileData={profile} />
      </div>
    </div>
  );
}
