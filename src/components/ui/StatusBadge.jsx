export function StatusBadge({ status }) {
  const map = {
    // Application statuses — opaque tints work in light & dark
    Approved:         'bg-success/15 text-success ring-1 ring-success/25',
    Rejected:         'bg-danger/15 text-danger ring-1 ring-danger/25',
    'Under Review':   'bg-primary/15 text-primary ring-1 ring-primary/30',
    'Need Correction':'bg-warning/15 text-warning ring-1 ring-warning/30',
    Confirmed:        'bg-primary/15 text-primary ring-1 ring-primary/25',
    Pending:          'bg-muted text-text/70 ring-1 ring-border/60',

    // College/Entity statuses
    Active:           'bg-success/15 text-success ring-1 ring-success/25',
    Inactive:         'bg-muted text-text/70 ring-1 ring-border/60',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${map[status] || map.Pending}`}>
      {status}
    </span>
  );
}
