import { Template } from "meteor/templating";
import { NumericInput } from "/imports/plugins/core/ui/client/components";
import { Textfield } from "/imports/plugins/core/ui/client/components";

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
      || this.order.workflow.status === "coreOrderWorkflow/canceled");
  },

  orderStatus() {
    return this.order.workflow.status === "canceled";
  },

  render() {
    return (
      <Textfield
        i18nKeyLabel={"translation.i18n.key"}
        label="Name"
        onChange={this.handleChange}
        value={this.state.value}
      />
    );
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
      Meteor.call("orders/cancelOrder", order, (error) => {
        if (error) {
          swal("Order cancellation unsuccessful.", "success");
        }
      });
    });
  }
});
