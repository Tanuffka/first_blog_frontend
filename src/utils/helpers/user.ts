export function getAcronyms(...parts: string[]): string {
  return parts
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function getFullname(...fullname: string[]): string {
  return fullname.join(' ').toUpperCase();
}
