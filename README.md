# Pawsitive Adoption - 宠物领养平台

一个功能完整的宠物领养全栈应用，使用 React + Supabase 构建。

## 功能特性

- 🐾 **宠物浏览** - 浏览和搜索可领养的宠物
- ❤️ **收藏功能** - 收藏喜欢的宠物
- 📝 **申请系统** - 提交领养、寄养和转让申请
- 💬 **实时聊天** - 与收容所或宠物主人实时沟通
- 🔐 **用户认证** - 安全的用户注册和登录
- 📸 **图片上传** - 上传宠物照片
- 🌍 **多语言支持** - 支持中文、英文和瑞典语

## 技术栈

### 前端
- React 19
- TypeScript
- Vite
- Tailwind CSS (通过内联样式)

### 后端
- Supabase (PostgreSQL 数据库)
- Supabase Auth (用户认证)
- Supabase Storage (文件存储)
- Supabase Realtime (实时消息)

### AI 功能
- Google Gemini API (宠物描述生成)

## 快速开始

### 前置要求

- Node.js 18+ (推荐使用 Node.js 20+)
- npm 或 yarn
- Supabase 账户

### 1. 克隆项目

```bash
git clone <repository-url>
cd pawsitive-adoption
```

### 2. 安装依赖

```bash
npm install
```

### 3. 设置 Supabase

#### 3.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 等待项目初始化完成

#### 3.2 运行数据库迁移

1. 在 Supabase 控制台中，进入 **SQL Editor**
2. 复制 `supabase/migrations/001_initial_schema.sql` 的内容
3. 粘贴并运行 SQL 脚本

#### 3.3 创建存储桶

1. 在 Supabase 控制台中，进入 **Storage**
2. 创建一个名为 `pet-images` 的公开存储桶
3. 设置以下策略：
   - 允许所有人读取
   - 允许认证用户上传

### 4. 配置环境变量

复制 `.env.example` 到 `.env.local`:

```bash
cp .env.example .env.local
```

编辑 `.env.local` 并填入你的凭据:

```env
# Gemini API Key (可选，用于 AI 生成宠物描述)
GEMINI_API_KEY=your-gemini-api-key

# Supabase 配置
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# 仅用于种子数据脚本
SUPABASE_SERVICE_KEY=your-service-role-key
```

**获取 Supabase 凭据:**
1. 在 Supabase 项目设置中
2. 进入 **API** 部分
3. 复制 **Project URL** 和 **anon public** key

### 5. 填充初始数据

运行种子脚本来填充示例数据:

```bash
npm run seed
```

这将创建:
- 测试用户账户
- 示例宠物
- 演示对话

**演示账户:**
- 邮箱: `demo@pawsitive.com`
- 密码: `demo123456`

### 6. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 运行

## 项目结构

```
pawsitive-adoption/
├── services/              # 后端服务层
│   ├── supabaseClient.ts  # Supabase 客户端配置
│   ├── authService.ts     # 认证服务
│   ├── petsService.ts     # 宠物 CRUD 操作
│   ├── favoritesService.ts # 收藏功能
│   ├── applicationsService.ts # 申请管理
│   ├── messagesService.ts # 聊天和消息
│   ├── storageService.ts  # 文件上传
│   └── geminiService.ts   # AI 描述生成
├── screens/               # 应用页面
│   ├── WelcomeScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ListingsScreen.tsx
│   ├── DetailsScreen.tsx
│   ├── ApplicationFormScreen.tsx
│   ├── MessagesScreen.tsx
│   ├── ChatScreen.tsx
│   ├── ProfileScreen.tsx
│   └── ServicesScreen.tsx
├── components/            # 可复用组件
│   └── NavBar.tsx
├── supabase/
│   └── migrations/        # 数据库迁移文件
│       └── 001_initial_schema.sql
├── scripts/
│   └── seed-data.ts       # 数据库种子脚本
├── types.ts               # TypeScript 类型定义
├── constants.tsx          # 常量和静态数据
├── translations.ts        # 多语言翻译
└── App.tsx                # 主应用组件
```

## 数据库架构

### 核心表

- **profiles** - 用户配置文件
- **pets** - 宠物信息
- **pet_images** - 宠物图片
- **favorites** - 用户收藏
- **applications** - 领养/寄养/转让申请
- **conversations** - 对话
- **messages** - 聊天消息

### 安全性

- 所有表都启用了 Row Level Security (RLS)
- 用户只能访问自己的数据
- 宠物列表对所有人公开
- 消息仅对对话参与者可见

## API 服务

### 认证服务 (`authService.ts`)
- 用户注册和登录
- OAuth 登录 (Google, GitHub)
- 密码重置
- 个人资料管理

### 宠物服务 (`petsService.ts`)
- 获取宠物列表（支持筛选和分页）
- 获取单个宠物详情
- 创建/更新/删除宠物

### 收藏服务 (`favoritesService.ts`)
- 添加/移除收藏
- 获取用户收藏列表
- 检查收藏状态

### 申请服务 (`applicationsService.ts`)
- 提交领养申请
- 提交寄养注册
- 提交转让申请
- 查看申请历史

### 消息服务 (`messagesService.ts`)
- 创建对话
- 发送/接收消息
- 实时消息订阅
- 标记消息为已读

### 存储服务 (`storageService.ts`)
- 上传图片
- 图片压缩
- 删除文件

## 开发指南

### 运行开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 重新填充数据库

```bash
npm run seed
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 添加环境变量:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY` (可选)
4. 部署

### Netlify 部署

1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. 构建命令: `npm run build`
4. 发布目录: `dist`
5. 添加环境变量

## 故障排除

### Supabase 连接错误

确保:
- `.env.local` 中的 URL 和密钥正确
- Supabase 项目正在运行
- 数据库迁移已执行

### 认证问题

- 检查 Supabase Auth 设置
- 确认邮箱确认设置
- 验证 RLS 策略

### 实时消息不工作

- 确保 Supabase Realtime 已启用
- 检查浏览器控制台错误
- 验证 WebSocket 连接

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

MIT License

## 支持

如有问题，请创建 GitHub Issue 或联系支持团队。
