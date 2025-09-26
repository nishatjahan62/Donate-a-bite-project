import React from "react";
import UseAuth from "../../../../Hooks/UseAuth";
import TransactionHistory from "../../TransactionHistory/TransactionHistory";
import UseUserRole from "../../../../Hooks/UseUserRole";
import Loading from "../../../Loading/Loading";

const UserTransactionHistory = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = UseUserRole();

  if (roleLoading) return <Loading />;

  return <TransactionHistory email={user?.email} role={role} />;
};

export default UserTransactionHistory;
