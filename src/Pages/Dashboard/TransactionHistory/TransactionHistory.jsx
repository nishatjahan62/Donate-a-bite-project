import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const TransactionHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/transactions/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;
  if (transactions.length === 0)
    return <p className="p-5">No transactions found.</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount Paid</th>
              <th>Request Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id}>
                <td>{txn.transactionId}</td>
                <td>${txn.amount}</td>
                <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
                <td>{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
