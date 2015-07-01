module.exports = function(transform){

  var repeater = {}

  var release = null
  var releaseTransform = null

  var activeGrid = null
  var repeatLength = 1

  repeater.setLength = function(value){
    repeatLength = value
    refresh()
  }

  repeater.getRepeat = function(){
    if (release){
      return repeatLength
    }
  }

  repeater.start = function(inputGrabber, length){
    if (!release){

      if (length != null){
        repeatLength = length
      }

      release = inputGrabber(function(grid){
        activeGrid = grid
        refresh()
      })

      refresh()
    } else if (length != null){
      repeater.setLength(length)
    }
  }

  repeater.stop = function(){
    if (release){
      release()
      release = null
    }
    activeGrid = null
    refresh()
  }

  function refresh(){
    if (releaseTransform) {
      releaseTransform()
      releaseTransform = null
    }

    var active = []

    if (activeGrid){
      activeGrid.data.forEach(function(val, i){
        if (val){
          active.push(i)
        }
      })
    }

    if (active.length && repeatLength != null){
      releaseTransform = transform(repeat, active, repeatLength)
    }
  }

  return repeater
}

function repeat(input, active, length){
  active.forEach(function(index){
    if (length === 0) { // suppress
      input.data[index] = null
    } else {
      input.data[index] = {
        events: [[0, length/2]],
        length: length
      }
    }

  })
  return input
}