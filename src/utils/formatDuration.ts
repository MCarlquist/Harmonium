export function formatDuration(duration?: number) {
  if (duration === undefined) return "—";

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
