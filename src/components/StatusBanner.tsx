interface StatusBannerProps {
  type: "error" | "success";
  message: string;
}

export function StatusBanner({ type, message }: StatusBannerProps) {
  return <p className={`status-banner ${type}`}>{message}</p>;
}
