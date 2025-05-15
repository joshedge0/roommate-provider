import { auth, signOut } from "@/lib/auth";
import { notFound } from "next/navigation";

const HomePage = async () => {
 const session = await auth();
 if (!session) return (<p>please login <a href='/login'>here</a></p>)
 return (
   <main>
     <h1>Hello {session.user.name}</h1>

     <form
       action={async () => {
         "use server";
         await signOut();
       }}
     >
       <button type="submit">Log Out</button>
     </form>
   </main>
 );
};
export default HomePage;