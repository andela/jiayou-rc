/* eslint-disable no-undef */
import { LoginFormSharedHelpers } from "/client/modules/accounts/helpers";
import { Template } from "meteor/templating";
/**
 * onCreated: Login form sign up view
 */
Template.loginFormSignUpView.onCreated(() => {
  const template = Template.instance();
  template.uniqueId = Random.id();
  template.formMessages = new ReactiveVar({});
  template.type = "signUp";
});
/**
 * Helpers: Login form sign up view
 */
Template.loginFormSignUpView.helpers(LoginFormSharedHelpers);

Template.loginFormSignUpView.onRendered(function () {
  $(".vendor-form").css("display", "none");
});
/**
 * Events: Login form sign up view
 */
Template.loginFormSignUpView.events({
  "click #is-vendor": (event) => {
    const isVendor = event.target.value;
    Session.set("isVendor", isVendor);
  },
  /**
   * Submit sign up form
   * @param  {Event} event - jQuery Event
   * @param  {Template} template - Blaze Template
   * @return {void}
   */
  "submit form": function (event, template) {
    event.preventDefault();
    let isVendor;
    const usernameInput = template.$(".login-input-username");
    const emailInput = template.$(".login-input-email");
    const passwordInput = template.$(".login-input-password");
    isVendor = Session.get("isVendor");
    isVendor  = isVendor === "asVendor" ? true :  false;
    const username = usernameInput.val().trim();
    const email = emailInput.val().trim();
    const password = passwordInput.val().trim();
    const validatedUsername = LoginFormValidation.username(username);
    const validatedEmail = LoginFormValidation.email(email);
    const validatedPassword = LoginFormValidation.password(password);
    const templateInstance = Template.instance();
    const errors = {};
    templateInstance.formMessages.set({});
    if (validatedUsername !== true) {
      errors.email = validatedUsername;
    }
    if (validatedEmail !== true) {
      errors.email = validatedEmail;
    }
    if (validatedPassword !== true) {
      errors.password = validatedPassword;
    }
    let vendorDetails = {};
    if (Session.get("signupas") === "vendor") {
      const shopName = template.$(".shop-name").val().trim();
      const shopPhone = template.$(".shop-phone").val().trim();
      const shopAddress = template.$(".shop-address").val().trim();

      const validatedShopName = LoginFormValidation.shopName(shopName);
      const validatedShopPhone = LoginFormValidation.shopPhone(shopPhone);
      const validatedShopAddress = LoginFormValidation.shopAddress(shopAddress);
      if (validatedShopName !== true) {
        errors.shopName = validatedShopName;
      }
      if (validatedShopPhone !== true) {
        errors.shopPhone = validatedShopPhone;
      }
      if (validatedShopAddress !== true) {
        errors.shopAddress = validatedShopAddress;
      }

      vendorDetails = {
        vendorDetails: [{
          shopName: shopName,
          shopPhone: shopPhone,
          shopAddress: shopAddress,
          shopActive: false
        }]
      };
    }

    if ($.isEmptyObject(errors) === false) {
      templateInstance.formMessages.set({
        errors: errors
      });
      // prevent signup
      return;
    }
    console.log(isVendor, "isVendor");
    const newUserData = {
      username: username,
      email: email,
      password: password,
      profile: vendorDetails,
      isVendor: isVendor
    };

    Accounts.createUser(newUserData, function (error) {
      if (error) {
        // Show some error message
        templateInstance.formMessages.set({
          alerts: [error]
        });
      } else {
        // Close dropdown or navigate to page
      }
    });
  },
  "change .chooseSignupType": function (event, template) {
    const element = template.find("input:radio[name=role]:checked");
    const value = $(element).val();
    if (value === "asVendor") {
      $(".vendor-form").css("display", "block");
      Session.set("signupas", "vendor");
    } else {
      $(".vendor-form").css("display", "none");
      Session.set("signupas", "customer");
    }
  }
});
