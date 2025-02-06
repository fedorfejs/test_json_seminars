import React from "react";
import Seminar from "./Seminar";

export default function SeminarsList(props) {
  const {
    data,
    handleClickDeleteSeminar,
    handleClickAddSeminar,
    setDataToEdit,
    setEditOrAdd,
    formFill,
  } = props;
  return (
    <div className="seminars__list">
      {data.map((seminar) => (
        <Seminar
          formFill={formFill}
          seminar={seminar}
          key={seminar.id}
          handleClickDeleteSeminar={handleClickDeleteSeminar}
          handleClickAddSeminar={handleClickAddSeminar}
          setDataToEdit={setDataToEdit}
          setEditOrAdd={setEditOrAdd}
        />
      ))}
    </div>
  );
}
