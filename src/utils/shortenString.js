export default function shortenString(string, maxLength) {
  if (string.length <= maxLength) return string;
  return string.slice(0, maxLength - 3) + "...";
}
