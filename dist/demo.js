X('#c').ready(function(canvas){

	canvas.rect({})
		.layer('layer-2')
		.fill('blue')
		.offsetTop("10%")
		.offsetLeft("10%")
		.width("33.3%")
		.height("33.3%")


	canvas.rect({})
		.style({
			height:"100%",
			width:"75%"
		})

	canvas.path({})

}).render()
