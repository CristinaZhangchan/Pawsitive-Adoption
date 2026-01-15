# 快速设置指南

## 🚀 5分钟快速启动

### 步骤 1: 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 创建新组织（如果需要）
4. 创建新项目：
   - 项目名称: `pawsitive-adoption`
   - 数据库密码: 设置一个强密码（保存好！）
   - 区域: 选择最近的区域
5. 等待项目初始化（约2分钟）

### 步骤 2: 获取 API 凭据

1. 在项目设置中，点击左侧菜单的 **Settings** → **API**
2. 复制以下信息：
   - **Project URL** (类似: `https://xxxxx.supabase.co`)
   - **anon public** key (以 `eyJ` 开头的长字符串)
   - **service_role** key (仅用于种子脚本，不要暴露给前端)

### 步骤 3: 配置环境变量

编辑 `.env.local` 文件（如果不存在，复制 `.env.example`）：

```env
GEMINI_API_KEY=your-gemini-api-key-here

VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 步骤 4: 运行数据库迁移

1. 在 Supabase 控制台中，点击左侧菜单的 **SQL Editor**
2. 点击 **New query**
3. 打开 `supabase/migrations/001_initial_schema.sql`
4. 复制所有内容并粘贴到 SQL Editor
5. 点击 **Run** 执行

✅ 成功后，你应该在 **Table Editor** 中看到7个新表

### 步骤 5: 创建存储桶

1. 在 Supabase 控制台中，点击左侧菜单的 **Storage**
2. 点击 **Create a new bucket**
3. 设置：
   - Name: `pet-images`
   - Public bucket: ✅ 勾选
4. 点击 **Create bucket**

### 步骤 6: 填充示例数据

在项目目录中运行：

```bash
npm run seed
```

✅ 成功后会显示：
- 创建的测试用户
- 创建的宠物数量
- 演示账户信息

### 步骤 7: 启动应用

```bash
npm run dev
```

访问 `http://localhost:3000`

## 🎯 测试账户

使用以下账户登录测试：

```
邮箱: demo@pawsitive.com
密码: demo123456
```

## ✅ 验证清单

- [ ] Supabase 项目已创建
- [ ] 环境变量已配置
- [ ] 数据库迁移已运行（7个表）
- [ ] 存储桶已创建
- [ ] 种子数据已填充
- [ ] 应用成功启动
- [ ] 可以使用演示账户登录

## 🐛 常见问题

### 问题: "Missing Supabase environment variables"

**解决**: 检查 `.env.local` 文件是否存在且包含正确的 URL 和密钥

### 问题: 数据库迁移失败

**解决**: 
1. 确保完整复制了 SQL 文件内容
2. 检查是否有语法错误
3. 尝试分段运行（先运行表创建，再运行策略）

### 问题: 种子脚本失败

**解决**:
1. 确保 `SUPABASE_SERVICE_KEY` 已设置
2. 检查数据库迁移是否成功
3. 查看错误消息了解具体问题

### 问题: 图片上传失败

**解决**:
1. 确认 `pet-images` 存储桶已创建
2. 确认存储桶设置为 Public
3. 检查存储桶策略

## 📚 下一步

设置完成后，你可以：

1. **浏览宠物** - 查看从数据库加载的宠物列表
2. **收藏宠物** - 测试收藏功能
3. **查看消息** - 查看示例对话
4. **编辑个人资料** - 更新用户信息

## 🔗 有用的链接

- [Supabase 文档](https://supabase.com/docs)
- [Supabase Auth 指南](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime 功能](https://supabase.com/docs/guides/realtime)

## 💡 提示

- 使用 Supabase Table Editor 可视化查看和编辑数据
- 使用 SQL Editor 运行自定义查询
- 在 Authentication 部分管理用户
- 在 Storage 部分查看上传的图片
