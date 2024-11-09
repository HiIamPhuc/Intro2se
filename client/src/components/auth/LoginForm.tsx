import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(5, { message: "Password is required" }),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      form.reset(data);
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // handle cookies
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Save user info to localStorage
        localStorage.setItem("userInfo", JSON.stringify(responseData.user));

        // Handle navigation based on role
        const timeout = 1500;
        const userRole = responseData.user.role;
        const targetPath =
          userRole === "USER"
            ? "/"
            : userRole === "ADMIN" || userRole === "CONTENT_EDITOR"
            ? "/dashboard"
            : "/";
        const message =
          userRole === "USER"
            ? "home page"
            : userRole === "ADMIN" || userRole === "CONTENT_EDITOR"
            ? "dashboard page"
            : "home page";

        toast.success("Login successful!", {
          description: `Redirecting to ${message}...`,
        });

        setTimeout(() => {
          form.reset();
          navigate(targetPath);
        }, timeout);
      } else {
        toast.error("Login failed", {
          description: "Please check your credentials",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter email"
                      {...form.register("email")}
                    />
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
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter password"
                      {...form.register("password")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  (window.location.href =
                    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:8080/api/v1/auth/googlegrantcode&response_type=code&client_id=316346812823-emelg3dhg9a9tiis7b5bfjnk8clv8mc9.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline")
                }
              >
                Continue with Google
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Continue with Microsoft
              </Button>
            </div>
            <Button className="w-full">Sign in</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;