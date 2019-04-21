/**
 * dom
 * @author guobin201314@gmail.com on 2019-04-17
 */

export function addClass(el: HTMLElement, className: string): void {
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ')
}

export function hasClass(el: HTMLElement, className: string): boolean {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className)
}

export function getData(el: any, name: string, val?: string) {
  const prefix = 'data-';
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

const elementStyle = document.createElement('div').style;

const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };
  for (const key in transformNames) {
    // @ts-ignore
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})();

export function prefixStyle(style: any) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
