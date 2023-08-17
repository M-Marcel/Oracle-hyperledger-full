/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
package config

/*
  Uncomment the line in the DeleteTransactionsInMonth map to enable the auto-delete-tansactions feature.
  Transactions are deleted on a monthly basis. For example, if the Value parameter is set to 3, then transactions older than 3 months are deleted every 24 hours.
  The auto-delete-transactions feature is disabled if the Value parameter is 0 or negative.
*/
var DeleteTransactionsInMonth = map[string]int{
	//"Value": 0,
}
