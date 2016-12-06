# 使用说明

0. 目录结构 & 约定
每个页面在根目录有一个.html
每个页面在es6目录下有且只有一个入口.js（html页面引用），其他的js模块放在es6/modules目录下并使用es6模块导出接口
每个页面在sass目录下有且只有一个入口.scss样式（html页面引用），其他的样式模块放在sass/modules目录

1. 安装依赖
```shell
  # 进入根目录
  cd src

  # 安装依赖
  npm install
```

2. 开发 & 调试
```shell
  # 会监听文件的变化，自动编译并拷贝到build目录
  # 测试后的时候可以用src或者build目录下的html
  grunt
```

3. 编译
```shell
  # 自动编译、压缩，生成可发布的版本到build目录
  grunt build
```
