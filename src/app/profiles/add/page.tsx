import PageTitle from "@/components/PageTitle";
import ProfileForm from "@/components/ProfileForm";

export default async function AddProfilePage() {
  return (
    <div>
      <PageTitle>New Profile</PageTitle>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
}
