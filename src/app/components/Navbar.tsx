'use client';
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logoutUser } from "../api/api";
import { useUserContext } from "../context/UserContext";

interface Props {
  storedUser?: {
    uid: string | null;
    username: string | null;
    global_name: string | null;
    avatar: string | null;
  } | null; // Permitir que storedUser sea null

  isCreatingNote?: Boolean
}

const Navbar: React.FC<Props> = ({storedUser, isCreatingNote}) => {

  
  return (
    <div className={"w-full min-h-[70px] bg-[#3c4046]"}>
      <nav>
        <div className={"flex flex-row justify-between items-center p-5"}>
          {/* Logo */}
          <div>
            <h2 className={"font-bold text-white"}>NotesAPP</h2>
          </div>
          {/* User Profile or Login Button */}
          {renderLoginOrProfile({storedUser,  isCreatingNote})}
        </div>
      </nav>
    </div>
  );
};



const renderLoginOrProfile:React.FC<Props> = (props: Props) => {
  const navigation = useRouter();
  const loginURL: string = "http://localhost:3001/api/auth/discord";
  var imageURL: string = props.storedUser?.avatar ? `https://cdn.discordapp.com/avatars/${props.storedUser.uid}/${props.storedUser.avatar}.png` : "";
  const [isMenuEnabled, setisMenuEnabled] = React.useState<Boolean>(false);
 const {storedUser, setstoredUser} = useUserContext();

  function handleLogout() {
    logoutUser();
    if(window.localStorage.getItem("user")) {
      window.localStorage.removeItem("user");
    }
    setstoredUser(null)
    navigation.push("/");
  }


    if(props.storedUser) {
        return(
            <div className={"flex flex-row gap-5 items-center"}>
              {props.isCreatingNote === true ? 
                <>
                  <button 
                  onClick={() => {navigation.push("/menu")}}
                  className={"p-1 bg-red-600 rounded-sm shadow-sm font-semibold text-white"}
                  >Cancel
                  </button>
                </>
                :
                <button 
                onClick={() => {navigation.push("/notes/new")}}
                className={"p-1 bg-blue-600 rounded-sm shadow-sm font-semibold text-white"}
                >Create Note
                </button>
              }
              <div className={"flex flex-col items-center"}>
                <Image
                 src={imageURL}
                 width={64}
                 height={64}
                 alt={"profile picture"}
                 className={"rounded-full shadow-md"}
                 onClick={() => {setisMenuEnabled(!isMenuEnabled)}}
                />
                <h2 className={"font-bold text-white"}>{props.storedUser.global_name}</h2>
                <div className={`w-fit p-2 rounded-sm bg-white mt-3 ${isMenuEnabled ? "visible" : "hidden"} absolute top-24`}>
                  <button className={"bg-red-600 w-full px-2 rounded-sm"} onClick={() => {handleLogout()}}>Logout</button>
                </div>
              </div>
            </div>
        )
    }
    
    return(
        <>
            <button 
            onClick={() => {navigation.replace(`${loginURL}`)}}
            className={"p-2 bg-blue-500 shadow-md rounded-sm font-bold text-white"}
            >Login
            </button>
        </>
    )
}

export default Navbar;
