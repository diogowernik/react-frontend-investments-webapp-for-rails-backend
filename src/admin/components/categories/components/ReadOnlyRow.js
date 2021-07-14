import React from "react";

const ReadOnlyRow = ({ category, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.title}</td>
      <td>{category.slug}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, category)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(category.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
