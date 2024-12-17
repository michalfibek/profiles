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
import { buttonVariants } from "./ui/button";

type ProfilesTableProps = {
  profiles: Profile[];
};

export default function ProfilesTable({ profiles }: ProfilesTableProps) {
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
            <TableCell className="font-medium">{profile.firstName}</TableCell>
            <TableCell>{profile.lastName}</TableCell>
            {/* <TableCell>{profile.photoUrl}</TableCell> */}
            <TableCell className="text-right flex justify-end gap-2">
              <Link
                href={`/profiles/${profile.id}`}
                className={buttonVariants({ variant: "outline" })}
              >
                Edit
              </Link>
              <Link
                href={`/profiles/${profile.id}`}
                className={buttonVariants({ variant: "outline" })}
              >
                Delete
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
