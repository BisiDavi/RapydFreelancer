function getFirstLetter(word: string) {
  const letter = word?.split("")[0];
  return letter;
}

export default function getUserInitials(name: string) {
  let displayNameInitials;
  const nameArray = name.split(" ");
  const firstLetter = getFirstLetter(nameArray[0]);
  const secondLetter = getFirstLetter(nameArray[1]);
  displayNameInitials = `${firstLetter}.${secondLetter}`;

  return displayNameInitials;
}
