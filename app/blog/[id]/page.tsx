import { prisma } from "@/db";
import { notFound } from "next/navigation";
import BlogView from "./_components/blog-view";
import Image from "next/image";
import moment from "moment";

interface Props {
  params: {
    id: string;
  };
}

export default async function BlogPage({ params }: Props) {
  const blog = await prisma.blogs.findFirst({
    where: { id: params.id },
  });

  if (!blog) return notFound();

  return (
    <main>
      <h3 className="text-5xl mt-10">{blog.title}</h3>
      <p className="text-muted-foreground text-xs mt-2">
        {moment(blog.createdAt).format("ll")}
      </p>
      <div className="mt-4 flex gap-2 text-xs text-muted-foreground items-start justify-start">
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

      <div className="mt-10">
        <BlogView blog={blog} />
      </div>
    </main>
  );
}
