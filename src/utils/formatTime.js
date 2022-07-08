export default function formatTime(seconds) {
  let exactSeconds = Math.floor(seconds);
  let min = Math.floor(exactSeconds / 60);
  let sec = exactSeconds % 60;
  console.log(min, sec);
  return min + ":" + ("0" + sec).slice(-2);
}
