"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { User } from "@prisma/client";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/actions/userActions";

type UsersTableProps = {
  users: User[];
};

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Do you want to delete this user?");
    if (!confirmed) return;

    await deleteUser(id);
    router.refresh();
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>E-mail</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell>{user.createdAt.toDateString()}</TableCell>
            <TableCell className="text-right flex justify-end gap-2">
              <Button
                onClick={() => handleDelete(user.id)}
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
