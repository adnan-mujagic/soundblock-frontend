export default function getColorFromString(string) {
  let total = 0;
  for (let i = 0; i < string.length; i++) {
    total += string.charCodeAt(i);
  }
  const colorPallete = ["cc7829", "fa7b05", "8ed444", "608cb5", "9568c4"];

  return `#${colorPallete[total % colorPallete.length]}`;
}
