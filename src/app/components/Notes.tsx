import React from 'react';
import { deleteNote, editNote } from "../api/api";
import { useRouter } from "next/navigation";

type Note = {
  nid: string,
  title: string,
  description: string,
  date: string
}

interface Props {
  notes: Array<Note>
  setNotes: React.Dispatch<React.SetStateAction<Array<Note>>>
}

const Notes: React.FC<Props> = ({ notes, setNotes }) => {
  const router = useRouter();
  const [isEditing, setisEditing] = React.useState<Boolean>(false); 
  const [editingNID, seteditingNID] = React.useState<string | null>(null);
  const [newTitle, setnewTitle] = React.useState<string | null>(null);
  const [newDescription, setnewDescription] = React.useState<string | null>(null);


  async function handleChange(newTitle?: string | null, newDescription?: string | null) {
    if(newTitle && newDescription) {
        // Change title and description
        setnewTitle(newTitle)
        setnewDescription(newDescription)
    }else if(newTitle && !newDescription) {
        //Change title
        setnewTitle(newTitle)
    }else if(!newTitle && newDescription) {
        //Change description
        setnewDescription(newDescription)
    }
  }


  async function handleSave(nid: string) {
    try {
      // Editar la nota
      await editNote(nid, newTitle, newDescription);
  
      // Actualizar el estado local con la nota editada
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.nid === nid
            ? { ...note, title: newTitle || note.title, description: newDescription || note.description }
            : note
        )
      );
  
      // Salir del modo de edición
      setisEditing(false);
      seteditingNID(null);
    } catch (err) {
      console.error("Hubo un error al guardar la nota", err);
    }
  }
  async function handleEdit(nid?: string) {
    setisEditing(!isEditing);
    seteditingNID(`${nid}`);
  }

  async function handleDelete(nid: string) {
    try {
      // Eliminar la nota
      await deleteNote(nid);

      // Actualizar el estado eliminando la nota
      setNotes(prevNotes => prevNotes.filter((note: Note) => note.nid !== nid));

      // Recargar la página o navegar a la misma ruta
      router.refresh()
    } catch (err) {
      console.error("Hubo un error al eliminar la nota", err);
    }
  }

  if (notes.length > 0) {
    return (
      <>
        {notes.map((note: Note) => (
          <div className={"bg-gray-500 min-w-[250px] max-w-[300px] rounded-sm shadow-sm"} key={note.nid}>
            {/* Header */}
            <section className={"border-b-[0.6px] border-gray-300"}>
              <div className={"flex flex-row justify-between p-2"}>
                <div className={"pr-5"}>
                  {isEditing && note.nid == editingNID ?
                    <>
                        <form>
                            <input
                            onChange={(e) => {handleChange(e.target.value, null)}} 
                            type={"text"} 
                            placeholder={`${note.title}`} 
                            className={"max-w-[100px] outline-none rounded-sm border-blue-500  focus:border-2"}/>
                        </form>
                    </>
                    :
                    <h1>{note.title}</h1>
                  }
                </div>
                {/* Buttons */}
                <div className={"flex flex-row gap-2"}>
                  {isEditing && note.nid == editingNID ?
                    <button 
                    onClick={() => {handleSave(note.nid)}}
                    className={"bg-green-600 px-2 rounded-sm"}>Save
                    </button>
                    :
                    <button 
                    onClick={() => {handleEdit(note.nid)}}
                    className={"bg-blue-300 px-2 rounded-sm"}>Edit
                    </button>
                  }
                  {
                    isEditing && note.nid == editingNID ?
                    <button
                    onClick={() => {handleEdit()}}
                    className={"bg-red-600 px-2 rounded-sm"}
                    >
                    Cancel
                  </button>
                  :
                  <button
                    onClick={() => { handleDelete(note.nid) }}
                    className={"bg-red-600 px-2 rounded-sm"}
                  >
                    Delete
                  </button>
                  }
                </div>
              </div>
            </section>
            {/* Body */}
            <section className={"p-2"}>
              {/* Description */}
              {isEditing && note.nid === editingNID ? (
                <form>
                    <textarea
                    onChange={(e) => {handleChange(null, e.target.value)}}
                    placeholder={note.description}
                    maxLength={150}
                    rows={3}
                    className={"resize-none focus:outline-none focus:border-blue-500 border-b-2 border-blue-500"}
                    />
                </form>
                ) : (
                <p>{note.description}</p>
                )}
            </section>
            {/* Footer */}
          </div>
        ))}
      </>
    );
  }

  return (
    <h1>No hay notas por mostrar!</h1>
  );
}

export default Notes;
