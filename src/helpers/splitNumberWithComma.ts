export const splitNumberWithComma = (num: number): string => {
  let numStr: string = num.toString()

  const parts: string[] = []
  while (numStr.length > 3) {
    parts.unshift(numStr.slice(-3))
    numStr = numStr.slice(0, -3)
  }
  parts.unshift(numStr)

  return parts.join(",")
}
