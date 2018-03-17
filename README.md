## quickstart

## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── utils                                  // 工具
│   ├── evaluation.js                      // 评分文案生成工具
├── handler
│   └── handlerBtn.js                      // 按钮类
│   └── index.js                           // 手柄
├── npc
│   └── missile.js                         // 子弹类
├── plane
│   ├── index.js                           // 飞机类
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── config.js                              // 全局配置常量
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```