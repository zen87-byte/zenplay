import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Layout from "@components/Layout/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  password: z.string().min(4, {
    message: "password must be at least 4 character",
  }),
});

export default function LoginForm({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (value: z.infer<typeof formSchema>) => {
    signIn("credentials", {
      username: value.username,
      password: value.password,
      callbackUrl: "/",
    });
  };

  const handleCancle = () =>{
    form.resetField("username")
    form.resetField("password")

  }
  return (
    <Layout>
      <div className=" my-4 mx-16 p-8">
        <div className="relative w-1/3 space-y-4 m-auto">
          <div className="w-full mx-auto">
            <h1 className="w-fit mx-auto font-bold text-2xl">Login</h1>
          </div>
          <div className="relative border border-gray p-4 rounded-md">
            <div className="flex flex-col">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  method="post"
                  action="/api/auth/callback/credentials"
                  id="loginForm"
                  className="w-full space-y-4"
                >
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
                <div className="w-full mt-8">
                  <div className="space-x-2 float-right">
                    <Button form="loginForm" onClick={handleCancle} variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit" form="loginForm">
                      Login
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div></div>
          <div className=" w-full">
            <div className="w-fit mx-auto">
              <p>
                Don't have any account yet? Register
                <span className="text-indigo-900">
                  <Link href="#" className="text-indigo-900">
                    {" "}
                    here
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
