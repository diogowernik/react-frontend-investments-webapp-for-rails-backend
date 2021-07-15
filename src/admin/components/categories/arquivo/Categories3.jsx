import React from "react";
import CRUDTable, {Fields,Field,CreateForm,UpdateForm,DeleteForm} from "react-crud-table";
import "./Index.css";

const SlugRenderer = ({ field }) => <textarea {...field} />;


let categories =[
  {
    id: 1,
    title: "Create an example",
    slug: "Create an example of how to use the component"
  },
  {
    id: 2,
    title: "Improve",
    slug: "Improve the component!"
  }
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = categories.length;

const service = {
  
  fetchItems: payload => {
    let result = Array.from(categories);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: category => {
    count += 1;
    categories.push({
      ...category,
      id: count
    });
    return Promise.resolve(category);
  },
  update: data => {
    const category = categories.find(t => t.id === data.id);
    category.title = data.title;
    category.slug = data.slug;
    return Promise.resolve(category);
  },
  delete: data => {
    const category = categories.find(t => t.id === data.id);
    categories = categories.filter(t => t.id !== category.id);
    return Promise.resolve(category);
  }
};

const styles = {
  // container: { margin: "auto", width: "fit-content" }
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      // caption="Categories"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="title" label="Title" placeholder="Title" />
        <Field
          name="slug"
          label="Slug"
          render={SlugRenderer}
        />
      </Fields>
      <CreateForm
        title="Category Creation"
        message="Create a new category!"
        trigger="Create Category"
        onSubmit={category => service.create(category)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.title) {
            errors.title = "Please, provide category's title";
          }

          if (!values.slug) {
            errors.slug = "Please, provide category's slug";
          }

          return errors;
        }}
      />

      <UpdateForm
        title="Category Update Process"
        message="Update category"
        trigger="Update"
        onSubmit={category => service.update(category)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.title) {
            errors.title = "Please, provide category's title";
          }

          if (!values.slug) {
            errors.slug = "Please, provide category's slug";
          }

          return errors;
        }}
      />

      <DeleteForm
        title="Category Delete Process"
        message="Are you sure you want to delete the category?"
        trigger="Delete"
        onSubmit={category => service.delete(category)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

function Categories(props) {
    return (
    <>
        <Example />
    </>
    )
  }
  
  export default Categories