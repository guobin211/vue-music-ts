/**
 * 获取refs dom属性
 * @param ref
 * @param attr
 */
export function getRefsAttr(ref: any, attr: string | string[]): object {
  const keys = getAttrKey(attr)
  let res = ref[keys[0]]
  for (let i = 1; i < keys.length; i++) {
    res = res[keys[i]]
  }
  return res
}

function getAttrKey(attr: string | string[]): string[] {
  const key: string = typeof attr === 'string' ? attr : attr.join('.')
  return key.split('.')
}

export function shuffle(arr: any[]) {
  let res = arr.slice()
  for (let i = 0; i < res.length; i++) {
    let j = getRandomInt(0, i)
    let t = res[i]
    res[i] = res[j]
    res[j] = t
  }
  return res
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
