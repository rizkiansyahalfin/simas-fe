// RecentTransactionsTable.tsx
export default function RecentTransactionsTable({
  data,
}: any) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th>Tanggal</th>
            <th>Keterangan</th>
            <th>Tipe</th>
            <th>Nominal</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td>
                Rp {item.amount.toLocaleString('id-ID')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}