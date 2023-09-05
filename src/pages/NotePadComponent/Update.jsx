import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../config/Client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault;
    e.preventDefault();
    if (!title || !note) {
      toast.warn("Please fill in all the fields correctly", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const { data, error } = await supabase
      .from("noteify")
      .update([{ title, note }])
      .eq("id", id)
      .select();

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
    }

    if (data) {
      console.log(data);
      navigate("/notepad");
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("noteify")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/notepad", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setNote(data.note);
      }
    };
    fetchNote();
  }, [id, navigate]);
  return (
    <>
      <nav>
        <h1>
          Create a note <i className="material-icons">task</i>
        </h1>
      </nav>
      <div className="prev">
        <Link to={"/notepad"}>
          <i className="material-icons">arrow_back_ios</i>
        </Link>
      </div>
      <div className="page create">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="sub">Update note</button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Update;
