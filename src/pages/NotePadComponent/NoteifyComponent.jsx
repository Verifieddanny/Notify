import { Link } from "react-router-dom";
import supabase from "../../config/Client";
import { useState } from "react";
function NoteifyComponent({ note, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(
    note.note.split(" ").length >= 54
  );
  const collapseNum = 40;
  const displayText =
    note.note.split(" ").length >= 54
      ? note.note.toString().split(" ").slice(0, collapseNum).join(" ") + "..."
      : note.note;
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("noteify")
      .delete()
      .eq("id", note.id)
      .select();

    if (error) {
      console.error(error);
    }
    if (data) {
      onDelete(note.id);
      console.log(data);
    }
  };
  return (
    <div className={`smoothie-card ${isExpanded ? "max" : ""}`}>
      <h3>{note.title}</h3>
      <p>{isExpanded ? displayText : note.note}</p>

      <div className="buttons">
        <Link to={`/${note.id}`}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
        {note.note.split(" ").length >= 54 && (
          <i
            className="material-icons"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "open_in_full" : "minimize"}
          </i>
        )}
      </div>
    </div>
  );
}

export default NoteifyComponent;
