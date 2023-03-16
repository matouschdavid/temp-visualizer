function tempToColor(temp, minTemp, maxTemp) {
  //below 0 is blue, above 0 is red
  const tempRange = maxTemp - minTemp;
  const tempOffset = temp - minTemp;
  const tempRatio = tempOffset / tempRange;
  const red = Math.round(255 * tempRatio);
  const blue = Math.round(255 * (1 - tempRatio));
  return "rgba(" + red + ", 0, " + blue + ", 0.3)";
}

export default tempToColor;
