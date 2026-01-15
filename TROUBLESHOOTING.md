# 故障排除指南

## ❌ 错误: `crypto$2.getRandomValues is not a function`

### 问题原因

此错误是由于 Node.js 版本过低导致的。项目依赖要求 Node.js 18 或更高版本，但您当前使用的是 Node.js 16.20.2。

### 解决方案

#### 选项 1: 使用 nvm 升级 Node.js（推荐）

如果您已安装 nvm (Node Version Manager):

```bash
# 安装 Node.js 20
nvm install 20

# 使用 Node.js 20
nvm use 20

# 验证版本
node --version  # 应显示 v20.x.x

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 启动应用
npm run dev
```

#### 选项 2: 直接安装 Node.js 20

如果您没有 nvm:

1. **macOS (使用 Homebrew)**:
   ```bash
   brew install node@20
   ```

2. **从官网下载**:
   - 访问 [nodejs.org](https://nodejs.org/)
   - 下载并安装 LTS 版本 (20.x)

3. **安装后**:
   ```bash
   # 验证版本
   node --version
   
   # 重新安装依赖
   cd /Users/cristina/Desktop/pawsitive-adoption
   rm -rf node_modules package-lock.json
   npm install
   
   # 启动应用
   npm run dev
   ```

#### 选项 3: 安装 nvm（如果还没有）

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重启终端或运行
source ~/.zshrc  # 或 source ~/.bashrc

# 然后按照选项 1 的步骤操作
```

### 验证修复

运行以下命令确认问题已解决:

```bash
node --version  # 应该是 v18.x.x 或 v20.x.x
npm run dev     # 应该成功启动
```

---

## 其他常见问题

### 问题: "Missing Supabase environment variables"

**原因**: `.env.local` 文件缺失或配置不正确

**解决**:
```bash
# 复制示例文件
cp .env.example .env.local

# 编辑并添加您的 Supabase 凭据
# VITE_SUPABASE_URL=your-url
# VITE_SUPABASE_ANON_KEY=your-key
```

### 问题: 数据库连接失败

**原因**: Supabase 项目未设置或凭据错误

**解决**:
1. 确认 Supabase 项目已创建
2. 检查 `.env.local` 中的 URL 和密钥是否正确
3. 在 Supabase 控制台验证项目状态

### 问题: 种子脚本失败

**原因**: 数据库迁移未运行或 service key 缺失

**解决**:
1. 在 Supabase SQL Editor 中运行 `001_initial_schema.sql`
2. 确保 `.env.local` 中有 `SUPABASE_SERVICE_KEY`
3. 重新运行 `npm run seed`

### 问题: 端口 3000 已被占用

**原因**: 另一个应用正在使用端口 3000

**解决**:
```bash
# 选项 1: 停止占用端口的进程
lsof -ti:3000 | xargs kill -9

# 选项 2: 使用不同端口
# 编辑 vite.config.ts，修改 port: 3000 为其他端口
```

### 问题: 图片上传失败

**原因**: 存储桶未创建或权限设置错误

**解决**:
1. 在 Supabase Storage 中创建 `pet-images` 桶
2. 设置为 Public bucket
3. 检查存储策略是否允许上传

## 需要更多帮助？

如果问题仍未解决:

1. 检查浏览器控制台的错误信息
2. 查看终端的完整错误日志
3. 访问 [Supabase 文档](https://supabase.com/docs)
4. 在项目 GitHub 仓库创建 Issue
