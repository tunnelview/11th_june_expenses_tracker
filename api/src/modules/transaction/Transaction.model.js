import TransactionSchema from "./Transaction.schema.js";

//crate a new Transaction in the table
export const createTransaction = (newTransactionObj) => {
  return TransactionSchema(newTransactionObj).save();
};

// find single transaction
export const findTransaction = (filter) => {
  return TransactionSchema.findOne(filter);
};

//find all transaction, @filter should be an object
export const findTransactions = (filter) => {
  return TransactionSchema.find(filter);
};

//delete transctions
export const deleteTransactions = (ids, userId) => {
  return TransactionSchema.deleteMany({ _id: { $in: ids }, userId });
};
