import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { deleteTransactions, getTransactions } from "../../helpers/axiosHelper";

export const CustomTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [ids, setIds] = useState([]);
  const [resp, setResp] = useState({});

  useEffect(() => {
    //call fuction to call api to feth all the transactions
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    // let's call axios to fetch all the transactions
    const data = await getTransactions();
    if (data.status === "success") {
      setTransactions(data.result);
    }
  };

  const handleOnCheck = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      //add id to the array
      setIds([...ids, value]);
    } else {
      //remove id from the array

      const filtedIds = ids.filter((id) => id !== value);
      setIds(filtedIds);
    }
  };

  const handleOnDelete = async () => {
    // cals api to delete the selected transactions
    if (
      !window.confirm(
        `Are you sure you want to delete ${ids.length} transactions?`
      )
    )
      return;

    // call api
    const result = await deleteTransactions(ids);
    result.status === "success" && fetchTransactions() && setIds([]);
    setResp(result);
    ///TODO: if satus is success then refetch the transactions
  };

  const balance = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  return (
    <div className="mt-5">
      {transactions.length} transactions found!
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Title</th>
            <th>Expenses</th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((trans, i) => (
            <tr key={trans._id}>
              <td>
                <Form.Check value={trans._id} onChange={handleOnCheck} />
              </td>
              <td>{new Date(trans.createdAt).toLocaleDateString()}</td>
              <td>{trans.title}</td>
              {trans.type === "income" ? (
                <>
                  <td></td>
                  <td>
                    <span className="text-success">${trans.amount}</span>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <span className="text-danger">-${trans.amount}</span>
                  </td>
                  <td></td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td colSpan={5} className="text-end fw-bold">
              Balance ${balance}
            </td>
          </tr>
        </tbody>
      </Table>
      {resp.message && (
        <Alert variant={resp.status === "success" ? "success" : "danger"}>
          {resp.message}
        </Alert>
      )}
      {ids.length > 0 && (
        <Button variant="danger" onClick={handleOnDelete}>
          Delete {ids.length} selectd transactions
        </Button>
      )}
    </div>
  );
};
