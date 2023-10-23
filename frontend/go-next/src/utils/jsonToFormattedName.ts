export default function jsonToFormattedName(inputName: string) {
  const nameWithoutExtension = inputName.replace('.json', ''); // Remove the '.json' extension
  const parts = nameWithoutExtension.split('_'); // Split the string by underscores

  // Capitalize the first letter of each part and join them with a space
  const formattedName = parts
    .map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');

  return formattedName;
}
