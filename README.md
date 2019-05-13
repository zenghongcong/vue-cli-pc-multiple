# vue-cli-pc-multiple

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### element 按需引入，减少代码体积需要安装依赖的坑
```
yarn add babel-plugin-component
yarn add babel-preset-es2015
yarn add @babel/preset-env
yarn add @babel/plugin-syntax-dynamic-import
```
并修改vue.config.js为：
```
module.exports = {
  presets: [["@babel/preset-env", { modules: false }]],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ],
    "@babel/plugin-syntax-dynamic-import"
  ]
};
```
