import React, { useEffect, useState } from "react";
import SeminarsList from "./components/SeminarsList";
import { deleteSeminar, addSeminar, getSeminars, editSeminar } from "./api";
import "./style.css";
import FormToAdd from "./components/FormToAdd";
import { generateId } from "./utils/utils";

export default function App() {
  //Стейт для отображения семинаров
  const [seminars, setSeminars] = React.useState([]);
  //Стейт для отображения статуса загрузки
  const [loading, setLoading] = React.useState(true);
  //Стейт для отображения ошибки
  const [eror, setEror] = React.useState(null);
  //Стетйт для отображения submit action
  const [editOrAdd, setEditOrAdd] = useState("");
  //Стейт для отображения данных для редактирования
  const [dataToEdit, setDataToEdit] = React.useState(null);

  useEffect(() => {
    const seminarsFetch = async () => {
      try {
        const data = await getSeminars().then((data) => setSeminars(data));
        setLoading(false);
      } catch (error) {
        setEror(error);
        setLoading(false);
      }
    };
    seminarsFetch();
  }, []);

  //Функция удаления семинара
  const handleClickDeleteSeminar = async (id) => {
    if (window.confirm("Вы действительно хотите удалить семинар?")) {
      try {
        await deleteSeminar(id);
        setSeminars((prevSeminars) =>
          prevSeminars.filter((seminar) => seminar.id !== id)
        );
      } catch (error) {
        console.error("Error deleting seminar:", error);
      }
    }
  };

  //Функция открытия модального окна
  const ShowModalForm = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "flex ";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
  };

  //Функция закрытия модального окна
  const closeModalForm = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  };

  //функция открытия модального окна и устанвки пустых значений в поля формы
  const handleClickAddSeminar = () => {
    ShowModalForm();
    if (editOrAdd === "add") {
      document.getElementById("inputValue").setAttribute("value", "");
      document.getElementById("descriptionValue").setAttribute("value", "");

      document.getElementById("photoValue").setAttribute("value", "");
      if (editOrAdd === "edit") {
        formFill(dataToEdit);
      }
    }
  };
  //Функция добавления семинара
  const add_inner = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add__form");
    const fromData = new FormData(form);
    const data = {
      id: generateId(),
      title: fromData.get("title"),
      description: fromData.get("description"),
      photo: fromData.get("photo"),
      time: fromData.get("time").toString(),
      date: fromData.get("date").toString(),
    };

    try {
      console.log(data);
      addSeminar(data);
      setSeminars((prevSeminars) => [...prevSeminars, data]);
      closeModalForm();
    } catch (error) {
      console.error("Error adding seminar:", error);
    }
    form.reset();
  };

  //функциия заполнения полей при редактировании

  const formFill = (editInfo) => {
    const input = document.getElementById("inputValue");
    input.setAttribute("value", `${editInfo.title}`);
    const description = document.getElementById("descriptionValue");
    description.setAttribute("value", `${editInfo.description}`);
    const photo = document.getElementById("photoValue");
    photo.setAttribute("value", `${editInfo.photo}`);
    console.log("editInfo", editInfo);
  };
  //Функция очистки полей
  const unfill = () => {
    document.getElementById("inputValue").setAttribute("value", "");
    document.getElementById("descriptionValue").setAttribute("value", "");

    document.getElementById("photoValue").setAttribute("value", "");
  };

  //функция редактирования семинара
  const edit_inner = async (e) => {
    e.preventDefault();
    const id = dataToEdit.id;
    const form = document.getElementById("add__form");
    const fromData = new FormData(form);
    const dataSeminar = {
      id: dataToEdit.id,
      title: fromData.get("title"),
      description: fromData.get("description"),
      photo: fromData.get("photo"),
      time: fromData.get("time").toString(),
      date: fromData.get("date").toString(),
    };

    try {
      editSeminar(dataToEdit.id, dataSeminar);
      setSeminars((prevSeminars) =>
        prevSeminars.filter((seminar) => seminar.id !== id)
      );
      setSeminars((prevSeminars) => [...prevSeminars, dataSeminar]);
      closeModalForm();
      console.log(dataSeminar);
    } catch (error) {
      console.error("Error adding seminar:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }
  if (eror) {
    return (
      <div>
        <p>{eror}</p>
      </div>
    );
  }
  return (
    <div className="main">
      <div className="header">
        <div className="heder__logo__name">
          <h1>Seminars world</h1>
        </div>
        <div className="add__button__container">
          <button
            className="add__button"
            onClick={(e) => {
              setEditOrAdd("add");
              handleClickAddSeminar(e);
            }}
          >
            Add seminar
          </button>
        </div>
      </div>
      <div className="container">
        {/* Компонент для динамического отображения семинаров */}
        <SeminarsList
          data={seminars}
          handleClickDeleteSeminar={handleClickDeleteSeminar}
          handleClickAddSeminar={handleClickAddSeminar}
          setDataToEdit={setDataToEdit}
          setEditOrAdd={setEditOrAdd}
          formFill={formFill}
        />
      </div>
      {/* Компонент карточки семинара */}
      <FormToAdd
        unfill={unfill}
        add_inner={add_inner}
        editOrAdd={editOrAdd}
        setEditOrAdd={setEditOrAdd}
        edit_inner={edit_inner}
        dataToEdit={dataToEdit}
        closeModalForm={closeModalForm}
      />
    </div>
  );
}
