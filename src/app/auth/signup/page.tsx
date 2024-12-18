import PageTitle from "@/components/PageTitle";
import UserForm from "@/components/UserForm";

export default async function AddProfilePage() {
  return (
    <div>
      <PageTitle>Sign Up</PageTitle>
      <div>
        <UserForm />
      </div>
    </div>
  );
}
