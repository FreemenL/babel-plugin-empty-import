# babel-plugin-empty-import 

一个解决第三方依赖全量导入的babel插件  

依赖  babel-core babel-types 两个库  做语法解析及转换

## Install

```bash

npm install babel-plugin-empty-import -D

```

## USE

libraryName 字段为要配置的三方库  如 lodash 等


```bash
{
  "presets": [],
  "plugins": [
    ["empty-import",{
      "libraryName": "",
    }],
  ]
}

```