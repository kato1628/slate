
import assert from 'assert'

export default function (state) {
  const { document, selection } = state
  const texts = document.getTexts()
  const first = texts.first()
  const range = selection.merge({
    anchorKey: first.key,
    anchorOffset: 0,
    focusKey: first.key,
    focusOffset: 0
  })

  const next = state
    .transform()
    .moveTo(range)
    .insertText('text')
    .apply()

    .transform()
    .undo()
    .apply()

  assert.deepEqual(next.selection.toJS(), selection.toJS())
  return next
}
