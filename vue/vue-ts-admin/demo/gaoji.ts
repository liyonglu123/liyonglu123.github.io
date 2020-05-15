// 内置常见类型
const pluginUrlConfig: Record<
  'ggb' | 'math',
  Partial<Record<'dev' | 'test' | 'prod', string>>
> = {
  ggb: {
    dev: '//dev.com',
    test: '//test.com',
    prod: '//prod.com'
  },
  math: {
    dev: '//dev.com',
    test: '//test.com'
  }
}
