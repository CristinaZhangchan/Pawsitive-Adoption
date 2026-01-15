# 🔑 Supabase API 密钥问题解决方案

## ⚠️ 重要发现

您复制的密钥格式：
```
sb_publishable_k51AZpgnuCJjZo55kEAf4Q_nqkjdiyV
sb_secret_X3yjqZK_Cmh12BtV6giNpw_0FxZ3cWJ
```

**这些不是正确的 JWT 格式！** Supabase 可能更新了界面显示方式。

## ✅ 正确的密钥应该是什么样子

正确的 Supabase API 密钥是 **JWT (JSON Web Token)** 格式：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYWp5b3piZWN5cGtya3hzY2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDg2MzIsImV4cCI6MjA1MjYyNDYzMn0.xxxxxxxxxxxxxxxxxxxxxxxxx
```

**特征**：
- ✅ 以 `eyJ` 开头
- ✅ 包含两个点 `.` 分隔三部分
- ✅ 非常长（200-400 字符）

## 🔍 如何找到正确的 JWT 密钥

### 方法 1: 在 API Settings 页面查找 "JWT" 或 "Token"

1. 进入 Supabase 项目
2. Settings → API
3. **向下滚动**，查找标题为：
   - "Project API keys" 
   - "JWT Settings"
   - 或者有 "Reveal" 按钮的区域

4. 您应该看到类似这样的区域：

```
┌─────────────────────────────────────────┐
│ anon (public)                            │
│ [●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●] │
│ [Reveal] [Copy]                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ service_role (secret)                    │
│ [●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●] │
│ [Reveal] [Copy]                          │
└─────────────────────────────────────────┘
```

5. **点击 "Reveal"** 按钮显示完整密钥
6. **点击 "Copy"** 复制完整的 JWT token

### 方法 2: 使用 Supabase CLI

如果您安装了 Supabase CLI：

```bash
# 登录
supabase login

# 获取项目密钥
supabase projects api-keys --project-ref jkajyozbecypkrkxscil
```

### 方法 3: 检查项目设置的其他位置

有时密钥在不同的位置：

1. **Settings → API → Project API keys**
2. 查找 "Configuration" 或 "Connection string" 部分
3. 查找任何显示 JWT 格式的地方

## 🎯 临时解决方案：使用演示模式

如果您暂时找不到正确的密钥，可以先使用静态数据测试前端：

### 修改 `App.tsx` 使用静态数据

我可以帮您临时禁用 Supabase 连接，使用 `constants.tsx` 中的静态数据，这样您可以先看到界面。

## 📸 请提供截图

为了更好地帮助您，请提供以下截图：

1. **Supabase Dashboard → Settings → API** 的完整页面
2. 特别是 "Project API keys" 部分
3. 任何显示密钥的区域

您可以：
- 隐藏密钥的实际值（用马赛克遮挡）
- 但保留密钥的**开头几个字符**（如 `eyJ...`）
- 这样我可以确认格式是否正确

## 🔄 另一个可能的解决方案

Supabase 最近可能更新了 API 密钥系统。让我们尝试：

### 检查是否需要生成新的密钥

1. 在 Supabase Dashboard
2. Settings → API
3. 查找 "Generate new anon key" 或类似按钮
4. 或者查找 "Legacy keys" 或 "JWT tokens" 部分

## 💡 快速测试

让我们先确认 Supabase 项目本身是否正常：

```bash
# 测试 Supabase URL 是否可访问
curl https://jkajyozbecypkrkxscil.supabase.co

# 应该返回一些 JSON 响应
```

## 🆘 如果仍然找不到

如果您在 Supabase 界面中找不到 JWT 格式的密钥：

1. 这可能是 Supabase 的新版本界面
2. 请告诉我您看到的确切界面
3. 或者我们可以先使用静态数据模式运行应用

**您想要：**
- A) 继续寻找正确的 JWT 密钥？
- B) 先使用静态数据模式查看界面？
- C) 提供 Supabase 界面截图让我帮您定位？
