export default function dateToGreeting() {
  const hour = new Date().getUTCHours();
  if (hour > 2 && hour < 12) {
    return "morning";
  } else if (hour > 12 && hour < 6) {
    return "afternoon";
  }
  return "evening";
}
