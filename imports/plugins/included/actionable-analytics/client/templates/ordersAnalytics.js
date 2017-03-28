import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import { Orders } from "/lib/collections";

// We initialize an object that will store the status for all orders
// const orderTypes = ["new", "processing", "completed"];


Template.ordersAnalytics.onCreated(function () {
  this.state = new ReactiveDict();
  this.state.setDefault({
    orderStatuses: null
  });
  this.subscribe("Orders");
  const self = this;
  this.autorun(function () {
    if (self.subscriptionsReady()) {
      const allOrders = Orders.find().fetch();
      const orderTypes = { new: 0, processing: 0, completed: 0 };
      allOrders.forEach((order) => {
        // console.log("status ", order.workflow.status);
        if (order.workflow.status === "new") {
          orderTypes.new += 1;
        } else if (order.workflow.status === "coreOrderWorkflow/processing") {
          orderTypes.processing += 1;
        } else {
          orderTypes.completed += 1;
        }
      });
      self.state.set("orderStatuses", orderTypes);
    }
  });
});

Template.ordersAnalytics.helpers({
  orderData() {
    const allOrdersInfo = [];
    const allOrdersTypes = Template.instance().state.get("orderStatuses");
    for (const key in allOrdersTypes) {
      allOrdersInfo.push({
        status: key,
        number: allOrdersTypes[key]
      });
    }
    return allOrdersInfo;
  }
});
