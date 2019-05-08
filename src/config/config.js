module.exports = {
    production: {
        env: 'production', //环境变量
        baseUrl: 'https://api-miaona.zhongjiangweiye.com/', //请求地址
        uweb: true //是否初始化统计代码
    },
    development: {
        env: 'development',
        baseUrl: '/api',
        uweb: false
    },
    test: {
        env: 'test',
        baseUrl: 'http://192.168.30.137:18080',
        uweb: false
    }
}