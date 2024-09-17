"use server";

import { prisma } from "@/db";
import { getServerSession } from "next-auth";

export async function createBlog({
  blocks,
  title,
}: {
  title: string;
  blocks: string;
}) {
  const session = await getServerSession();
  if (!session?.user) throw new Error("You need to be logged in");

  if (!session.user.email) throw new Error("Valid Email is required");

  const blog = await prisma.blogs.create({
    data: {
      blocks,
      email: session.user.email,
      name: session.user.name ?? "",
      title,
      imageURL: session.user.image,
    },
    select: {
      id: true,
    },
  });

  return { created: true, id: blog.id };
}
