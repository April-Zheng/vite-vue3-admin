export default [
  {
    url: '/api/user/list',
    method: 'post',
    statusCode: 200,
    response: (params) => {
      const { pageSize } = params
      return {
        code: 200,
        data: {
          'list|10': [
            {
              name: '@cname',
              age: '@integer(12-80)',
              city: '@city',
              address: '@county()',
              zip: '@zip',
              date: '@date(yyyy-MM-dd)',
            },
          ],
          total: 100,
        },
      }
    },
  },
]
