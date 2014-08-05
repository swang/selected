'use strict';

var events = require('events').EventEmitter
  , inherits = require('inherits')
  , utils = require('./utils')
  , isString = utils.isString
  , merge

// dirty merge
merge = function(a, b) {
  var k
  for (k in a) {
    if (a.hasOwnProperty(k) && b.hasOwnProperty(k) === false) {
      b[k] = a[k]
    }
  }
  return b
}

function Selected(ele, opts) {
  var _this = this
    , defaults

  events.call(this)

  this.elements = []
  this.eles = []
  this.opts = merge(defaults, opts || {})

  if (isString(ele)) {
    this.eles = [ele]
  }
  this.eles.forEach(function(ele) {
    var docs = [document]
      , iframes = document.querySelectorAll("iframe")
      , qsEles

    for (var i = 0; i < iframes.length; i++) {
      try {
        docs.push(iframes[i].contentWindow.document)
      }
      catch (err) {
      }
    }
    for (var j = 0; j < docs.length; j++) {
      _this.addDocument(docs[j])
      qsEles = docs[j].querySelectorAll(ele)
    }
  })
}

inherits(Selected, events)

Selected.prototype.addDocument = function(docEle) {
  var _this = this

  docEle.addEventListener('mouseup', function(e) {
    var sel = docEle.getSelection()
      , range = sel.getRangeAt(0)
      , startLoc = -1
      , endLoc = -1
      , retEles = []
      , childEles
      , startEle
      , endEle
      , isSelected

    if (!range.collapsed) {
      childEles = range.commonAncestorContainer.children
      startEle = range.startContainer.parentElement
      endEle = range.endContainer.parentElement
      if (childEles) {
        for (var i = 0; i < childEles.length && !~endLoc; i++) {
          if (childEles[i] === startEle) {
            startLoc = i
          }
          if (~startLoc) {
            isSelected = _this.elements.indexOf(childEles[i])
            if (isSelected > -1)
              retEles.push(childEles[i])
          }
          if (childEles[i] === endEle) {
            endLoc = i
          }
        }
      }
      else { // only one element was selected
        retEles.push(startEle)
      }
      if (retEles.length > 0) {
        _this.emit('selected', { selection: sel, range: range, text: sel.toString(), elements: retEles })
      }
    }
    else {
      // check for textarea
      if (e.target.nodeName === "TEXTAREA" && e.target.selectionStart !== e.target.selectionEnd) {
        _this.emit('selected', { text: e.target.value.substring(e.target.selectionStart, e.target.selectionEnd), elements: [e] })
      }
    }
  })
}

Selected.prototype.getWin = function() {
  return document.activeElement.contentWindow || window
}

Selected.prototype.getDoc = function() {
  var daec = document.activeElement && document.activeElement.contentWindow
  return (daec && daec.document || document)
}

if (typeof module === 'object') {
    module.exports = Selected
}
