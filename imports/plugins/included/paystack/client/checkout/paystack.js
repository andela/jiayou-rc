/* eslint camelcase: 0 */
/* eslint no-undef: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Cart, Shops, Accounts, Packages } from "/lib/collections";

import "./paystack.html";

Template.paystackPaymentForm.events({
  "click #paywithpaystack": (event) => {
    event.preventDefault();
    const accountDetails = Accounts.find(Meteor.userId()).fetch();
    const userMail = accountDetails[0].emails[0].address;
    const amount = getOrderPrice();
    const transactionId = generateTransactionID();
    const mailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i;
    if (!mailRegex.test(userMail)) {
      Alerts.toast("Invalid email address", "error");
      return false;
    }
    payWithPaystack(userMail, amount, transactionId);
  }
});

Template.paystackPaymentForm.helpers({
  PaystackSchema() {
    return PaystackSchema;
  }
});

