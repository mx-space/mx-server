import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { TextMarcoService } from '~/processors/helper/helper.marco.service'

dayjs.extend(relativeTime)

describe.only('test TextMarcoService', () => {
  const service = new TextMarcoService()
  describe('test if condition', () => {
    test('case 1', async () => {
      const res = await service.replaceTextMarco(
        '[[ ? $a > 1 | "yes" | "no" ?  ]]',
        { a: -1 },
      )
      expect(res).toBe('no')
    })

    test('case 2', async () => {
      const res = await service.replaceTextMarco(
        '[[ ? $a > 1 | "yes" | "no" ?  ]]',
        { a: 2 },
      )
      expect(res).toBe('yes')
    })

    test('case 3', async () => {
      const res = await service.replaceTextMarco(
        '[[ ? $a > 1 | "yes" | "no" ?  ]]',
        {},
      )
      expect(res).toBe('no')
    })

    test('case 3', async () => {
      const res = await service.replaceTextMarco(
        '[[ ? $$$ > 1 | "yes" | "no" ?  ]]',
        { $$: 21 },
      )
      expect(res).toBe('yes')
    })
  })

  describe('test function', () => {
    test('case 1', async () => {
      const res = await service.replaceTextMarco(
        "[[ #dayjs($created).format('YYYY-MM-DD') ]]",
        { created: new Date() },
      )
      expect(res).toBe(dayjs().format('YYYY-MM-DD'))
    })

    test('case 2', async () => {
      const date = new Date()
      const res = await service.replaceTextMarco('[[ #$date.toISOString() ]]', {
        date,
      })
      expect(res).toBe(date.toISOString())
    })

    test('case 2', async () => {
      const updated = new Date('2020-01-01')
      const res = await service.replaceTextMarco(
        '更新于 [[ #dayjs($updated).fromNow() ]]',
        { updated },
      )
      expect(res).toBe(`更新于 ${dayjs(updated).fromNow()}`)
    })

    test('case 3', async () => {
      const updated = new Date('2020-01-01')
      const res = await service.replaceTextMarco(
        '更新于 [[ #fromNow($updated) ]]',
        { updated },
      )
      expect(res).toBe(`更新于 ${dayjs(updated).fromNow()}`)
    })

    test('case 4', async () => {
      const created = new Date('2020-01-01')
      const res = await service.replaceTextMarco(
        '创建于 [[ #dayjs($created).format("YYYY-MM-DD") ]]',
        { created },
      )
      expect(res).toBe(`创建于 2020-01-01`)
    })
  })
})
