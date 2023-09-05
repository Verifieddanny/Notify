import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteifyComponent from "./NotePadComponent/NoteifyComponent";
import supabase from "../config/Client";
function NotePad({ token }) {
  const [note, setNote] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setNote((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("noteify")
        .select()
        .order(orderBy, { ascending: true });

      if (error) {
        toast.error("Something went wrong, Please try again", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setNote(null);
      }

      if (data) {
        setNote(data);
      }
    };
    fetchNote();
  }, [orderBy]);
  return (
    <>
      <nav>
        <h1>
          Notify <i className="material-icons">book</i>
        </h1>
        <Link to="/notepad">Home</Link>
        <Link to="/create">Create Note</Link>
      </nav>
      <div className="notepad">
        <h3> welcome Back {token.user.user_metadata.full_name}</h3>

        {note && (
          <div className="smoothies">
            <div className="order-by">
              <p>Order by:</p>
              <button onClick={() => setOrderBy("created_at")}>
                Time Created
              </button>
              <button onClick={() => setOrderBy("title")}>Title</button>
            </div>
            <div className="smoothie-grid">
              {note.map((notes) => (
                <NoteifyComponent
                  key={notes.id}
                  note={notes}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NotePad;
