'use client'
import { Navbar } from "./components";
import Image from "next/image";
import wave from "../../public/wave (1).svg";
import { useRouter } from "next/navigation";
import React from "react";
import { useUserContext } from "./context/UserContext";
import { getUserFromApi } from "./api/api";

const Index: React.FC = () => {
    const router = useRouter();
    const { storedUser, setstoredUser } = useUserContext();


    React.useEffect(() => {
        // Cargar el usuario desde localStorage o la API
        const localUser = window.localStorage.getItem("user");
        if (localUser) {
          setstoredUser(JSON.parse(localUser));
        } else {
          getUserFromApi().then((result) => {
              console.log(result)
            if (result) {
                if(result.status !== 200) {
                    setstoredUser(null);
                }
              setstoredUser(result);
              window.localStorage.setItem("user", JSON.stringify(result));
            }
          });
        }
      }, [setstoredUser]);



    return(
        <>
            <header>
                <Navbar storedUser={storedUser}/>
                <div className={"w-full h-[300px] bg-[#f36b3e] shadow-md relative"}>
                    {/* Hero */}
                    <div className={"min-w-full min-h-full flex flex-col justify-center items-center gap-10 pt-20"}>
                        <h1 className={"text-3xl font-bold z-10"}>Make your own notes!</h1>
                        <button 
                        onClick={() => {router.push("http://localhost:3001/api/auth/discord")}}
                        className={"py-2 px-5 bg-white border-cyan-500 border-[3px] rounded-md shadow-md z-20 font-bold hover:bg-cyan-400 hover:text-white hover:border-black"}
                        >Start
                        </button>
                    </div>
                    <Image 
                    src={wave} 
                    alt={"xd"}
                    className={"w-fit top-52 absolute z-10"}
                    />
                </div>
            </header>
            <main className={"min-w-full min-h-ful mt-36"}>
               <div className={"flex flex-row justify-around gap-5"}>
                    <div className={"bg-gray-500 min-w-[100px] max-w-[250px] rounded-sm"}>
                            <header className={"p-2 border-b-2 border-gray-600 shadow-sm"}>
                                <h1 className={"text-center text-2xl"}>Beneficio</h1>
                            </header>
                            <div className={"p-2 font-bold"}> 
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic placeat incidunt dicta reiciendis sit nostrum voluptatibus enim deleniti facilis iure.</p>
                            </div>
                    </div>
                     <div className={"bg-gray-500 min-w-[100px] max-w-[250px] rounded-sm z-30"}>
                            <header className={"p-2 border-b-2 border-gray-600 shadow-sm"}>
                                <h1 className={"text-center text-2xl"}>Beneficio</h1>
                            </header>
                            <div className={"p-2 font-bold"}> 
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic placeat incidunt dicta reiciendis sit nostrum voluptatibus enim deleniti facilis iure.</p>
                            </div>
                    </div>
                    <div className={"bg-gray-500 min-w-[100px] max-w-[250px] rounded-sm"}>
                        <header className={"p-2 border-b-2 border-gray-600 shadow-sm"}>
                            <h1 className={"text-center text-2xl"}>Beneficio</h1>
                        </header>
                        <div className={"p-2 font-bold"}> 
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic placeat incidunt dicta reiciendis sit nostrum voluptatibus enim deleniti facilis iure.</p>
                        </div>
                    </div>
               </div>
            </main>
        </>
    )
}


export default Index;