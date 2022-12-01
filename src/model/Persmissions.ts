enum AccessLevel {
  ViewOnly = 'ViewOnly',
  Create = 'Create',
  Approve = 'Approve',
  Pay = 'Pay',
}

enum EntitiesRegular {
  WarehouseRequests = 'WarehouseRequests',
  PurchaseRequests = 'PurchaseRequests',
  RequestRorProposals = 'RequestForProposals',
  PurchaseOrders = 'PurchaseOrders',
  Receipts = 'Receipts',
  Invoices = 'Invoices',
  Expenses = 'Expenses',
}

enum EntitiesManagement {
  Configuration = 'Configuration',
  SuppliersAndItems = 'SuppliersAndItems',
  Budgets = 'Budgets',
  WarehouseManager = 'WarehouseManager',
  Reports = 'Reports',
  Admin = 'Admin',
}

export {
  AccessLevel,
  EntitiesRegular,
  EntitiesManagement,
};
