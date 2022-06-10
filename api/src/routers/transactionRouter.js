import express from "express";
import {
  createTransaction,
  deleteTransactions,
  findTransactions,
} from "../modules/Transaction/Transaction.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;

    const filter = { userId: authorization };

    const result = await findTransactions(filter);
    res.json({
      status: "success",
      message: "Transaction list",
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await createTransaction(req.body);

    result?.id
      ? res.json({
          status: "success",
          message: "New transaction has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create a new transaction, please try again",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const ids = req.body;
    const { authorization } = req.headers;
    const result = await deleteTransactions(ids, authorization);
    console.log(result);
    result?.deletedCount
      ? res.json({
          status: "success",
          message: "Selected transactions has been deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete transactions, please try again",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
