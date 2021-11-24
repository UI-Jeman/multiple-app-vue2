# multiple-app-basic - 多应用项目基础模板

## 项目启动

1. 安装依赖

```
npm install
```

2. 启动

```
# 需要指定构建目标目录名, e.g. pc
npm run dev pc
```

## git 提交

需指定 commit type 及 commit 目标目录，e.g.

```
git add
git commit -m feat(pc): "message"
```

### 注意事项

较大的第三方库建议通过 CDN 引入
