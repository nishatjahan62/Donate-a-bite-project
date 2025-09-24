import React from "react";
import TransactionHistory from "../../TransactionHistory/TransactionHistory";
import UseAuth from "../../../../Hooks/UseAuth";

const CharityTransactionHistory = () => {
  const { user } = UseAuth();
  return (
    <div>
       <TransactionHistory email={user?.email} role="user" />;
    </div>
  );
};

export default CharityTransactionHistory;
