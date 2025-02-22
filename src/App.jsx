import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import { expensesData } from "./lib/expenseData";
import { useLocalStorare } from "./hook/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorare("expense",{
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocalStorare("expenses", expensesData);
  const [editingRowId, setEditingRowId] = useLocalStorare("editingRowId", "");
  return (    
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          editingRowId={editingRowId}
          expenses={expenses}
          setEditingRowId={setEditingRowId}
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          setEditingRowId={setEditingRowId}
        />
      </div>
    </main>
  );
}

export default App;
