export default [
  {
    url: '/api/components/pro-table',
    method: 'post',
    statusCode: 200,
    response: () => {
      return {
        code: 200,
        data: {
          'list|10': [
            {
              inspectionId: '@integer(3,100000)',
              eleContractNo: '@string("upper",8)',
              mntContractNo: '@string("upper",8)',
              customerName: '@cname',
              onsiteEleName: '@string("upper",4)',
              'inspectionType|1': ['ELEVATOR', 'ESCALATOR'],
              userName: '@cname',
              inspectionDate: '@date(yyyy-MM-dd)',
              'h|1': '@time(HH:mm)-@time(HH:mm)',
              'orderCode|1': [
                'INITIATED',
                'CHANGE_REQUEST',
                'INSPECTION_AUDIT',
                'COMPLETE',
              ],
            },
          ],
          total: 100,
        },
      }
    },
  },
  {
    url: '/api/components/pro-form',
    method: 'get',
    statusCode: 200,
    timeout: 2000,
    response: () => {
      return {
        code: 200,
        data: {
          name: 'test',
          resource: '1',
          type: ['1'],
          desc: 'tewt',
          date: '2023-12-05',
          dateTime: '2023-12-01 00:00:00',
        },
      }
    },
  },
]
