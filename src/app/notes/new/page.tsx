'use client';

import { createNote } from "@/app/api/api";
import { Navbar } from "@/app/components";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const newNote: React.FC = () => {
    const { storedUser } = useUserContext();
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id === "title") {
            setTitle(e.target.value);
        } else if (e.target.id === "description") {
            setDescription(e.target.value);
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await createNote(`${storedUser?.uid}`, title, description);
        router.push("/menu");
    }

    return (
        <>
            <Navbar storedUser={storedUser} isCreatingNote={true} />
            <div className={"z-20 min-w-full mt-[5%] flex justify-center"}>
                <div className={"bg-blue-600 w-fit h-fit p-2 rounded-md"}>
                    <header>
                        <h1 className={"text-center text-lg font-bold text-white"}>Creating new note...</h1>
                    </header>
                    <form className={"flex flex-col gap-5 pt-3"} onSubmit={(e) => handleSubmit(e)}>
                        <input
                            onChange={(e) => handleChange(e)}
                            id={"title"}
                            type={"text"}
                            placeholder={"Title"}
                            className={"rounded-sm py-2 shadow-md outline-none focus:border-green-500 focus:border-2"}
                            value={title}
                        />
                        <input
                            onChange={(e) => handleChange(e)}
                            id={"description"}
                            type={"text"}
                            placeholder={"BLABLA description"}
                            className={"rounded-sm py-2 shadow-md outline-none focus:border-green-500 focus:border-2"}
                            value={description}
                        />
                        <input
                            type={"submit"}
                            value={"Create"}
                            className={"p-2 bg-green-600 text-white shadow-md rounded-sm cursor-pointer"}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default newNote;
