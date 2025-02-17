import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({ setExpenses }) {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title!" },
      { minLength: 5, message: "Title should be at least 5 characters long!" },
    ],
    category: [{ required: true, message: "Please enter category!" }],
    amount: [{ required: true, message: "Please enter amount!" }],
    email: [
      { required: true, message: "Please enter email" },
      {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Please enter valid email!",
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
          return true;
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

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
      email: ""
    });
  };

  const onChangeHandler = (e) => {
    let { name, value } = e.target;
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
      <Input
        label="Email"
        id="email"
        name="email"
        value={expense.email}
        onchange={onChangeHandler}
        error={errors.email}
      />
      <button className="add-btn">Add</button>
    </form>
  );
}
