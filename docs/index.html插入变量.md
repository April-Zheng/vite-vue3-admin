# index.html 插入变量

## 安装

```bash
npm i vite-plugin-html --save
```

## 配置

在 vite.config.ts 中加入想要的配置

```ts
createHtmlPlugin({
      inject: {
        data: {
          version: pkg.version,
          buildTime: new Date().toLocaleString(),
        },
      },
    }),
```

## 在 index.html 中使用

```html
<meta name="version" content="<%= version %>" />
<meta name="build time" content="<%= buildTime %>" />
```
