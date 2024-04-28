"use client"
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea";
import FileUploader from "@/components/ui/file-uploader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import e from "express";
 
const formSchema = z.object({
  caption: z.string().min(5).max(150),
  tag: z.string().min(3).max(50),
  file: z.string(),
})

type PostFormProps = {
    post?: {
      _id: string;
        caption: string;
        tag: string;
        imageUrl: string;
    }
    action:'Create' | 'Update';
}

export default function PostForm({post,action}: PostFormProps) {
  const values = post;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
          caption:"",
          tag:"",
          file:""
        },
        values: values as { caption: string; tag: string; file: string; } | undefined,
      })
      console.log(values);
      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          if(action === 'Create'){
            const form = new FormData();
            form.append("caption", values.caption);
            form.append("tag", values.tag);
            form.append("file", values.file as any);
            
  
  
            await toast.promise(axios.post("/api/Post", form), {
              loading: "Posting...",
              success: "Posted successfully!",
              error: "Failed to create post,Try Again"});
              form.set('caption', '');
              form.set('tag', '');
              form.set('file', '');

            }
            else{
              const form = new FormData();
              form.append("caption", values.caption);
              form.append("tag", values.tag);
              form.append("file", values.file as any);
              form.append("id", post?._id as string);
              await toast.promise(axios.put("/api/Post/update", form), {
                loading: "Updating...",
                success: "Updated successfully!",
                error: "Failed to update post,Try Again"});
                form.set('caption', '');
                form.set('tag', '');
                form.set('file', '');
            }}
        catch (error) {
          console.error(error);
        }
      }
    return(
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center gap-9 w-full lg:max-w-5xl pb-10">
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Photo</FormLabel>
            <FormControl>
              <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl || ""} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="caption"
        render={({ field}) => (
          <FormItem>
            <FormLabel className="shad-tag_label">Caption</FormLabel>
            <FormControl className="w-[60vw]">
              <Textarea className="shad-textarea custom-scrollbar"  {...field} value={field.value || ''}
          onChange={(e) => field.onChange(e.target.value)} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
        />
        <FormField
          control={form.control}
          name="tag"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add Tags</FormLabel>
            <FormControl className="w-[60vw]">
              <Input type="text" className="shad-input" placeholder="Arts,material,unique" {...field}/>
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
        />
        <div className="flex gap-4 items-center justify-end">
            <Button type="submit" className="shad-button_primary whitespace-nowrap w-[80px] h-[2.9rem] ">Post</Button>
            <Button type="reset" className="shad-button_dark_4">Cancel</Button>
        </div>
      </form>
      <Toaster position="top-center"
                        reverseOrder={true} />  
    </Form>
    )
    }