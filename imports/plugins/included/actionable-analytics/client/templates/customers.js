import { Template } from "meteor/templating";
import { Orders } from "/lib/collections";
import { ReactiveDict } from "meteor/reactive-dict";
import _ from "lodash";

Template.customers.onCreated(function () {
  // initialize state
  this.state = new ReactiveDict();
  this.state.setDefault({
    customers: null
  });
  this.subscribe("Orders");
  const self = this;
  this.autorun(function () {
    if (self.subscriptionsReady()) {
      // This array contains all the orders from the Orders collection
      const allOrders = Orders.find().fetch();
      // This object will customer emails as keys and the amount spent as value
      const customers = {};
      allOrders.forEach((order) => {
        if (!Object.keys(customers).includes(order.email)) {
          customers[order.email] = [0, ""];
          customers[order.email][1] = order.billing[0].address.fullName;
        }
        customers[order.email][0] += order.billing[0].invoice.total;
      });
      self.state.set("customers", customers);
    }
  });
});

Template.customers.helpers({
  customers() {
    let customersArray = [];
    const allCustomers = Template.instance().state.get("customers");
    for (const key in allCustomers) {
      customersArray.push({
        email: key,
        amount: allCustomers[key][0],
        name: allCustomers[key][1]
      });
    }
    // Get the top 5 highest spending customers
    customersArray = _.orderBy(customersArray, ["amount"], ["desc"]).slice(0, 5);
    return customersArray;
  }
});
