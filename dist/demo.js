X('#c').ready(function(canvas){

	canvas.set
		.background('#333')
		.layer("layer-2")
		.layer("layer-3")
		.width("100%")

	canvas.rect({})
		.style({
			height:"10%",
			width:"10%",
			offsetLeft:"10%",
			offsetTop:"10%",
			fill:"red"
		})
		.layer('layer-3')
		.stroke("round 10px cyan")

	canvas.circle({})//yellow circle pink stroke
		.style({
		radius:"10%",
		fill:"yellow",
		offsetTop:"0%",
		offsetLeft:"0%",
		layer:"layer-1",
		quadrant:"100%"
	})
	.stroke("round 4px #ff00ff")

	canvas.path({})//orange triangle with purple lines
		.offsetTop('30%')
		.offsetLeft('20%')
		.stroke("round 2px purple")
		.fill("orange")
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

	canvas.path({})//pink triangle with purple lines
		.offsetTop('10%')
		.offsetLeft('10%')
		.stroke("round 2px purple")
		.fill("pink")
		.layer('layer-2')
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

	canvas.rect({})//blue rectanle
		.layer('layer-1')
		.fill('blue')
		.offsetTop("10%")
		.offsetLeft("10%")
		.width("10%")
		.height("10%")

}).render()
