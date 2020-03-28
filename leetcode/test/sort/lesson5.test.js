import sort from '../../code/sort/lesson5'

test('input:1', () => {
  expect(sort([1, 2, 0])).toEqual([0, 1, 2])
  expect(sort([5, 3, 7, 4, 1, 9, 8, 6, 2])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  expect(sort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])).toEqual([2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50])
})
