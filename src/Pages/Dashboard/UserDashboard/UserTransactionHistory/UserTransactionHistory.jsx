import React from "react";
import UseAuth from "../../../../Hooks/UseAuth";
import TransactionHistory from "../../TransactionHistory/TransactionHistory";

const UserTransactionHistory = () => {
  const { user } = UseAuth();
  return <TransactionHistory email={user?.email} role="user" />;
};

export default UserTransactionHistory;
