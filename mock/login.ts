interface IMeta {
  // 是否在菜单中隐藏
  hidden?: boolean
  [x: string]: any
}

interface IMenuItem {
  name: string
  path: string
  icon: string
  redirect?: string
  level: number
  meta?: IMeta
  children?: IMenuItem[]
}

const menus: IMenuItem[] = [
  {
    name: '系统管理',
    path: '/system',
    redirect: '/system/menu',
    icon: 'Setting',
    level: 1,
    children: [
      {
        name: '菜单管理',
        path: '/system/menu',
        icon: '',
        level: 2,
      },
      {
        name: '权限管理',
        path: '/system/permission',
        icon: '',
        level: 2,
      },
      {
        name: '用户管理',
        path: '/system/users',
        redirect: '/system/users/list',
        icon: '',
        level: 2,
        children: [
          {
            name: '用户列表',
            path: '/system/users/list',
            icon: '',
            level: 3,
            meta: {
              hidden: true,
            },
          },
          {
            name: '新增用户',
            path: '/system/users/add',
            icon: '',
            level: 3,
            meta: {
              hidden: true,
            },
          },
        ],
      },
    ],
  },
  {
    name: '组件',
    path: '/components',
    redirect: '/components/proTable',
    icon: 'Compass',
    level: 1,
    children: [
      {
        name: 'ProTable表格组件',
        path: '/components/proTable',
        icon: '',
        level: 2,
      },
      {
        name: 'EditableProTable',
        path: '/components/editableProTable',
        icon: '',
        level: 2,
      },
      {
        name: 'ProForm表单组件',
        path: '/components/proForm',
        icon: '',
        level: 2,
      },
      {
        name: 'QueryFilter查询表单',
        path: '/components/queryFilter',
        icon: '',
        level: 2,
      },
    ],
  },
  {
    name: '自定义指令',
    path: '/directives',
    redirect: '/directives/throttle',
    icon: 'Compass',
    level: 1,
    children: [
      {
        name: '节流指令',
        path: '/directives/throttle',
        icon: '',
        level: 2,
      },
      {
        name: '按钮权限指令',
        path: '/directives/permission',
        icon: '',
        level: 2,
      },
    ],
  },
]

const VistitorMenus = menus.filter((item) => item.name !== '系统管理')

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
