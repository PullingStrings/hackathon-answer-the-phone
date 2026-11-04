type Props = { message: string | null };
export default function ToastNotification({ message }: Props) {
  return (
    <div aria-live="polite" aria-atomic="true" className="toast-region">
      {message && (
        <div key={message} className="toast">
          <span className="toast__mark" aria-hidden="true">
            ✓
          </span>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
