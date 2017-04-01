# 使用ES6
拥抱标准，摒弃`ADM`、`CMD`等模块加载polyfill库，减少代码体积。
`class`, `arrow function`, `Promise`, `extend`的原生支持，
语法更简洁、语义化，不需要实现一堆的语法糖，还可以根据语法树剔除没有调用到的代码。


# 使用SASS
saas的语法就不介绍了，可以移步[saas summary](http://blog.suluf.com/2017/04/01/sass-summary/) 或者[sass 语法](http://www.w3cplus.com/sassguide/syntax.html)
其好处在于减少书写嵌套的代码量；可以定义变量、函数，方便进行统一、批量处理相关样式；

## 代码结构
```shell
    |-- src
        |-- es6
            |-- base        // 基础/通用模块
            |-- module      // 每个模块一个文件或者文件夹
            |-- index.js    // 入口文件，每个页面一个，引入其他模块并管理
        |-- sass
            |-- base        // 通用的模块
            |-- module      // 每个模块一个文件或者文件夹
            |-- index.scss  // 入口文件，每个页面一个，依序（尽量不要有顺序相关）引入其他模块
        |-- index.html      // 入口文件，每个页面一个
```

## 开发&测试&发布
```shell
    # 进入根目录
    # 安装依赖
    npm install

    # 开发调试阶段
    # 脚本会自动监听文件的变化并自动编译es6、sass
    # 此代码包含js的解码实现，方便在非se浏览器上开发
    grunt
    
    # 测试阶段
    # 以下命令自动编译es6、sass, 并打包成crx（代码未压缩、调试模式打开）
    # 此代码包含js的解码实现，方便在非se浏览器上开发
    grunt debug
    
    # 发布阶段
    # 以下命令会自动编译es6、sass，压缩、混淆html、css、js、img，并关闭调试模式
    grunt release
```

`建议始终使用build目录进行调试`
