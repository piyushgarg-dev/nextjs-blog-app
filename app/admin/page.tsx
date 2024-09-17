import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email)
    return redirect("/signin");

  const blogs = await prisma.blogs.findMany({
    where: {
      email: session.user.email,
    },
  });

  return (
    <main>
      <div className="mt-10 ">
        <div className="flex justify-between items-center">
          <h3>Your Blogs ({blogs.length})</h3>
          <Link
            className="bg-primary text-secondary px-4 py-2 rounded-md font-bold"
            href="/admin/blog/new"
          >
            Create Blog
          </Link>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          {blogs.map((blog) => (
            <Link key={blog.id} href="/">
              <div className="bg-muted p-6 rounded-lg">
                <h4>{blog.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
