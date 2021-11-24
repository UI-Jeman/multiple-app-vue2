export default function findNodeOne(menu, targetMenus) {
  targetMenus = [...targetMenus]
  let res

  for (let i = 0; i < targetMenus.length; i++) {
    const item = targetMenus[i]

    if (item.code == menu.code) {
      res = item
      break
    }

    if (item.children) {
      res = findNodeOne(menu, item.children)
      if (res) break
    }
  }

  return res
}
