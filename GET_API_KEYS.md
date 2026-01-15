# ⚠️ 密钥配置错误 - 快速修复指南

## 🔴 当前问题

您的 `.env.local` 文件中的密钥**格式不正确**：

```env
❌ 错误配置：
VITE_SUPABASE_ANON_KEY=sb_publishable_GmD0CgyPEuPGUw3qykdo3g_2e5XfTK6
SUPABASE_SERVICE_KEY=SUPABASE_SERVICE_KEYq
```

## ✅ 正确的密钥格式

Supabase 的密钥应该是**很长的 JWT token**，看起来像这样：

```env
✅ 正确格式：
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYWp5b3piZWN5cGtya3hzY2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDg2MzIsImV4cCI6MjA1MjYyNDYzMn0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYWp5b3piZWN5cGtya3hzY2lsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzA0ODYzMiwiZXhwIjoyMDUyNjI0NjMyfQ.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

**特征**：
- 以 `eyJ` 开头
- 包含两个点 `.`
- 非常长（通常 200-300 字符）
- 由三部分组成：header.payload.signature

## 📸 如何在 Supabase 找到正确的密钥

### 步骤 1: 登录 Supabase
访问：https://supabase.com/dashboard

### 步骤 2: 进入 API 设置
```
您的项目 → Settings (⚙️) → API
```

### 步骤 3: 找到密钥区域

在页面中找到 **"Project API keys"** 部分，您会看到：

```
┌──────────────────────────────────────────────────────┐
│ Project URL                                           │
│ https://jkajyozbecypkrkxscil.supabase.co            │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ anon                                                  │
│ public                                                │
│                                                       │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...    │
│                                                       │
│ [Copy] [Reveal]                                      │
│                                                       │
│ This key is safe to use in a browser if you have     │
│ enabled Row Level Security for your tables and       │
│ configured policies.                                  │
└──────────────────────────────────────────────────────┘
    ↑↑↑ 这是 VITE_SUPABASE_ANON_KEY

┌──────────────────────────────────────────────────────┐
│ service_role                                          │
│ secret                                                │
│                                                       │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...    │
│                                                       │
│ [Copy] [Reveal]                                      │
│                                                       │
│ ⚠️ This key has the ability to bypass Row Level      │
│ Security. Never share it publicly.                    │
└──────────────────────────────────────────────────────┘
    ↑↑↑ 这是 SUPABASE_SERVICE_KEY
```

### 步骤 4: 复制密钥

1. 点击 **anon** 密钥旁边的 **[Copy]** 按钮
2. 粘贴到 `.env.local` 的 `VITE_SUPABASE_ANON_KEY=` 后面
3. 点击 **service_role** 密钥旁边的 **[Copy]** 按钮
4. 粘贴到 `.env.local` 的 `SUPABASE_SERVICE_KEY=` 后面

## 🎯 完整的 .env.local 示例

```env
VITE_SUPABASE_URL=https://jkajyozbecypkrkxscil.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYWp5b3piZWN5cGtya3hzY2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDg2MzIsImV4cCI6MjA1MjYyNDYzMn0.你的实际anon密钥
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYWp5b3piZWN5cGtya3hzY2lsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzA0ODYzMiwiZXhwIjoyMDUyNjI0NjMyfQ.你的实际service密钥
```

## ⚡ 快速检查清单

配置正确后，您的 `.env.local` 应该满足：

- [ ] `VITE_SUPABASE_URL` 以 `https://` 开头，以 `.supabase.co` 结尾
- [ ] `VITE_SUPABASE_ANON_KEY` 以 `eyJ` 开头，长度超过 200 字符
- [ ] `SUPABASE_SERVICE_KEY` 以 `eyJ` 开头，长度超过 200 字符
- [ ] 没有多余的空格或引号
- [ ] 每个密钥都在一行上

## 🔄 配置后的步骤

1. **保存** `.env.local` 文件
2. Vite 会自动检测到变化并重启服务器
3. **刷新浏览器** (Cmd+R 或 Ctrl+R)
4. 页面应该显示 Welcome Screen

## 🐛 仍然不显示？

如果配置正确后页面仍然空白：

1. **打开浏览器开发者工具**
   - Mac: `Cmd + Option + I`
   - Windows: `F12`

2. **查看 Console 标签**
   - 查找红色错误信息
   - 截图发给我

3. **检查 Network 标签**
   - 刷新页面
   - 查看是否有失败的请求（红色）
   - 截图发给我

## 💡 提示

- 密钥很长是正常的！
- 不要在密钥前后加引号
- 确保每个密钥都在单独一行
- 密钥中的点 `.` 是正常的，不要删除
