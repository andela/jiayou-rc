import { Template } from "meteor/templating";
import { NumericInput } from "/imports/plugins/core/ui/client/components";
import { Logger } from "/client/api";

Template.ordersListSummary.onCreated(function () {
  this.state = new ReactiveDict();

  this.autorun(() => {
    const currentData = Template.currentData();
    const order = currentData.order;
    this.state.set("order", order);
  });
});

/**
 * ordersListSummary helpers
 *
 * @returns paymentInvoice
 */
Template.ordersListSummary.helpers({
  invoice() {
    return this.invoice;
  },

  numericInputProps(value) {
    const { currencyFormat } = Template.instance().data;

    return {
      component: NumericInput,
      value,
      format: currencyFormat,
      isEditing: false
    };
  },

  displayCancelButton() {
    return !(this.order.workflow.status === "canceled"
      || this.order.workflow.status === "coreOrderWorkflow/completed");
  },

  orderStatus() {
    return this.order.workflow.status === "canceled";
  }
});

/**
 * ordersListSummary events
 */
Template.ordersListSummary.events({
  /**
  * Submit form
  * @param  {Event} event - Event object
 * @param  {Template} instance - Blaze Template
* @return {void}
*/
  "click button[name=cancel]"(event, instance) {
    event.stopPropagation();

    const state = instance.state;
    const order = state.get("order");

    const commentText = instance.$(".input-comment");
    const comment = commentText.val().trim();

    const newComment = {
      body: comment,
      userId: Meteor.userId(),
      updatedAt: new Date
    };

    swal({
      title: "Please confirm your action?",
      text: "You are about to cancel the order you just placed!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: ".btn-danger",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    })
    .then(() => {
      Meteor.call("orders/cancelOrder", order, newComment, (error) => {
        if (error) {
          Logger.warn(error);
        }
      });
    });
  }
});
