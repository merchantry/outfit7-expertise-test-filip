export function traverseParents(
  element: Element,
  callback: (el: Element) => void
): void {
  let el: Element | null = element;
  while (el && el.nodeType === Node.ELEMENT_NODE) {
    callback(el);
    el = el.parentElement;
  }
}

export function getElementUniqueKey(element: Element): string {
  const id = (element as HTMLElement).id || 'no-id';
  const classList = Array.from(element.classList).sort().join('.');
  const elementType = element.tagName.toLowerCase();
  return `[${id}]-[${classList}]-[${elementType}]`;
}
