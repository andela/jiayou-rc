import _ from "lodash";
import { Template } from "meteor/templating";
import { Orders, Products, Accounts, Shops } from "/lib/collections";
import { formatPriceString } from "/client/api";
import { ReactiveDict } from "meteor/reactive-dict";

// Function to get total sales recorded
// console.log("hello", Products.find().fetch());
Template.overview.onRendered(() => {

});


Template.overview.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    allSales: 0,
    numberOfOrders: 0,
    revenue: 0,
    allUsers: 0,
    numOfShops: 0
  });
  this.subscribe("Orders");
  const self = this;
  this.autorun(function () {
    if (self.subscriptionsReady()) {
      const allOrders = Orders.find().fetch();
      let allSales = 0;
      let revenue = 0;
      allOrders.forEach((order) => {
        allSales += order.items.length;
        revenue += order.billing[0].invoice.total;
      });
      console.log(Shops.find().fetch());
      self.state.set("allSales", allSales);
      self.state.set("numberOfOrders", allOrders.length);
      self.state.set("revenue", revenue);
      self.state.set("allUsers", Accounts.find().fetch().length);
      self.state.set("numOfShops", Shops.find().fetch().length);
    }
  });
});

Template.overview.helpers({
  allSales() {
    return Template.instance().state.get("allSales");
  },
  numberOfOrders() {
    return Template.instance().state.get("numberOfOrders");
  },
  revenue() {
    return Template.instance().state.get("revenue");
  },
  allUsers() {
    return Template.instance().state.get("allUsers");
  },
  numOfShops() {
    return Template.instance().state.get("numOfShops");
  }
});
