import PageTitle from "@/components/PageTitle";
import ProfileForm from "@/components/ProfileForm";
import prisma from "@/lib/db";

export default async function ProfilePage({ params }: { params: { id: number } }) {
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
