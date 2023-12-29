export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }) => {
      // 响应内容
      return body.password === '123456' && body.name === 'admin'
        ? {
            code: 200,
            message: '登录成功',
            data: {
              token: '@word(50, 100)',
            },
          }
        : {
            code: 400,
            message: '账号名或密码错误，请尝试admin/123456',
          }
    },
  },
]
