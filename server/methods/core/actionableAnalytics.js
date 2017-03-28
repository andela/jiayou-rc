import { Meteor } from "meteor/meteor";
import { Orders, Accounts, Products, Shops } from "/lib/collections";

Meteor.methods({
  "analytics/get-orders": function () {
    return Orders.find({}).fetch();
  },

  "analytics/get-customer": function (id) {
    check(id, String);
    return Accounts.find({
      userId: id
    }).fetch();
  },

  "analytics/get-product": function (id) {
    check(id, String);
    return Products.find({
      _id: id
    }).fetch();
  },

  "analytics/get-shops": function () {
    return Shops.find().fetch();
  },

  "analytics/get-all-products-ids": function () {
    const allIDs = [];
    const allProducts = Products.find().fetch();

    allProducts.forEach((product) => {
      allIDs.push(product._id);
    });
    return allIDs;
  },

  "analytics/getProductOrder": function (productId) {
    check(productId, String);
    const result = Products.findOne({
      _id: productId
    });
    if (result) {
      const query = {
        $inc: { salesCount: 1 }
      };
      Products.update({ productId }, query);
    }
  }
});
