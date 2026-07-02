"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner"
import { signIn } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/firebase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signup } from "@/lib/actions/auth.action";



const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type formType = "sign-in" | "sign-up";

type AuthFormValues = {
  name?: string
  email: string
  password: string
}

const AuthForm = ({type}: {type: formType}) => {
  const schema = type === "sign-up" ? signUpSchema : signInSchema
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: type === "sign-up" ? { name: "", email: "", password: "" } : { email: "", password: "" },
  })
  async function onSubmit(data: AuthFormValues) {

    try{
    if(type==='sign-up'){
      const {name,email,password}=data;
      const userCredentials=await createUserWithEmailAndPassword(auth,email,password)
      const result=await  signup({
        uid:userCredentials.user.uid,
        name:name!,
        email,
        password,
      })
      if(!result?.success){
        toast.error(result?.message);
        return;
      }
      toast.success(result?.message);


    }
    else{
      const {email,password}=data;
      const userCredentials=await signInWithEmailAndPassword(auth,email,password);
      const idToken = await userCredentials.user.getIdToken();
      if(!idToken){
        toast.error("Failed to get ID token. Please try again.");
        return;
      }
      await signIn({
        email,
        idToken,})
      toast.success("You signed in successfully!");
    }

  
  }catch(e:any){
      console.error("There was an error while submitting the form: ",e)
      toast.error(e.message || "An error occurred. Please try again.");
    }
  }

  return (
    <Card className="w-full max-w-md border border-white/15 bg-transparent text-white backdrop-blur-sm
     shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] bg-white/5">
      <CardHeader className="space-y-4 pb-4 pt-8">
        <div className="inline-flex w-fit items-center rounded-full border border-primary-200/30 bg-primary-200/10 px-3 py-1 text-xs font-medium tracking-[0.22em] text-primary-100 uppercase">
          HireFlow
        </div>
        <div className="space-y-2">
          <CardTitle className="text-balance text-3xl font-semibold tracking-tight text-white">
            {type === "sign-in" ? "Welcome back" : "Create your account"}
          </CardTitle>
          <CardDescription className="max-w-sm text-sm leading-6 text-slate-300">
            {type === "sign-in"
              ? "Sign in to continue managing your hiring pipeline."
              : "Start organizing applicants and interviews in one place."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-1">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            {type === "sign-up" && (
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <FieldLabel className="text-slate-200" htmlFor="form-name">Full Name</FieldLabel>
                    <Input {...field} className="h-12 rounded-2xl border-white/15 bg-white/10 px-4 text-white shadow-sm transition-colors placeholder:text-slate-400 focus-visible:border-white/30 focus-visible:ring-white/20" id="form-name" aria-invalid={fieldState.invalid} autoComplete="name" placeholder="Your name" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            )}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                  <FieldLabel className="text-slate-200" htmlFor="form-email">Email address</FieldLabel>
                  <Input {...field} className="h-12 rounded-2xl border-white/15 bg-white/10 px-4 text-white shadow-sm transition-colors placeholder:text-slate-400 focus-visible:border-white/30 focus-visible:ring-white/20" id="form-email" aria-invalid={fieldState.invalid} autoComplete="email" placeholder="name@company.com" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                  <FieldLabel className="text-slate-200" htmlFor="form-password">Password</FieldLabel>
                  <Input {...field} className="h-12 rounded-2xl border-white/15 bg-white/10 px-4 text-white shadow-sm transition-colors placeholder:text-slate-400 focus-visible:border-white/30 focus-visible:ring-white/20" id="form-password" type="password" aria-invalid={fieldState.invalid} autoComplete={type === 'sign-in' ? 'current-password' : 'new-password'} placeholder="••••••••" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="pt-6">
        <Field orientation="horizontal" className="w-full gap-3">
          
          <Button type="submit" form="form-rhf-demo" className=" w-full p-4 rounded-2xl text-lg bg-primary-200 font-medium text-dark-100 shadow-sm transition hover:bg-primary-200/90 sm:w-auto">
            {type === "sign-in" ? "Sign in" : "Create account"}
          </Button>
          <p>
            {type==="sign-in" ? 
          (<>
          Don't have an account <Link href="/sign-up" className="text-primary-200 text-md hover:underline">
            Create one
          </Link> </>):(<>Already have an account? <Link href="/sign-in" className="text-primary-200 text-md hover:underline ">
            Sign in
          </Link>
          </>
          )}
          </p>
                  </Field>
      </CardFooter>
    </Card>
    
  );
};

export default AuthForm;