X('#c').ready(function(canvas){



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
		radius:"10%",
		fill:"yellow",
		offsetTop:"0%",
		offsetLeft:"0%",
		layer:"layer-2",
		quadrant:"100%"
	})

	canvas.path({})
		.offsetTop('30%')
		.offsetLeft('20%')
		.stroke("round 4px #ff00ff")
		.to({
			left:0,
			top:0
		})
		.to({
			left:300,
			top:0
		})
		.to({
			left:200,
			top:200
		});

	canvas.rect({})
		.layer('layer-1')
		.fill('blue')
		.offsetTop("10%")
		.offsetLeft("10%")
		.width("10%")
		.height("10%")

}).render()
