import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Actionable Analytics",
  name: "actionable-analytics",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  settings: {
    name: "Actionable Analytics"
  },
  registry: [{
    route: "/dashboard/actionable-analytics",
    provides: "dashboard",
    workflow: "coreDashboardWorkflow",
    name: "actionable-analytics",
    label: "Actionable Analytics",
    description: "View results of data driven analysis about stores and products",
    icon: "fa fa-bar-chart",
    container: "core",
    priority: 4,
    template: "actionableAnalytics"
  }, {
    route: "/dashboard/actionable-analytics",
    name: "/dashboard/actionable-analytics",
    provides: "shortcut",
    label: "Actionable Analytics",
    description: "View results of data driven analysis about stores and products",
    icon: "fa fa-bar-chart",
    priority: 4
  }]
});
