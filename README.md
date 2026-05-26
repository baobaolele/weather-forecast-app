# 智能天气预报

一个使用 Vue 3、Vite、TypeScript、ECharts 和 Open-Meteo API 构建的智能天气预报网站。

## 功能

- 默认展示 Dalian 天气
- 城市搜索和当前位置定位
- 当前天气、未来 24 小时、未来 7 天天气
- 温度、降雨概率、风速趋势图
- 气象云图
- 自动生成天气趋势分析和生活建议
- 手机端响应式布局，小时预报支持横向滚动

## 本地运行

```powershell
npm install
npm run dev
```

默认访问：

```text
http://localhost:5173/
```

同一局域网内的手机可以访问终端显示的 `Network` 地址，例如：

```text
http://192.168.x.x:5173/
```

如果手机打不开，请确认电脑和手机在同一网络，并允许 Windows 防火墙放行 Node.js。

## 构建公网版本

```powershell
npm run build
```

构建产物会生成在：

```text
dist/
```

构建后可本地预览：

```powershell
npm run preview
```

默认预览地址：

```text
http://localhost:4173/
```

## 部署到公网

推荐部署到 Vercel、Netlify 或 Cloudflare Pages。这是纯前端静态项目，不需要后端服务器。

### Vercel

1. 将项目推送到 GitHub。
2. 在 Vercel 导入该仓库。
3. 使用以下配置：

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

项目已包含 `vercel.json`，部署后可直接通过 Vercel 分配的 HTTPS 域名访问。

### Netlify

1. 将项目推送到 GitHub。
2. 在 Netlify 导入该仓库。
3. 使用以下配置：

```text
Build Command: npm run build
Publish Directory: dist
```

项目已包含 `netlify.toml`。

### Cloudflare Pages

1. 将项目推送到 GitHub。
2. 在 Cloudflare Pages 创建项目并连接仓库。
3. 使用以下配置：

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
```

## 公网访问注意事项

- 城市搜索和天气数据来自 Open-Meteo 公开接口，不需要 API Key。
- 气象云图使用 Windy 公开嵌入地图。
- 手机定位功能在公网环境需要 HTTPS，Vercel、Netlify、Cloudflare Pages 默认都提供 HTTPS。
- 如果部署在自己的服务器上，请确保使用 HTTPS，否则手机浏览器可能会拒绝定位权限。
