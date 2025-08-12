export function getAcronyms(...parts: string[]): string {
  return parts
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function getFullName(firstname: string, lastname: string): string {
  return `${firstname} ${lastname}`;
}
