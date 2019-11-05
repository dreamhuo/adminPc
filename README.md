

~~~
www  WEB版结构如下（或者子目录）==
├─src                     项目目录
│  ├─api                 接口相关
│  ├─assets              静态资源
│  ├─libs                类库资源
│  │  ├─api.request.js      抛出请求方法
│  │  └─axios.js            主要请求方法在这里封装，主要封装了异常处理，加载处理等
│  ├─components          组件
│  │  ├─login-form      登录模块复用
│  │  │  └─login-form.vue     初始化SDK，以及封装SDK相关功能的方法 
│  ├─store                vuex相关配置
│  │  ├─module            各个模块
│  │  │  ├─user.js      用户模块存储
│  │  │  ├─……         其他模块的存储
│  │  │  └─app.js       app相关的存储
│  │  └─index.js          在index.js里调用module里的js
~~~


## Getting started
```bush
# clone the project
git clone https://github.com/iview/iview-admin.git

// install dependencies
npm install

// develop
npm run dev
```

## Build
```bush
npm run build
```

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, TalkingData
