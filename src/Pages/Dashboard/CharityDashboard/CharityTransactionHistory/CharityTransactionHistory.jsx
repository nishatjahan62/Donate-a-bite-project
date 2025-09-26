import React from "react";
import TransactionHistory from "../../TransactionHistory/TransactionHistory";
import UseAuth from "../../../../Hooks/UseAuth";
import UseUserRole from "../../../../Hooks/UseUserRole";
import Loading from "../../../Loading/Loading";

const CharityTransactionHistory = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = UseUserRole();

  if (roleLoading) return <Loading />;

  return (
    <div>
      <TransactionHistory email={user?.email} role={role} />
    </div>
  );
};

export default CharityTransactionHistory;
