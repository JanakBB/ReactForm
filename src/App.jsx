import { useEffect, useState } from "react";
import "./App.css";
import ContextMenu from "./components/ContextMenu";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import { expensesData } from "./lib/expenseData";

function App() {
  const [expenses, setExpenses] = useState(expensesData)
  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm setExpenses={setExpenses}/>
        <ExpenseTable expenses={expenses} setExpenses={setExpenses}/>
        <ContextMenu />
      </div>
    </main>
  );
}

export default App;
