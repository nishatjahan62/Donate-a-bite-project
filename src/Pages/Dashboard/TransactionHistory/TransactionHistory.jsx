import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../Loading/Loading";

const TransactionHistory = ({ email, role }) => {
  const axiosSecure = UseAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    axiosSecure
      .get(`/transactions/${email}`)
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [email, axiosSecure]);

  if (loading) return <Loading />;

  if (transactions.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary">
          Transaction History
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-center">
          No transactions found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">
        {role === "charity"
          ? "Charity Transaction History"
          : "My Transaction History"}
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-center">
              <th className="border px-4 py-2 dark:border-gray-700 dark:text-gray-200">
                Transaction ID
              </th>
              <th className="border px-4 py-2 dark:border-gray-700 dark:text-gray-200">
                Amount ($)
              </th>
              <th className="border px-4 py-2 dark:border-gray-700 dark:text-gray-200">
                Purpose
              </th>
              <th className="border px-4 py-2 dark:border-gray-700 dark:text-gray-200">
                Request Status
              </th>
              <th className="border px-4 py-2 dark:border-gray-700 dark:text-gray-200">
                Request Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx._id}
                className="text-center bg-white dark:bg-gray-900"
              >
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                  {tx.transactionId}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                  {tx.amount}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                  {tx.purpose}
                </td>
                <td
                  className={`border px-4 py-2 font-semibold dark:border-gray-700 ${
                    tx.requestStatus === "Approved"
                      ? "text-green-600"
                      : tx.requestStatus === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {tx.requestStatus}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
