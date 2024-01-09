//  mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const mockAPIs: Record<string, any> = import.meta.glob(['../mock/*'], {
  eager: true,
})

const modules = Object.keys(mockAPIs)?.reduce((pre: any, cur) => {
  return [...pre, ...mockAPIs[cur].default]
}, [])

export function setupProdMockServer() {
  createProdMockServer(modules)
}
