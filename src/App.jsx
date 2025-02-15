import { useState } from "react";
import "./App.css";
import ContextMenu from "./components/ContextMenu";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
// nasaD point: 2
import { expensesData } from "./lib/expenseData";

function App() {
  //nasaA point: 1
  //nasaD point: 3*
  const [expenses, setExpenses] = useState(expensesData)
  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        {/*nasaC point: 1 */}
        <ExpenseForm setExpenses={setExpenses}/>
        {/*nasaA point: 2 */}
        <ExpenseTable expenses={expenses}/>

        <ContextMenu />
      </div>
    </main>
  );
}

export default App;
