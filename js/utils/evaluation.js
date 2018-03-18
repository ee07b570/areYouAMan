export function evaluate(duration) {
  if (duration > 100 * 1000) {
    return { text: '你是外星人吗？', offset: 44 } // offset 是渲染的偏移量，取字数*8, 如果最后一个是标点，建议按照4计算
  }
  if (duration > 25 * 1000) {
    return { text: '卍解', offset: 16 }
  }
  if (duration > 23 * 1000) {
    return { text: '你来自复仇者联盟吗？', offset: 76 }
  }
  if (duration > 20 * 1000) {
    return { text: '看来你是真汉子！', offset: 60 }
  }
  if (duration > 19 * 1000) {
    return { text: '你离男人只差1秒？', offset: 64 }
  }
  if (duration > 17 * 1000) {
    return { text: '你是吃了金坷垃吗？', offset: 68 }
  }
  if (duration > 15 * 1000) {
    return { text: '时代在召唤你！', offset: 52 }
  }
  if (duration > 13 * 1000) {
    return { text: '坚持就是胜利！', offset: 52 }
  }
  if (duration > 11 * 1000) {
    return { text: '黄金剩斗士！', offset: 42 }
  }
  if (duration > 9 * 1000) {
    return { text: '白银剩斗士！', offset: 42 }
  }
  if (duration > 7 * 1000) {
    return { text: '青铜剩斗士！', offset: 42 }
  }
  if (duration > 5 * 1000) {
    return { text: '黑铁剩斗士！', offset: 42 }
  }
  if (duration > 4 * 1000) {
    return { text: '同志仍需努力！', offset: 52 }
  }
  if (duration > 3 * 1000) {
    return { text: '革命尚未成功！', offset: 52 }
  }
  if (duration > 2 * 1000) {
    return { text: '请你认真一点！', offset: 52 }
  }
  return { text: '你是闪电侠你媳妇知道吗？', offset: 92 }
}