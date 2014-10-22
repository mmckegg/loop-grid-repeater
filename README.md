loop-grid-repeater
===

A beat/note repeater transform for [loop-grid](https://github.com/mmckegg/loop-grid).

## API

```js
var Repeater = require('loop-grid-repeater')
```

### `var repeater = Repeater(transform)

Pass `loopGrid.transform` to this constructor.

### `repeater.start(inputGrid, length)`

Held notes will call `transform` with a function that creates a repeating note with length `length / 2` at the rate of specified `length`.

### `repeater.setLength(length)`

### `repeater.stop()`

Release the `inputGrid`.