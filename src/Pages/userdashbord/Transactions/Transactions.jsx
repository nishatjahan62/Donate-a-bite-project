import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const Transactions = () => {
  const { user } = UseAuth();
  const [transactions, setTransactions] = useState([]);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/transactions/${user.email}`).then(res => setTransactions(res.data));
  }, [user.email,axiosSecure]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td>{tx.transactionId}</td>
              <td>${tx.amount}</td>
              <td>{new Date(tx.date).toLocaleString()}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
