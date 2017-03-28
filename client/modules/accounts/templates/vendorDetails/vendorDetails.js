import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Accounts } from "/lib/collections";
Template.vendorDetails.helpers({
  getVendorDetails: () => {
    const userDetails = Accounts.findOne(Meteor.userId);
    return userDetails.profile.vendorDetails[0];
  }
});
