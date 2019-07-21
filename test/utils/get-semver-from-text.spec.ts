import { getSemverFromText } from '../../src/utils/get-semver-from-text'

describe('getSemverFromText', () => {
  test.each`
  text | expected
  ${undefined} | ${undefined}
  ${'1.0.0'} | ${'1.0.0'}
  ${'1.0.0.md'} | ${'1.0.0'}
  ${'cla-1.0.0'} | ${'1.0.0'}
  ${'cla-1.0.0.md'} | ${'1.0.0'}
`('returns $expected when text is $text', ({ text, expected }) => {
  expect(getSemverFromText(text)).toBe(expected)
})
})
