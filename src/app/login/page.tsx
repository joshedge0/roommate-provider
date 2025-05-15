import { signIn } from "@/lib/auth";

const LoginPage = () => {
 return (
   <form
     action={async () => {
       "use server";
       await signIn("google");
     }}
   >
     <button type="submit">Login with Google</button>
   </form>
   );
};

export default LoginPage;