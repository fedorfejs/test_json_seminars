import React from "react";

export default function Seminar(props) {
  const {
    seminar,
    handleClickDeleteSeminar,
    handleClickAddSeminar,
    setDataToEdit,
    setEditOrAdd,
    formFill,
  } = props;
  const id = seminar.id;

  return (
    <div className="seminar">
      <div className="image__container">
        <img src={seminar.photo} alt={seminar.title} />
      </div>

      <div className="seminar__description">
        <h2>{seminar.title}</h2>
        <p>{seminar.description}</p>
        <p>Дата: {seminar.date}</p>
        <p>Время: {seminar.time}</p>

        <button
          className="delete__button"
          onClick={() => handleClickDeleteSeminar(id)}
        >
          Delete
        </button>

        <button
          className="edit__button"
          onClick={(e) => {
            setEditOrAdd("edit");
            setDataToEdit(seminar);
            handleClickAddSeminar(e);
            formFill(seminar);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
