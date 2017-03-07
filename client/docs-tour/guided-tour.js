const tour = new Tour({
  name: "tour",
  storage: window.localStorage,
  template: `<div class="popover tour-tour tour-tour-0 fade bottom in"
  role="tooltip" id="step-0" style="top: 55px; left: 230.5px; display: block;">
  <div class="arrow"></div> <h3 class="popover-title"></h3>
  <div class="popover-content" style="background-color: #dceaf7"></div>
  <div class="popover-navigation" style="background-color: #dceaf7">
  <div class="btn-group">
  <button class="btn btn-sm btn-default disabled"
  data-role="prev">« Prev</button>
  <button class="btn btn-sm btn-default" data-role="next">Next »</button></div>
  <button class="btn btn-sm btn-default" data-role="end">End tour</button>
  </div> </div>`,
  steps: [
    {
      element: "#welcome",
      title: "Welcome Note",
      content: `This tour will give you a guided assistance on how to
      use this application as a seller.`,
      placement: "bottom"
    },
    {
      element: ".fa-th",
      title: "Settings",
      content: `Reaction configuration; Here you configure your
      shop’s name, address, payment methods, and other settings. `,
      placement: "top"
    },
    {
      element: ".fa-sun-o",
      title: "Orders",
      content: "Review and process orders.",
      placement: "top"
    },
    {
      element: ".fa-truck",
      title: "Shipping",
      content: "Set up and manage your shipping and handling rates.",
      placement: "top"
    },
    {
      element: ".fa-sign-in",
      title: "Accounts",
      content: `Add, edit, and remove permissions for
      each of your shop members.`,
      placement: "top"
    },
    {
      element: ".fa-envelope-o",
      title: "Email",
      content: "Configure the email type you want to be connected to your store",
      placement: "top"
    },
    {
      element: ".fa-undo",
      title: "Revisions",
      content: `Here the ability for admin users to review, stage,
      and revert changes to products.`,
      placement: "top"
    },
    {
      element: ".fa-archive",
      title: "Catalog",
      content: "Enable or disable your product catalog view.",
      placement: "top"
    },
    {
      element: ".fa-search",
      title: "Search",
      content: "Configure your store’s search settings.",
      placement: "bottom"
    },
    {
      element: ".fa-university",
      title: "Taxes",
      content: "Enable Custom taxes, Avalara, and TaxCloud taxes",
      placement: "bottom"
    }
  ]
});

tour.start();

welcome = {
  start: function () {
    tour.restart();
  },
  init: function () {
    tour.init();
  }
};
