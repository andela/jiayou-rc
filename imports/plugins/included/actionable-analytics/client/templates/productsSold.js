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

Template.productsSold.onCreated(function () {
  // initialize state
  this.state = new ReactiveDict();
  this.state.setDefault({
    selectedYear: null,
    selectedMonth: null,
    totalSales: null,
    revenue: null
  });
});

// Event handler for submit button
Template.productsSold.events({
  "submit form[name=datePickerForm]"(event, template) {
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
      // get orders for the specified month and year
      const filteredOrders = [];
      let revenue = 0;
      result.forEach((order) => {
        if (order.createdAt.getMonth() === dateData.monthsMapped[selectedMonth] &&
          order.createdAt.getFullYear() === parseInt(selectedYear, 10)) {
          filteredOrders.push(order);
          revenue += order.billing[0].invoice.total;
        }
      });
      template.state.set("totalSales", filteredOrders.length);
      template.state.set("revenue", revenue);
    });
  }
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

Template.productsSold.helpers({
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
  totalSales() {
    return Template.instance().state.get("totalSales");
  },
  revenue() {
    return Template.instance().state.get("revenue");
  }
});
