/* eslint no-undef: 0 */

import { Wallet } from "/lib/collections";

Meteor.publish("transactionInfo", function (userId) {
  check(userId, String);
  return Wallet.find({
    userId
  });
});
