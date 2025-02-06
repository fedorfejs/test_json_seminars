import axios from "axios";

const API_URL = "http://localhost:3000/seminars";

// Функция получения семинаров с сервера
export const getSeminars = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
// Функция удаления семинара  с сервера
export const deleteSeminar = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting seminar:", error);
    throw error;
  }
};
// Функция добавления семинара на сервер
export const addSeminar = async (seminar) => {
  try {
    const response = await axios.post(API_URL, seminar);
    return response.data;
  } catch (error) {
    console.error("Error adding seminar:", error);
    throw error;
  }
};

// Функция редактирования семинара на сервере
export const editSeminar = async (id, seminar) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, seminar);
    return response.data;
  } catch (error) {
    console.error("Error editing seminar:", error);
    throw error;
  }
};
