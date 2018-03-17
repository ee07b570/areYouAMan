export function evaluate(duration) {
  if (duration > 100 * 1000) {
    return { text: '你是外星人吗？', offset: 44 } // offset 是渲染的偏移量，取字数*8, 如果最后一个是标点，建议按照4计算
  }
  if (duration > 90 * 1000) {
    return { text: '卍解', offset: 16 }
  }
  if (duration > 20 * 1000) {
    return { text: '看来你是真男人！', offset: 60 }
  }
  return { text: '你是闪电侠你媳妇知道吗？', offset: 92 }
}