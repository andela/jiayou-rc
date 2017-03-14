import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const Transactions = new SimpleSchema({
  amount: {
    type: Number,
    decimal: true,
    label: "Amount"
  },
  transactionType: {
    type: String
  },
  from: {
    type: String,
    optional: true
  },
  to: {
    type: String,
    optional: true
  },
  orderId: {
    type: String,
    optional: true
  },
  referenceId: {
    type: String,
    optional: true
  },
  date: {
    type: Date
  }
});

export const Wallet = new SimpleSchema({
  userId: {
    type: String,
    label: "User"
  },
  userPin: {
    type: String,
    optional: true
  },
  transactions: {
    type: [Transactions]
  },
  balance: {
    type: Number,
    defaultValue: 0,
    decimal: true,
    optional: true
  }
});
