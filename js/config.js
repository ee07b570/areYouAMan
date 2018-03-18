const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const PLAY_GROUD_RATIO = 0.6

export const PLAYER_GROUD_BOTTOM = screenHeight * PLAY_GROUD_RATIO
export const INIT_MISSILES_NUM = 20

export const PLANE_SPEED = 7
export const PLANE_WIDTH = 40
export const PLANE_HEIGHT = 40

export const MISSILE_WIDTH = 5
export const MISSILE_HEIGHT = 5
export const INIT_MISSILE_SPEED = 2
export const INIT_MISSILE_POSITION_SEED = 3.3 // 开始位置，必须为大于等于3的数字，如果大于3, 则子弹可能从中间出现
export const MISSILE_ENLARGE_MAX_FACTOR = 1.7 // 长宽放大的比例

export const SPONSOR_DADDY_WIDTH = 40
export const SPONSOR_DADDY_HEIGHT = 40
export const INIT_SPONSOR_DADDY_SPEED = 1.5
export const INIT_SPONSOR_DADDY_SEED = 3 // 开始位置，必须为大于等于3的数字，如果大于3, 则子弹可能从中间出现

export const HANDLER_BOTTOM_PADDIND = 30
export const HANDLER_BTN_WIDTH = 80
export const HANDLER_CLOSENESS = 1