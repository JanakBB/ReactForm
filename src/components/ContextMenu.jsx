import { FaChevronLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  expenses,
  setExpenses,
  rowId,
  setExpense,
  setEditingRowId
}) {
  if (!menuPosition?.left) return;
  return (
    <div
      className="context-menu"
      style={menuPosition}
      onClick={() => setMenuPosition({})}
    >
      <div onClick={() => {
        const {title, category, amount} = expenses.find((expense) => expense.id === rowId)
        setExpense({title, category, amount})
        setEditingRowId(rowId)
      }}>
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
