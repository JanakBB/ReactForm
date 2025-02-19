import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title!" },
      {
        minLength: true,
        message: "Title should be at least 5 characters long!",
      },
    ],
    category: [{ required: true, message: "Please enter category!" }],
    amount: [
      { required: true, message: "Please enter amount!" },
      {
        pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
        message: "Please enter a valid number!",
      },
    ],
  };

  const validation = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 5) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.message;
        }
      });
    });
    setErrors(errorData);
    return errorData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = validation(expense);
    if (Object.keys(validationResult).length) return;

    if (editingRowId) {
      setExpenses((prevData) =>
        prevData.map((pD) => {
          if (pD.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return pD;
        })
      );
      setEditingRowId("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (/^(0|[1-9]\d*)(\.\d+)?$/.test(value)) {
        setExpense((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      return
    }
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onchange={onChangeHandler}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onchange={onChangeHandler}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption="Select Category"
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onchange={onChangeHandler}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
