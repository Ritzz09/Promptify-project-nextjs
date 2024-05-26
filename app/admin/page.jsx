'use client';
import Admin from '@components/Admin'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {

    const router = useRouter();
    const {data : session} = useSession();
    console.log(session?.user.id);
    const sessionId = session?.user.id;

    const routeToHome = (e) => {
        console.log("Sush");
        // console.log(session?.user.email);
        router.push(`/sknkds`);
    }


    if(sessionId == "64d85812fe3975e0cb402925"){
        console.log("Yeahhh you are virat my boii!");
        routeToHome();
    }else{
        console.log("Jaldi Wahase Hato 📢");
    }

    
    


  return (
    <>
        {/* { session?.user.id === "64d85812fe3975e0cb402925" ? routeToHome() : <Admin/>} */}
        <Admin/>
    </>
  )
}

export default page