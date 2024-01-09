import menus, { VistitorMenus } from './menus'
const Account = {
  admin: {
    name: 'admin',
    roles: ['admin'],
    avatar: 'https://router.vuejs.org/logo.svg',
    menus,
  },
  visitor: {
    name: 'visitor',
    roles: ['visitor'],
    avatar: 'https://router.vuejs.org/logo.svg',
    menus: VistitorMenus,
  },
}

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }) => {
      // 响应内容
      return body.name === 'admin'
        ? {
            code: 200,
            message: '登录成功',
            data: {
              token: 'admin-' + '@word(50, 100)',
            },
          }
        : {
            code: 200,
            message: '登录成功',
            data: {
              token: 'visitor-' + '@word(50, 100)',
            },
          }
    },
  },
  {
    url: '/api/userinfo',
    method: 'get',
    timeout: 1000,
    statusCode: 200,
    response: (options) => {
      const { headers } = options
      // 响应内容
      return {
        code: 200,
        message: '成功',
        data: headers?.authorization?.startsWith('admin')
          ? Account.admin
          : Account.visitor,
      }
    },
  },
]
