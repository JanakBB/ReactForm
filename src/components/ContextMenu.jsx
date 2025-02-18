import { FaChevronLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  expenses,
  setExpenses,
  rowId,
}) {
  if (!menuPosition?.left) return;
  return (
    <div
      className="context-menu"
      style={menuPosition}
      onClick={() => setMenuPosition({})}
    >
      <div>
        <FaEdit />
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses(expenses.filter((ex) => ex.id !== rowId));
        }}
      >
        <FaTrash />
        Delete
      </div>
      <div>
        <FaChevronLeft />
        Back
      </div>
    </div>
  );
}
