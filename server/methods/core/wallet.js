import { Meteor } from "meteor/meteor";
import { Wallet, Accounts } from "/lib/collections";
import * as Schemas from "/lib/collections/schemas";
import { check } from "meteor/check";
import bcrypt  from "bcrypt-nodejs";

Meteor.methods({
  "wallet/pin": (userId, pin) => {
    check(userId, String);
    check(pin, Number);
    convertedPin = pin.toString();
    const hashedPin = bcrypt.hashSync(convertedPin, bcrypt.genSaltSync(8));
    try {
      Wallet.update({
        userId
      }, {
        $set: {
          userPin: hashedPin
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * wallet/deposit method to deposit money into user's account
   * @param {string} userId the id of the user
   * @param {object} transactions details of the transaction
   * @return {boolean} true or false if the db operation was successful
   */
  "wallet/transaction": (userId, transactions) => {
    check(userId, String);
    check(transactions, Schemas.Transactions);
    let balanceOptions;
    const {
      amount,
      transactionType
    } = transactions;
    if (transactionType === "Credit") {
      balanceOptions = {
        balance: amount
      };
    }
    if (transactionType === "Debit") {
      if (transactions.to) {
        const recipient = Accounts.findOne({
          "emails.0.address": transactions.to
        });
        const sender = Accounts.findOne(userId);
        if (sender.emails[0].address === recipient) {
          return 3;
        }
        if (!recipient) {
          return 2;
        }
        // deposit for the recipient
        Meteor.call("wallet/transaction", recipient._id, {
          amount,
          from: sender.emails[0].address,
          date: new Date(),
          transactionType: "Credit"
        });
      }
      balanceOptions = {
        balance: -amount
      };
    }

    try {
      Wallet.update({
        userId
      }, {
        $push: {
          transactions: transactions
        },
        $inc: balanceOptions
      }, {
        upsert: true
      });
      return 1;
    } catch (error) {
      return 0;
    }
  }
});
