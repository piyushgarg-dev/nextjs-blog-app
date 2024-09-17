"use client";

import EditorJS from "@editorjs/editorjs";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBlog } from "../actions";

const formSchema = z.object({
  title: z.string().min(3).max(50),
});

type FormSchemaValues = z.infer<typeof formSchema>;

const CreateBlogForm = () => {
  const router = useRouter();

  const form = useForm<FormSchemaValues>({
    resolver: zodResolver(formSchema),
  });

  const editorRef: React.MutableRefObject<EditorJS | null> =
    React.useRef<EditorJS>(null);

  React.useEffect(() => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: "editorjs",
    });

    editorRef.current = editor;
  }, []);

  async function onSubmit(values: FormSchemaValues) {
    const { title } = values;
    const outputFromEditor = await editorRef?.current?.save();

    await createBlog({
      blocks: JSON.stringify(outputFromEditor?.blocks),
      title,
    });

    router.push("/admin");
  }

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Type here..." {...field} />
                </FormControl>
                <FormDescription>This is your title for blog</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-muted rounded-lg p-2">
            <div id="editorjs" />
          </div>

          <Button>Save</Button>
        </form>
      </Form>
    </main>
  );
};

export default CreateBlogForm;
