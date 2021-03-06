var stylesheet = null;

export default function getGlobalStyleSheet() {
  if (!stylesheet) {
    stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    var head = document.querySelector('head');
    head.insertBefore(stylesheet, head.firstChild);
  }

  return stylesheet;
}
