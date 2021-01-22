export function snakeCaseToTitleCase(text: string) {
  return text
    .split("-")
    .map(w => w[0].toUpperCase() + w.substr(1))
    .join(" ");
}
