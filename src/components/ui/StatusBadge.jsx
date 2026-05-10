
export function StatusBadge({ status }) {
  const map = {
    // Application statuses
    Approved:         'bg-green-100 text-green-700',
    Rejected:         'bg-red-100 text-red-700',
    'Under Review':   'bg-blue-100 text-blue-700',
    'Need Correction':'bg-yellow-100 text-yellow-700',
    Confirmed:        'bg-indigo-100 text-indigo-700',
    Pending:          'bg-gray-100 text-gray-600',
    
    // College/Entity statuses
    Active:           'bg-green-100 text-green-700',
    Inactive:         'bg-gray-100 text-gray-600',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${map[status] || map.Pending}`}>
      {status}
    </span>
  );
}
