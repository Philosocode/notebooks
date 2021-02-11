export function snakeCaseToTitleCase(text: string) {
  return text
    .split("-")
    .map(w => w[0].toUpperCase() + w.substr(1))
    .join(" ");
}

export function trimString(text: string, length: number) {
  if (text.length < length) return text;

  return text.substring(0, length) + "...";
}