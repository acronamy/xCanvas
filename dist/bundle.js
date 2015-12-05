(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(val,parentVal){


	if(/%/g.test(val)){
		return require('./percentage.js')(parseInt(val),parentVal)
	}
	else return parseInt(val)

}

},{"./percentage.js":2}],2:[function(require,module,exports){
module.exports = function calc(val,of) {
var a = parseInt(val)/100;
var b = a*of,
	total = b;
	return total
}

},{}],3:[function(require,module,exports){
module.exports = function ready(vis){
//only render when document is ready
document.ondomcontentready = ready


	var ctx = this.ctx,
			element = this.element,
			settings = this.settings,
			elementParent = settings.parent
			percentage = require('./makePercentage.js')

	element.width = percentage(settings.width,elementParent.width)
	element.height = percentage(settings.height,elementParent.height)


	var render = {
		rect:function(shapeObj){
			ctx.fillStyle = shapeObj.fill
			ctx.fillRect(shapeObj.offsetLeft,shapeObj.offsetTop,shapeObj.width,shapeObj.height)
		},
		circle:function(shapeObj){
			ctx.beginPath();
			ctx.fillStyle = shapeObj.fill
			ctx.arc(shapeObj.offsetLeft+shapeObj.radius,shapeObj.offsetTop+shapeObj.radius,shapeObj.radius,0,shapeObj.quadrant*Math.PI);
			ctx.fill();
		},
		path:function(shapeObj){
			ctx.beginPath()
			ctx.moveTo(
				shapeObj.points.start.left,
				shapeObj.points.start.top
			)
			for(var p = 0; p<Object.keys(shapeObj.points).length; p++){
				if(shapeObj.points[p]){
					ctx.lineTo(shapeObj.points[p].left,shapeObj.points[p].top)
				}
			}
			ctx.closePath()
			ctx.lineWidth = 1
			ctx.fillStyle = shapeObj.fill||"rgba(255,255,255,0)"
			ctx.strokeStyle = 'green'
			ctx.fill()
			ctx.stroke()
		}
	}

	if(!vis||vs==='*'||vis==='all'){
		var renderArr = this.xDom
	}
	else{
		var renderArr = this.xDom[vis]
	}


	for(var i = 0; i<renderArr.length; i++){
		var layerKeys = Object.keys(renderArr)[i],
				layerN = renderArr[layerKeys],
				layerLen = layerN.length

		for(var y = 0; y<layerLen;y++){
			var shape = layerN[Object.keys(layerN)[y]]

			if(shape.type==='rect') render.rect(shape)
			else if(shape.type==='circle') render.circle(shape)
			else if(shape.type==='path') render.path(shape)
		}


	}

}

},{"./makePercentage.js":1}],4:[function(require,module,exports){
module.exports = function getScrollBarWidth() {
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild(inner);

	document.body.appendChild(outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;

	if (w1 == w2) {
		w2 = outer.clientWidth;
	}

	document.body.removeChild(outer);

	return (w1 - w2);
}

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
module.exports = function(xDom){

var shapes = this.xDom,
		$class = this,
		scrollbarWidth = require('../actions/scrollbarWidth.js')

function X(a){
	if(document.querySelector(a).nodeName==='CANVAS'){

		$class.element = document.querySelector(a)
		$class.ctx = document.querySelector(a).getContext('2d')
		$class.ready = function(cb){ cb($class); return {render:$class.render.bind($class)}}
		//parent
		var parent = $class.element.parentElement

		$class.settings.parent = {}
		$class.settings.parent.width = parent.offsetWidth - scrollbarWidth()
		$class.settings.parent.height = parent.offsetHeight - scrollbarWidth()
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

},{"../actions/scrollbarWidth.js":4,"../prototypes/classes.js":8,"../prototypes/iteration.js":11}],7:[function(require,module,exports){
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


},{"./actions/render.js":3,"./defaults/setup.js":5,"./engine/X.js":6,"./prototypes/create.js":9}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"../actions/makePercentage.js":1,"./createFns.js":10}],10:[function(require,module,exports){
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
				shapeObj.quadrant = percentage(obj.quadrant,2)
			}
			if(obj.hasOwnProperty('offsetTop')){
				shapeObj.offsetTop = percentage(obj.offsetTop,parentHeight)
			}
			if(obj.hasOwnProperty('offsetLeft')){
				shapeObj.offsetLeft = percentage(obj.offsetLeft,parentHeight)
			}
			if(obj.hasOwnProperty('stroke')){
				shapeObj.stroke = obj.stroke
			}
			if(obj.hasOwnProperty('radius')){
				shapeObj.radius = percentage(obj.radius,parentWidth) /2
				shapeObj.width = shapeObj.radius * 2
				shapeObj.height = shapeObj.radius * 2
			}
			if(obj.hasOwnProperty('layer')){
				shapeObj.layer = obj.layer
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
		//circle
		quadrant:function(val){
			shapeObj.quadrant = percentage(val,2)
			cb(shapeObj)
			return this
		},
		radius:function(val){
			shapeObj.radius = percentage(val,parentWidth) /2
			cb(shapeObj)
			return this
		},
		//path
		to:function(val){
			if(shapeObj.hasOwnProperty('offsetTop')){
				val.top = val.top + shapeObj.offsetTop
			}
			if(shapeObj.hasOwnProperty('offsetLeft')){
				val.left = val.left + shapeObj.offsetLeft
			}
			if(Object.keys(shapeObj.points).length===0){
				shapeObj.points['start'] = val
			}
			else{
				shapeObj.points[Object.keys(shapeObj.points).length++] = val
			}
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
		},
		stroke:function(val){
			shapeObj.stroke = val
			cb(shapeObj)
			return this
		}
	}

}

},{"../actions/percentage.js":2}],11:[function(require,module,exports){
module.exports = function(fn){

fn.each = function(cb){
	for(i in this.X){
		cb.bind(X(this.X[i]).X)()
	}
}

}

},{}]},{},[7]);
