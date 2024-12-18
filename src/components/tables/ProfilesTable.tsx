"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Profile } from "@prisma/client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteProfile } from "@/actions/profileActions";

type ProfilesTableProps = {
  profiles: Profile[];
};

export default function ProfilesTable({ profiles }: ProfilesTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Do you want to delete this profile?");
    if (!confirmed) return;

    await deleteProfile(id);
    router.refresh();
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          {/* <TableHead>Photo</TableHead> */}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell className="font-medium">
              <Link href={`/profiles/${profile.id}`}>{profile.firstName}</Link>
            </TableCell>
            <TableCell>
              <Link href={`/profiles/${profile.id}`}>{profile.lastName}</Link>
            </TableCell>
            {/* <TableCell>{profile.photoUrl}</TableCell> */}
            <TableCell className="text-right flex justify-end gap-2">
              <Link
                href={`/profiles/${profile.id}`}
                className={buttonVariants({ variant: "outline" })}
              >
                Edit
              </Link>
              <Button
                onClick={() => handleDelete(profile.id)}
                className={buttonVariants({ variant: "destructive" })}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
