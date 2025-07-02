import React, { useEffect, useState } from 'react';

type Transaction = {
  id: string;
  sku: string;
  date: string;
  price: string;
};

export const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập API call (delay 1s)
    setTimeout(() => {
      const mockData: Transaction[] = [
        { id: '#44192', sku: 'Pro 1 Month', date: 'Aug 2nd', price: '$9.75' },
        { id: '#43124', sku: 'Pro 3 Month', date: 'Aug 2nd', price: '$21.25' },
        { id: '#41912', sku: 'Pro 1 Year', date: 'Aug 1st', price: '$94.75' },
        { id: '#39102', sku: 'Pro 1 Month', date: 'Aug 1st', price: '$9.23' },
      ];
      setTransactions(mockData);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold mb-4">Recent Transactions</h2>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500">
            <tr>
              <th className="pb-2">Customer ID</th>
              <th className="pb-2">SKU</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr className="border-t" key={tx.id}>
                <td className="py-2 text-violet-500">{tx.id}</td>
                <td>{tx.sku}</td>
                <td>{tx.date}</td>
                <td>{tx.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
