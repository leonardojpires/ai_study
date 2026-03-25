interface StatusBannerProps {
  type: "error" | "success";
  message: string;
}

export function StatusBanner({ type, message }: StatusBannerProps) {
  const sanitized = String(message).replace(/<[^>]*>/g, '');
  const short = sanitized.length > 400 ? sanitized.slice(0, 400) + '…' : sanitized;
  return <p className={`status-banner ${type}`}>{short}</p>;
}
