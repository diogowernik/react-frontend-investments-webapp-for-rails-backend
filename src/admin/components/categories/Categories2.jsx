import React, { useState, Fragment } from "react";
import Datatable from '../../../globalcomponents/datatable/Datatable';
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [categories, setCategories] = useState(data);

  const [addFormData, setAddFormData] = useState({
    title: "",
    slug: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    slug: "",
  });

  const [editCategoryId, setEditCategoryId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newCategory = {
      id: nanoid(),
      title: addFormData.title,
      slug: addFormData.slug,
    };

    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedCategory = {
      id: editCategoryId,
      title: editFormData.title,
      slug: editFormData.slug,
    };

    const newCategories = [...categories];

    const index = categories.findIndex((category) => category.id === editCategoryId);

    newCategories[index] = editedCategory;

    setCategories(newCategories);
    setEditCategoryId(null);
  };

  const handleEditClick = (event, category) => {
    event.preventDefault();
    setEditCategoryId(category.id);

    const formValues = {
      title: category.title,
      slug: category.slug,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditCategoryId(null);
  };

  const handleDeleteClick = (categoryId) => {
    const newCategories = [...categories];

    const index = categories.findIndex((category) => category.id === categoryId);

    newCategories.splice(index, 1);

    setCategories(newCategories);
  };

  return (
    
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>

      <Datatable>

        
      <table className="table table-striped my-4 w-100">
          <thead>
            <tr>
            <th>Id</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <Fragment>
                {editCategoryId === category.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    category={category}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
    
    
        </Datatable>  
      </form>

      <h4 className="mt-4 mb-4">Editar / Criar</h4>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="title"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="slug"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
