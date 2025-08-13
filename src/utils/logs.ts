export function getElementHtmlFromKey(key: string) {
  const [id, classList, elementType] = key
    .split(']-[')
    .map(item => item.replace(/[[\]]/g, ''));

  const element = {
    id,
    classList: classList.split('.').join(' '),
    elementType,
  };

  return `<${element.elementType} id="${element.id}" class="${element.classList}" />`;
}
