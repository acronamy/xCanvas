(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(val,parentVal){

	console.log(val,parentVal)

	if(/%/g.test(val)){
		return require('./percentage.js')(parseInt(val),parentVal)
	}
	else return parseInt(width)

}

},{"./percentage.js":2}],2:[function(require,module,exports){
module.exports = function calc(val,of) {
var a = parseInt(val)/100;
var b = a*of,
	total = b;
	return total
}

},{}],3:[function(require,module,exports){
module.exports = function(vis){
	console.log(this)

	if(!vis||vs==='*'||vis==='all'){
		console.log(this.xDom[vis])
	}

	console.log(this.xDom)

}

},{}],4:[function(require,module,exports){
module.exports = function(xCanvas){

	return function set(){
		var proto = set.prototype,
		settingsObj = xCanvas.settings,
		xDom = xCanvas.xDom
		proto.background = function(val){
			settingsObj.background = val
			return this
		}
		proto.width = function(val){
			settingsObj.width = val
			return this
		}
		proto.height = function(val){
			settingsObj.height = val
			return this
		}
		proto.responsive = function(val){
			settingsObj.responsive = val
			return this
		}
		proto.layer = function(val){
			xDom[val] = []
			xDom.length = Object.keys(xDom).length
			return this
		}
		return set.prototype
	}

}

},{}],5:[function(require,module,exports){
module.exports = function(xDom){

var shapes = this.xDom,
		$class = this

function X(a){
	if(document.querySelector(a).nodeName==='CANVAS'){
		$class.element = document.querySelector(a)
		$class.ctx = document.querySelector(a).getContext('2d')
		$class.ready = function(cb){ cb($class); return {render:$class.render.bind($class)}}
		//parent
		var parentSize = $class.element.parentNode.getBoundingClientRect()
		$class.settings.parent = {}
		$class.settings.parent.width = parentSize.width
		$class.settings.parent.height = parentSize.height
		return $class
	}
	if(typeof a ==='object') a = a.xuid
	var sel = init(a,X.prototype)
	sel.prototype = X.prototype
	return sel()
}
X.fn = X.prototype

require('../prototypes/classes.js')(X.fn)
require('../prototypes/iteration.js')(X.fn)

function init(a,b){
	function sel(str){
		if(/#/.test(str)) var selM = {mode:"id"}
		else if(/\./.test(str)) var selM = {mode:"class"}
		else if(/0x/.test(str)) var selM = {mode:"xuid"}
		else selM = {mode:"type"}
		selM.use = str
			.split('#').join('').split('.').join('').split(":").shift()
		return selM
	}
	var cur = null,
			prev = null,
			length = null,
			classM = [],
			typeM = []
	for(i in shapes){
		for(layer in shapes[i]){
			var shapeObj = shapes[i][layer]

			if(shapeObj.hasOwnProperty(sel(a).mode)){//validate
				if(sel(a).mode==='id' && shapeObj.id===sel(a).use){
					cur = shapeObj
					break
				}
				else if(sel(a).mode==='xuid' && shapeObj.xuid===a){
					cur = shapeObj
				}
				else if(sel(a).mode==='type' && shapeObj.type===sel(a).use){
					typeM.push(shapeObj)
					cur = typeM
				}
				else if(sel(a).mode==='class' && shapeObj.class.indexOf(sel(a).use)!='-1'){
					classM.push(shapeObj)
					cur = classM
				}
			}
			else throw("your selector X is invalid")
		}
	}
	//internal exposure
	function $(){
		var retArr = []
		retArr.X = cur||null
		retArr.length = cur.length||null
		retArr['__proto__'] = b
		return retArr
	}
	return $
}

	return X
}

},{"../prototypes/classes.js":7,"../prototypes/iteration.js":10}],6:[function(require,module,exports){
var xCanvas = window.xCanvas = {},
		X = window.X = (function(){
			return require('./engine/X.js')
		})()

var settings = xCanvas.settings = {}
var xDom = xCanvas.xDom = []
Object.defineProperty(xCanvas, "set", {
	get:function(){
		return require('./defaults/setup.js')(xCanvas)()
	}
});
Object.defineProperty(xCanvas, "fn", {
	get:function(){
		return this['__proto__']
	}
});
xCanvas.defaults = xCanvas.set

//setup defaults
xCanvas.defaults
//style
	.background('#fafafa')
	.width('100%')
	.height('100%')

//behavior
	.responsive(true)

//layers
	.layer('layer-1')
	.layer('layer-2')

xCanvas.fn.shape = require('./prototypes/create.js').bind(xCanvas)(xDom).shape
xCanvas.fn.rect = require('./prototypes/create.js').bind(xCanvas)(xDom).rect
xCanvas.fn.circle = require('./prototypes/create.js').bind(xCanvas)(xDom).circle
xCanvas.fn.path = require('./prototypes/create.js').bind(xCanvas)(xDom).path

xCanvas.render = require('./actions/render.js')

var X = window.X = X.bind(xCanvas)()


},{"./actions/render.js":3,"./defaults/setup.js":4,"./engine/X.js":5,"./prototypes/create.js":8}],7:[function(require,module,exports){
module.exports = function(fn){

fn.addClass = function(className){
	if(this.X.length>=0){
		for(i in this.X){
			this.X[i].class.push(className)
		}
	}
	else{
		this.X.class.push(className)
	}
	return this
}

fn.removeClass = function(className){
	if(this.X.length>=0){
		for(i in this.X){
			var ind = this.X[i].class.indexOf(className)
			if(ind!=-1) this.X[i].class.splice(ind,1)
		}
	}
	else{
		this.X.class.splice(this.X.class.indexOf(className), 1)
	}
	return this
}

}

},{}],8:[function(require,module,exports){
var count = {
	rect:0,
	circle:0,
	path:0,
	"*":0
}


module.exports = function(xDom){

	var $class = this

	function create(){

		var proto = require('./createFns.js')

		function generic(namespace,obj,cb){
			if(namespace==='rect') count.rect++
			else if(namespace==='circle') count.circle++
			else if(namespace==='path') count.path++
			count['*']++

			if(!obj.hasOwnProperty('layer')){
				var firstLayer = Object.keys(xDom)[0]
				obj.layer = firstLayer
			}
			Object.defineProperty(obj, "xuid", {
				value: "0x"+count['*'],
				writable: false
			});
			Object.defineProperty(obj, "id", {
				value: namespace+"-"+count[namespace],
				writable: false
			});
			Object.defineProperty(obj, "type", {
				value: namespace,
				writable: false
			});

			var cParent = $class.settings.parent,
					width = obj.width,
					height = obj.height

			if(width){
				Object.defineProperty(obj, "width",{
					get:function(){ return require('../actions/makePercentage.js')(width,cParent.width) }
				})
			}
			if(height){
				Object.defineProperty(obj, "height",{
					get:function(){return require('../actions/makePercentage.js')(height,cParent.height)}
				})
			}

			cb(obj)
		}
		this.shape = function(namespace,obj){
			generic(namespace,obj,populate)
		}
		this.rect = function(obj){
			generic("rect",obj,populate)
			this.rect['__proto__'] = proto.bind(obj)(xDom,populate,$class)
			return this.rect
		}
		this.circle = function(obj){
			generic("circle",obj,populate)
			this.circle['__proto__'] = proto.bind(obj)(xDom,populate,$class)
			return this.circle
		}
		this.path = function(obj){
			obj.points = []
			generic("path",obj,populate)
			this.path['__proto__'] = proto.bind(obj)(xDom,populate,$class)
			return this.path
		}
	}

	function populate(obj){
		//clear changes
		var xDom = $class.xDom,
				xDomLen = Object.keys(xDom).length
		xDom[obj.layer][obj.id] = obj

		clear(xDom)

		xDom[obj.layer].length = Object.keys(xDom[obj.layer]).length
		//do len after clear
	}

	function clear(xDom){
		for(var i = 0; i<xDom.length; i++){
			var key = Object.keys(xDom)[i],
					shapeKey = Object.keys(xDom[key])
			for(var y=0; y<shapeKey.length; y++){
				var shapeObj = xDom[key][shapeKey[y]]
				if(shapeObj.layer!=key){
					if(xDom[key][shapeObj.id]){
						delete xDom[key][shapeObj.id]
					}
				}
			}
		}
	}

	return new create()
}

},{"../actions/makePercentage.js":1,"./createFns.js":9}],9:[function(require,module,exports){
module.exports = function(xDom,cb,$class){

	var canvasParent = $class.settings.parent,
			parentWidth = canvasParent.width,
			parentHeight = canvasParent.height,
			percentage = require('../actions/percentage.js')

	var shapeObj = this

	return {
		style:function(obj){
			if(obj.hasOwnProperty('width')){
				shapeObj.width = percentage(obj.width,parentWidth)
			}
			if(obj.hasOwnProperty('height')){
				shapeObj.height = percentage(obj.height,parentHeight)
			}
			if(obj.hasOwnProperty('fill')){
				shapeObj.fill = obj.fill
			}
			if(obj.hasOwnProperty('quadrant')){
				shapeObj.quadrant = obj.quadrant
			}

			cb(shapeObj)
			return this
		},
		width:function(val){
			shapeObj.width = percentage(val,parentWidth)
			cb(shapeObj)
			return this
		},
		height:function(val){
			shapeObj.height = percentage(val,parentHeight)
			cb(shapeObj)
			return this
		},
		offsetTop:function(val){
			shapeObj.offsetTop = percentage(val,parentHeight)
			cb(shapeObj)
			return this
		},
		offsetLeft:function(val){
			shapeObj.offsetLeft = percentage(val,parentWidth)
			cb(shapeObj)
			return this
		},
		quadrant:function(val){
			shapeObj.quadrant = percentage(val,2)
			cb(shapeObj)
			return this
		},
		draw:function(val){

			cb(shapeObj)
			return this
		},
		layer:function(val){
			shapeObj.layer = val

			cb(shapeObj)
			return this
		},
		fill:function(val){
			shapeObj.fill = val
			cb(shapeObj)
			return this
		}
	}

}

},{"../actions/percentage.js":2}],10:[function(require,module,exports){
module.exports = function(fn){

fn.each = function(cb){
	for(i in this.X){
		cb.bind(X(this.X[i]).X)()
	}
}

}

},{}]},{},[6]);
