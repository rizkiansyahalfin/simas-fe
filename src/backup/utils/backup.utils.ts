export const formatBytes = (bytes: number): string => {
  if (!bytes) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat(
    (bytes / Math.pow(k, i)).toFixed(2),
  )} ${sizes[i]}`;
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};