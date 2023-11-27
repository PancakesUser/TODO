'use client';
import React, { useEffect } from "react";
import { Navbar, Notes } from "../components";
import { getUserFromApi, getUserNotes } from "../api/api";
import { useUserContext } from "../context/UserContext";

export default function Home() {
  const [notes, setNotes] = React.useState<Array<any>>([]);
  const { storedUser, setstoredUser } = useUserContext();

  useEffect(() => {
    // Cargar el usuario desde localStorage o la API
    const localUser = window.localStorage.getItem("user");
    if (localUser) {
      setstoredUser(JSON.parse(localUser));
    } else {
      getUserFromApi().then((result) => {
        if (result) {
          setstoredUser(result);
          window.localStorage.setItem("user", JSON.stringify(result));
        }
      });
    }
  }, [setstoredUser]);

  useEffect(() => {
    // Cargar las notas del usuario
    if (storedUser) {
      getUserNotes(`${storedUser.uid}`).then((results) => {
        setNotes(results);
      });
    }
  }, [storedUser]);

  return (
    <main>
      <Navbar storedUser={storedUser} />
      <div className={"flex flex-row flex-wrap gap-2 m-5"}>
        <Notes notes={notes} setNotes={setNotes} />
      </div>
    </main>
  );
}
