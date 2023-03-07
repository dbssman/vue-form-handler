export default (element: HTMLElement) =>
  ['input', 'select', 'textarea'].includes(element.nodeName?.toLowerCase())
