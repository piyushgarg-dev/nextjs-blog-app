import { prisma } from "@/db";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";

export default async function Home() {
  const blogs = await prisma.blogs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <div className="bg-muted p-6 rounded-lg">
              <h4>{blog.title}</h4>
              <p className="text-muted-foreground text-sm mt-2">
                {moment(blog.createdAt).format("ll")}
              </p>
              <div className="mt-10 flex gap-2 text-xs text-muted-foreground items-start justify-start">
                <div>
                  {blog.imageURL && (
                    <Image
                      className="rounded-full mt-1"
                      src={blog.imageURL}
                      height={20}
                      width={20}
                      alt="User Image"
                    />
                  )}
                </div>
                <div>
                  <p>{blog.name}</p>
                  <p>{blog.email}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
