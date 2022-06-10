import axios from "axios";

const rootUrl =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : "http://localhost:8000/api/v1";

const userEP = rootUrl + "/users";
const transactionEp = rootUrl + "/transactions";

// creating new user
export const postUser = async (usrObj) => {
  try {
    const { data } = await axios.post(userEP, usrObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
// login user
export const loginUser = async (usrObj) => {
  try {
    const { data } = await axios.post(userEP + "/login", usrObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// ====== transaction apis ======

// post new transaction
export const postTransaction = async (transObj) => {
  try {
    const { data } = await axios.post(transactionEp, transObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// get all transactions associated with a user
export const getTransactions = async () => {
  try {
    const { _id } = JSON.parse(window.sessionStorage.getItem("user"));
    const { data } = await axios.get(transactionEp, {
      headers: {
        Authorization: _id,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
// delete transactions associated with a user
export const deleteTransactions = async (ids) => {
  try {
    const { _id } = JSON.parse(window.sessionStorage.getItem("user"));
    const { data } = await axios.delete(transactionEp, {
      headers: {
        Authorization: _id,
      },
      data: ids,
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
