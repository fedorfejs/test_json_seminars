import React from "react";

export default function FromToAdd(props) {
  const {
    add_inner,
    editOrAdd,
    edit_inner,
    setEditOrAdd,
    unfill,
    closeModalForm,
  } = props;
  return (
    <div id="modal" className="modal">
      <div className="modal__content " style={{ width: "600px" }}>
        <h2>Добавить семинар</h2>
        <form id="add__form">
          <label name="title">Title:</label>
          <input type="title" name="title" id="inputValue" />
          <label name="description">Description:</label>
          <input type="description" name="description" id="descriptionValue" />

          <label name="photo">Photo URL:</label>
          <input type="photo" name="photo" id="photoValue" />
          <label name="date">Дата:</label>
          <input type="date" name="date" id="dateValue" />
          <label name="время">Время:</label>
          <input type="time" name="time" id="timeValue" />
          <button
            id="sub_button"
            type="submit"
            onClick={(e) => {
              if (editOrAdd === "add") {
                add_inner(e);
                setEditOrAdd("");
              }
              if (editOrAdd === "edit") {
                edit_inner(e);
                setEditOrAdd("");
              }
            }}
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              const form = document.getElementById("add__form");
              unfill();

              closeModalForm();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
