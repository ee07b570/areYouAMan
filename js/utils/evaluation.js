export function evaluate(duration) {
  if (duration > 90 * 1000) {
    return { text: '你是外星人吗？', offset: 44 } // offset 是渲染的偏移量，取字数*8, 如果最后一个是标点，建议按照4计算
  }
  if (duration > 60 * 1000) {
    return { text: '超越人类极限？！', offset: 56 }
  }
  if (duration > 55 * 1000) {
    return { text: '你来自复仇者联盟吗？', offset: 76 }
  }
  if (duration > 50 * 1000) {
    return { text: '黄金剩斗士！', offset: 42 }
  }
  if (duration > 45 * 1000) {
    return { text: '卍解', offset: 16 }
  }
  if (duration > 40 * 1000) {
    return { text: '白银剩斗士！', offset: 42 }
  }
  if (duration > 35 * 1000) {
    return { text: '时代在召唤你！', offset: 52 }
  }
  if (duration > 30 * 1000) {
    return { text: '青铜剩斗士！', offset: 42 }
  }
  if (duration > 25 * 1000) {
    return { text: '你是吃了金坷垃吗？', offset: 68 }
  }
  if (duration > 20 * 1000) {
    return { text: '坚持就是胜利！', offset: 52 }
  }
  if (duration > 15 * 1000) {
    return { text: '黑铁剩斗士！', offset: 42 }
  }
  if (duration > 10 * 1000) {
    return { text: '同志仍需努力！', offset: 52 }
  }
  if (duration > 5 * 1000) {
    return { text: '革命尚未成功！', offset: 52 }
  }
  if (duration > 2 * 1000) {
    return { text: '请你认真一点！', offset: 52 }
  }
  return { text: '你是闪电侠你媳妇知道吗？', offset: 92 }
}