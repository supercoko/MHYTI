# MITI

MITI 全称 `miHoYo Type Indicator`，是一个参考 `MBTI / ACGTI` 结构重做的米哈游角色人格测试站。

项目是纯前端实现：用户回答 32 道米游玩家场景题，系统先计算 MBTI 四维倾向，再结合 8 个叙事原型与角色向量，命中最像你的米哈游角色。

## 项目特点

- 纯前端运行，无后端、无账号、无数据上传
- 使用 `Vue 3 + TypeScript + Vite` 构建，适合静态部署
- 完整内容站结构：首页、答题页、结果页、角色图鉴页、关于页
- 32 道题、8 个原型、32 位首发角色，覆盖：
  - 原神
  - 崩坏：星穹铁道
  - 崩坏3
  - 绝区零
- 本地 `localStorage` 持久化，刷新后可以继续答题或查看结果
- 使用 `Vitest` 覆盖评分引擎与结果页路由守卫

## 技术栈

- Vue 3
- Vue Router
- TypeScript
- Vite
- Vitest
- jsdom

## 页面结构

- `/`
  - 项目介绍
  - 测试流程说明
  - 游戏范围与免责声明
- `/quiz`
  - 32 道七级量表题
  - 进度条
  - 上一题 / 下一题 / 重新开始
- `/result`
  - 主命中角色
  - MBTI 四维 trait bar
  - 原型说明
  - Top 3 近邻角色
- `/characters`
  - 按游戏筛选
  - 按 MBTI 筛选
- `/about`
  - 评分逻辑
  - 项目定位
  - 素材与声明

## 评分逻辑

MITI 不是简单的“16 型人格直接对号入座”，而是混合匹配：

1. 用户完成 32 道题。
2. 计算四个维度的倾向：
   - `E / I`
   - `S / N`
   - `T / F`
   - `J / P`
3. 根据题目权重累计 8 个原型分数。
4. 根据原型向量生成用户气质向量。
5. 对角色进行综合排序，权重如下：
   - MBTI：`0.25`
   - 原型：`0.35`
   - 角色向量：`0.30`
   - 角色签名偏好：`0.10`

核心实现见：

- [src/utils/quizEngine.ts](./src/utils/quizEngine.ts)
- [src/data/questions.json](./src/data/questions.json)
- [src/data/archetypes.json](./src/data/archetypes.json)
- [src/data/characters.ts](./src/data/characters.ts)

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

运行测试：

```bash
npm run test
```

构建生产版本：

```bash
npm run build
```

预览构建产物：

```bash
npm run preview
```

## 已验证

当前版本已经验证：

- `npm run test` 通过
- `npm run build` 通过

测试覆盖包括：

- 中立答案下结果稳定、可重复
- 单维极端作答时对应 MBTI 字母翻转正确
- 同一 MBTI 下，角色向量不同会改变角色命中，但不会改掉四维条
- 无缓存时访问 `/result` 会重定向到 `/quiz`

## 项目结构

```text
src/
├─ components/      # UI 组件
├─ composables/     # 组合式逻辑
├─ data/            # 题库、原型、角色数据
├─ pages/           # 页面级组件
├─ router/          # 路由与守卫
├─ types/           # 类型定义
├─ utils/           # 评分引擎、存储、角色图回退逻辑
├─ App.vue
├─ main.ts
└─ style.css
```

## 素材说明

当前版本的角色图已切换为公开可访问的真实角色立绘链接，并保留本地回退卡面：

- 原神：使用 `Enka.Network` 的角色祈愿图资源
- 崩坏：星穹铁道：使用 `Mar-7th/StarRailRes` 的公开角色立绘资源
- 崩坏3 / 绝区零：使用公开 Wiki 可访问的角色主图或立绘资源

如果外部图片链接失效，前端会自动回退到项目内生成的风格化角色卡图，避免页面出现空白图块。

如需后续改为本地打包资源，优先调整：

- [src/data/characters.ts](./src/data/characters.ts)
- [src/utils/characterArt.ts](./src/utils/characterArt.ts)
- [src/components/CharacterCard.vue](./src/components/CharacterCard.vue)

## 免责声明

- 本项目仅供同人娱乐与前端练习使用
- 测试结果不构成心理学、医学或职业建议
- 角色对应关系基于公开剧情印象、玩家语境与娱乐化重构，不代表官方人格设定
- 角色图片版权归对应作品与权利方所有，项目仅做非商业展示

## 致谢

- 结构灵感参考 `MBTI / 16Personalities` 风格测评站
- 产品方向参考开源项目 `ACGTI`
