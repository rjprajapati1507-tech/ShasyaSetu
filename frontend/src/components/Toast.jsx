export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="toast show">
      <span>{toast.icon || '✅'}</span>
      <span>{toast.message}</span>
    </div>
  );
}
