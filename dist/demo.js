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
			height:"20%",
			width:"20%",
			offsetLeft:"5%",
			offsetTop:"5%",
			fill:"red"
		})

	canvas.circle({})
		.style({
		radius:"20%",
		fill:"yellow",
		offsetTop:"0%",
		offsetLeft:"0%",
		layer:"layer-2",
		quadrant:"100%"
	})

	canvas.path({})

}).render()
