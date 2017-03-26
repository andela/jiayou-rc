import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";

// Data to populate the dropdown menu
const dateData = {
  months: ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"],
  year: [],
  monthsMapped: {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  }
};

Template.hotProducts.onCreated(function () {
  // initialize state
  this.state = new ReactiveDict();
  this.state.setDefault({
    selectedYear: "Select a year",
    selectedMonth: "Select a month",
    allOrders: null
  });
});

const getDates = (date) => {
  if (!dateData.year.includes(date.getFullYear())) {
    dateData.year.push(date.getFullYear());
  }
};

Meteor.call("analytics/get-orders", (error, result) => {
  result.forEach((order) => {
    getDates(order.createdAt);
  });
});


Template.hotProducts.events({
  "submit form[name=datePickerForm2]"(event, template) {
    event.preventDefault();

    // .trim() is very important
    const selectedYear = template.$("#year option:selected").text().trim();
    const selectedMonth = template.$("#month option:selected").text().trim();

    if (selectedYear === "Select Year" || selectedMonth === "Select Month") {
      toastr.error("Please select a time");
    }

    Template.instance().state.set("selectedYear", selectedYear);
    Template.instance().state.set("selectedMonth", selectedMonth);

    Meteor.call("analytics/get-orders", (error, result) => {

      /**
        * This object contains information about all the quantity sold
        * for each product in an order
       */

      const allOrders = {};
      result.forEach((order) => {
        if (order.createdAt.getMonth() === dateData.monthsMapped[selectedMonth] &&
          order.createdAt.getFullYear() === parseInt(selectedYear, 10)) {
          order.items.forEach((item) => {
            // check if productID is not a key in the allOrders object
            if (!Object.keys(allOrders).includes(item.title)) {
              /**
               * The first item in the array is the quantity sold
               */
              allOrders[item.title] = [0];
            }
            allOrders[item.title][0] += item.quantity;
          });
        }
      });
      template.state.set("allOrders", allOrders);
    });
  }
});

Template.hotProducts.helpers({
  getMonths() {
    return dateData.months;
  },
  getYears() {
    return dateData.year;
  },
  selectedYear() {
    return Template.instance().state.get("selectedYear");
  },
  selectedMonth() {
    return Template.instance().state.get("selectedMonth");
  },
  allOrders() {
    const ordersArray = [];
    const orders = Template.instance().state.get("allOrders");
    // We set a threshold of 5 sales or more to classify a product as 'hot'
    for (const key in orders) {
      if (orders[key][0] >= 5) {
        ordersArray.push({
          product: key,
          quantity: orders[key][0]
        });
      }
    }
    return ordersArray;
  }
});
