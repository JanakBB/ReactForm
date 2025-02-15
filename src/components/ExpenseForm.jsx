import React from "react";
// nasaC point: 2
export default function ExpenseForm({setExpenses}) {
  // nasaB point: 4
  const submitHandler = (e) => {
    e.preventDefault();
    const outPutFormData = {...getFormData(e.target), id: crypto.randomUUID()}
    // nasaC point: 3
    setExpenses((preData) => [...preData, outPutFormData])
    e.target.reset()
  };

  const getFormData = (targetData) => {
    const data = {}
    const formData = new FormData(targetData);
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    return data
  }
  return (
    <form
    // nasaB point: 2
      className="expense-form" onSubmit={submitHandler}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input id="title" name="title"/>
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select id="category" name="category">
          <option value="" hidden>
            Select Category
          </option>
          <option value="grocery">Grocery</option>
          <option value="clothes">Clothes</option>
          <option value="bills">Bills</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input id="amount" name="amount" />
      </div>
      {/* nasaB point: 1 */}
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
}
