const tour = new Tour({
  name: "tour",
  storage: window.localStorage,
  steps: [
    {
      element: "#welcome",
      title: "Welcome Note",
      content: `This tour will give you a guided assistance on how to
      use this application as a seller.`
    },
    {
      element: "",
      title: "Settings",
      content: `Reaction configuration; Here you configure your
      shop’s name, address, payment methods, and other settings. `
    },
    {
      element: "",
      title: "Accounts",
      content: `Add, edit, and remove permissions for
      each of your shop members.`
    },
    {
      element: "",
      title: "Email",
      content: "Configure the email type you want to be connected to your store"
    },
    {
      element: "",
      title: "Orders",
      content: "Review and process orders."
    },
    {
      element: "",
      title: "Shipping",
      content: "Set up and manage your shipping and handling rates."
    },
    {
      element: "",
      title: "Catalog",
      content: "Enable or disable your product catalog view."
    },
    {
      element: "",
      title: "Search",
      content: "Configure your store’s search settings."
    },
    {
      element: "",
      title: "Revisions",
      content: `Here the ability for admin users to review, stage,
      and revert changes to products.`
    },
    {
      element: "",
      title: "Taxes",
      content: "Enable Custom taxes, Avalara, and TaxCloud taxes"
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
