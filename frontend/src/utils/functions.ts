export function timeAgo(dateString: string): string {
  const now = new Date();
  const pastDate = new Date(dateString);

  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const intervals = [
    { label: "second", duration: 60 },
    { label: "minute", duration: 60 },
    { label: "hour", duration: 24 },
    { label: "day", duration: 30 },
    { label: "month", duration: 12 },
    { label: "year", duration: Infinity },
  ];

  let intervalIndex = 0;
  let intervalDuration = intervals[intervalIndex].duration;
  let count = diffInSeconds;

  while (count >= intervalDuration && intervalIndex < intervals.length - 1) {
    count /= intervalDuration;
    intervalIndex++;
    intervalDuration = intervals[intervalIndex].duration;
  }

  count = Math.floor(count);

  return count === 1
    ? `${count} ${intervals[intervalIndex].label} ago`
    : `${count} ${intervals[intervalIndex].label}s ago`;
}
