<template lang="pug">
div#fish
	div.body(ref="body" :style="{top: fTop+'px', left: fLeft+'px', transform: 'rotate('+fRotate+'deg)'}")
		div.corner(ref="face")
		div.top-fin
			div.fin2
			div.fin1
		div.bottom-fin
			div.fin2
			div.fin1

		div.mainbody

		div.tail
			div.backfin.one
			div.backfin.two

			div.tailback.one
			div.tailback.two

			div.tailleft.one
			//- div.tailleft.three
			//- div.tailright.three

			div.tailright.one
			div.tailleft.two
			div.tailright.two

			div.tailbase.one
			div.tailbase.end
			div.tailbase.two

		div.dorsal


</template>

<script>

	const RADIUS = 250; // Length of the fish turn

export default {
	data(){
		return {
			activeInterval: null,
			fTop: window.innerHeight/2 - (RADIUS + 50),	// minus Radius and height of fish
			fLeft: window.innerWidth/2 - (RADIUS/2 + 200),	// minus half of radius and width of fish
			fRotate: 0
		}
	},
	mounted(){
		this.turn(true);
	},
	methods: {
		getPivotCenter(rightTurn){
			// Two circles perpendicular to each other === right isoceles triangle
			const radius = RADIUS;
			const angle = this.rad((rightTurn)?45 : -45);	// 45 degrees (90 - theta, where theta = 45 degrees)
			const A = this.$refs.body.getBoundingClientRect();
			const B = this.$refs.face.getBoundingClientRect();
			const hyp = radius * Math.sqrt(2);

			// Coordinates of the center pivot point
			const C_X = hyp*Math.cos(angle) + A.x,
				C_Y = hyp*Math.sin(angle) + A.y;

			return { x: C_X, y: C_Y };
		},
		rad(deg){
			return deg * Math.PI/180;
		},
		turnFish(pivotCenter, radius, turnAngle, angleChange){
			this.fLeft = pivotCenter.x + radius*Math.cos(this.rad(turnAngle));
			this.fTop = pivotCenter.y + radius*Math.sin(this.rad(turnAngle));
			this.fRotate = (this.fRotate + angleChange) % 360;
		},
		turn(rightTurn){
			const vm = this;
			// New rotation point
			const radius = RADIUS;
			let turnAngle = rightTurn? 270 : 90,
				angleChange = rightTurn? 0.5 : -0.5, 
				pivotCenter = this.getPivotCenter(rightTurn);

			this.activeInterval = setInterval(function(){
				vm.turnFish(pivotCenter, radius, turnAngle, angleChange);
				turnAngle += angleChange;
			}, 50);
		},
		dist(x1, x2, y1, y2){
			const a = x2 - x1;
			const b = y2 - y1;
			return Math.sqrt(a*a + b*b);
		},
		faceEndCoordinates(ref, degChange){
			// Get the end coordinates of the direction the face should be pointing
			// (Origin/pivot point does not change)
			const face = ref.getBoundingClientRect();
			const rad = degChange * Math.PI/180;
			const x = face.left*Math.cos(rad) - face.top*Math.sin(rad);
			const y = face.left*Math.sin(rad) + face.top*Math.cos(rad);

			return { x: x, y: y };
		},
		quad(endX, endY, degChange){
			const center = this.faceEndCoordinates(this.$refs.face, degChange),
				leftTurn = this.faceEndCoordinates(this.$refs.face, degChange+1),
				rightTurn = this.faceEndCoordinates(this.$refs.face, degChange-1);

			const leftTurnResult = this.dist(center.y, leftTurn.y, center.x, leftTurn.x),
				rightTurnResult = this.dist(center.y, rightTurn.y, center.x, rightTurn.x);

			// If turning left creates a shorter distance, negative degree change
			// If turning right creates a shorter distance, right turn and positive degree change
			return leftTurnResult <= rightTurnResult? 1 : -1;
		},
		calcDegree(endX, endY){
			const face = this.$refs.face.getBoundingClientRect();
			const body = this.$refs.body.getBoundingClientRect();
			
			const A = this.dist(body.left, face.left, body.top, face.top);
			const B = this.dist(endX, face.left, endY, face.top);
			const C = this.dist(endX, body.left, endY, body.top);

			const degChange = Math.acos((A*A + C*C - B*B)/(2*C*A)) * (180/Math.PI);

			return Math.floor(degChange);
		},
		range(check, target, rangeLow, rangeHigh){
			return target-rangeLow < check && check < target+rangeHigh;
		},
		move(e){

			const vm = this;
			/*this.activeInterval = setInterval(function(){
				vm.turn(true);

			}, 50);*/

			/*const targetX = e.offsetX-150;
			const targetY = e.offsetY-50;
			let degChange = this.calcDegree(targetX, targetY);
			let turnDirection = this.quad(targetX, targetY, degChange);
			const vm = this;

			if(this.activeInterval){
				clearInterval(this.activeInterval);
			}
			
			let a = 0;
			this.activeInterval = setInterval(function(){
				if(a === 1000){
				//if(vm.range(vm.fTop,targetY, 5, 5) && vm.range(vm.fLeft,targetX, 5, 5)){
					clearInterval(vm.activeInterval);
				}

				if(degChange !== 0){
					vm.fRotate += turnDirection*0.5;
					//console.log(vm.fRotate, degChange, turnDirection);
					// Recalculate until degree change === 0
					//degChange = vm.calcDegree(targetX, targetY);
					
				}

				//vm.turn(true);

				if(vm.fTop > targetY){
					vm.fTop--;
				} else if(vm.fTop < targetY) {
					vm.fTop++;
				}

				if(vm.fLeft > targetX){
					vm.fLeft += (vm.fLeft > targetX)? -1 : 1;
				} else if(vm.fLeft < targetX){
					vm.fLeft++;
				}
			}, 50);*/

		}
	}
}
</script>

<style lang="scss">

$darkblue: #0B2027;
$lightblue: #40798C;
$gblue: #70A9A1;
$greytint: #CFD7C7;
@-webkit-keyframes swinging{
    0%{-webkit-transform: rotate(10deg);}
    50%{-webkit-transform: rotate(-5deg)}
    100%{-webkit-transform: rotate(10deg);}
}
 
@keyframes swinging{
    0%{transform: rotate(10deg);}
    50%{transform: rotate(-5deg)}
    100%{transform: rotate(10deg);}
}

@-webkit-keyframes swingingTwo{
    0%{-webkit-transform: rotate(-10deg);}
    50%{-webkit-transform: rotate(5deg);}
    100%{-webkit-transform: rotate(-10deg);}
}

@keyframes swingingTwo{
    0%{transform: rotate(-10deg);}
    50%{transform: rotate(5deg);}
    100%{transform: rotate(-10deg);}
}

@-webkit-keyframes swingingFinOne {
	0%{height: 30px; top:0px;}
    50%{height: 20px; top:0px;}
    100%{height: 30px; top:0px;}
}
@keyframes swingingFinOne {
	0%{height: 30px; top:0px;}
    50%{height: 20px; top:0px;}
    100%{height: 30px; top:0px;}
}

@-webkit-keyframes swingingFinTwo {
	0%{height: 30px; top:0px;}
    50%{height: 20px; top:7px;}
    100%{height: 30px; top:0px;}
}
@keyframes swingingFinTwo {
	0%{height: 30px; top:0px;}
    50%{height: 20px; top:7px;}
    100%{height: 30px; top:0px;}
}

@-webkit-keyframes swingingBackTailOne{
    0%{
    	-webkit-transform: rotate(-30deg);
    	left: -150px;
	    top: -60px;
    	height: 60px;
	}
	50%{
    	-webkit-transform: rotate(-5deg);
    	left: -150px;
	   	top: -75px;
    	height: 100px;
    }
    100%{
    	-webkit-transform: rotate(-30deg);
    	left: -150px;
	    top: -60px;
    	height: 60px;
    }
}
@keyframes swingingBackTailOne{
    0%{
    	transform: rotate(-30deg);
    	left: -150px;
	    top: -60px;
    	height: 60px;
	}
	50%{
    	transform: rotate(-5deg);
    	left: -150px;
	   	top: -75px;
    	height: 100px;
    }
    100%{
    	transform: rotate(-30deg);
    	left: -150px;
	    top: -60px;
    	height: 60px;
    }
}

@-webkit-keyframes swingingBackTailTwo{
    0%{
    	-webkit-transform: rotate(-15deg);
    	left: -155px;
	    top: 5px;
    	height: 100px;
	}
	50%{
    	-webkit-transform: rotate(5deg);
    	left: -155px;
	    top: 15px;
    	height: 60px;
    }
    100%{
    	-webkit-transform: rotate(-15deg);
    	left: -155px;
	    top: 5px;
    	height: 100px;
    }
}
@keyframes swingingBackTailTwo{
    0%{
    	transform: rotate(-15deg);
    	left: -155px;
	    top: 5px;
    	height: 100px;
	}
	50%{
    	transform: rotate(5deg);
    	left: -155px;
	    top: 15px;
    	height: 60px;
    }
    100%{
    	transform: rotate(-15deg);
    	left: -155px;
	    top: 5px;
    	height: 100px;
    }
}

@-webkit-keyframes swingTailLeftOne {
    0%{-webkit-transform: rotate(-4deg); height: 25px;}
    50%{-webkit-transform: rotate(7deg); height: 20px;}
    100%{-webkit-transform: rotate(-4deg); height: 25px;}
}
@keyframes swingTailLeftOne {
    0%{transform: rotate(-4deg); height: 25px;}
    50%{transform: rotate(7deg); height: 20px;}
    100%{transform: rotate(-4deg); height: 25px;}
}

@-webkit-keyframes swingTailLeftTwo {
    0%{-webkit-transform: rotate(-5deg); height: 28px; top: -8px;}
    50%{-webkit-transform: rotate(5deg); height: 33px; top: -5px;}
    100%{-webkit-transform: rotate(-5deg); height: 28px; top: -8px;}
}
@keyframes swingTailLeftTwo {
    0%{transform: rotate(-5deg); height: 28px; top: -8px;}
    50%{transform: rotate(5deg); height: 33px; top: -5px;}
    100%{transform: rotate(-5deg); height: 28px; top: -8px;}
}

@-webkit-keyframes swingTailRightOne {
    0%{-webkit-transform: rotate(-18deg); height: 25px; top: 15px;}
    50%{-webkit-transform: rotate(5deg); height: 20px; top: 25px;}
    100%{-webkit-transform: rotate(-18deg); height: 25px; top: 15px;}
}
@keyframes swingTailRightOne {
    0%{transform: rotate(-18deg); height: 25px; top: 15px;}
    50%{transform: rotate(5deg); height: 20px; top: 25px;}
    100%{transform: rotate(-18deg); height: 25px; top: 15px;}
}


@-webkit-keyframes swingTailRightTwo {
    0%{-webkit-transform: rotate(-5deg); height: 33px; left: -100px;}
    50%{-webkit-transform: rotate(5deg); height: 28px; left: -95px;}
    100%{-webkit-transform: rotate(-5deg); height: 33px; left: -100px;}
}
@keyframes swingTailRightTwo {
    0%{transform: rotate(-5deg); height: 33px; left: -100px;}
    50%{transform: rotate(5deg); height: 28px; left: -95px;}
    100%{transform: rotate(-5deg); height: 33px; left: -100px;}
}

@-webkit-keyframes swingBackFinOne {
    0%{-webkit-transform: rotate(-20deg);}
    50%{-webkit-transform: rotate(10deg);}
    100%{-webkit-transform: rotate(-20deg);}
}
@keyframes swingBackFinOne {
    0%{transform: rotate(-20deg);}
    50%{transform: rotate(10deg);}
    100%{transform: rotate(-20deg);}
}

@-webkit-keyframes swingBackFinTwo {
    0%{-webkit-transform: rotate(-5deg);}
    50%{-webkit-transform: rotate(15deg);}
    100%{-webkit-transform: rotate(-5deg);}
}
@keyframes swingBackFinTwo {
    0%{transform: rotate(-5deg);}
    50%{transform: rotate(15deg);}
    100%{transform: rotate(-5deg);}
}

@keyframes roll {
	100% { transform: rotateZ(-2turn); }
}
@-webkit-keyframes roll {
	100% { -webkit-transform: rotateZ(-2turn); }
}
@keyframes flip {
	25% { transform: rotateX(0.5turn) translate(0,-8em); }
	75% { transform: rotateX(0turn); }
}
@-webkit-keyframes flip {
	25% { -webkit-transform: rotateX(0.5turn) translate(0,-8em); }
	75% { -webkit-transform: rotateX(0turn); }
}


#fish {
	display: block;
	position: absolute;
	top:0;
	left:0;
	width: 100%;
    height: 100%;
    overflow: hidden;

	.corner {
	    position: absolute;
		right: 0;
	    top: 25px;
	}
	
	.body {
		width: 150px;
		height: 50px;
		position: absolute;


		.mainbody {
			position: absolute;
			width: 150px;
			height: 50px;
			background: $darkblue;
			border-radius: 50%;
		}

		.top-fin {
			position: absolute;
			left: 70px;
			top: -15px;
		    width: 35px;
		    height: 25px;
			-webkit-transform-origin: bottom right;
		    transform-origin: bottom right;
		    -webkit-animation: swinging 5s ease-in-out forwards infinite;
		    animation: swinging 5s ease-in-out forwards infinite;

			.fin1 {
				position: absolute;
			    background: #0B2027;
			    width: 35px;
			    height: 25px;
			    border-top-right-radius: 100%;
			    border-bottom-left-radius: 100%;
			}
			.fin2 {
				position: absolute;
			    background: #40798C;
			    width: 50px;
			    height: 30px;
			    border-top-right-radius: 100%;
			    border-bottom-left-radius: 100%;
			    opacity: 0.8;
			    top: -7px;
			    left: -18px;
			    transform: rotate(10deg);
			    -webkit-transform-origin: bottom right;
			    transform-origin: bottom right;
			    -webkit-animation: swingingFinOne 5s ease-in-out forwards infinite;
			    animation: swingingFinOne 5s ease-in-out forwards infinite;
			}
		}

		.bottom-fin {
			position: absolute;
			left: 70px;
			top: 41px;
		    width: 35px;
		    height: 25px;
			-webkit-transform-origin: top right;
		    transform-origin: top right;
		    -webkit-animation: swingingTwo 5s ease-in-out forwards infinite;
		    animation: swingingTwo 5s ease-in-out forwards infinite;

			.fin1 {
				position: absolute;
			    background: #0B2027;
			    width: 35px;
			    height: 25px;
			    border-top-left-radius: 100%;
			    border-bottom-right-radius: 100%;
			}

			.fin2 {
				position: absolute;
			    background: #40798C;
			    width: 50px;
			    height: 30px;
			    border-top-left-radius: 100%;
			    border-bottom-right-radius: 100%;
			    opacity: 0.8;
			    top: 2px;
			    left: -18px;
			    transform: rotate(-5deg);
			    -webkit-transform-origin: top right;
			    transform-origin: top right;
			    -webkit-animation: swingingFinTwo 5s ease-in-out forwards infinite;
			    animation: swingingFinTwo 5s ease-in-out forwards infinite;
			}
		}

		.backfin {
			position: absolute;
		    height: 20px;
		    width: 60px;
		    left: -5px;
		    background: linear-gradient($gblue, $lightblue);
			opacity: 0.7;

		    &.one {
			    top: -20px;
		    	border-top-right-radius: 100%;
				border-bottom-left-radius: 100%;
				-webkit-transform-origin: bottom right;
	    		transform-origin: bottom right;
			    -webkit-animation: swingBackFinOne 3.5s ease-in-out forwards infinite;
		    	animation: swingBackFinOne 3.5s ease-in-out forwards infinite;
		    }

		    &.two {
			    top: 33px;
		    	border-top-left-radius: 100%;
				border-bottom-right-radius: 100%;
				-webkit-transform-origin: top right;
	    		transform-origin: bottom right;
			    -webkit-animation: swingBackFinTwo 3.5s ease-in-out forwards infinite;
		    	animation: swingBackFinTwo 3.5s ease-in-out forwards infinite;
		    }
		}

		.tail {
			position: relative;
			top: 9px;
    		left: -20px;
    		-webkit-transform-origin: 50% 0;
		    transform-origin: 50% 0;
		    -webkit-animation: swinging 3.5s ease-in-out forwards infinite;
		    animation: swinging 3.5s ease-in-out forwards infinite;

    		div {
    			position: absolute;
    		}

    		.tailbase {
    			background: $darkblue;
				width: 70px;
	    		height: 15px;
				border-radius: 50%;
				width: 100px;
				left: -30px;

				&.one {
					transform: rotate(-15deg);
				}

				&.two {
	    			top: 17px;
					transform: rotate(15deg);
				}

				&.end {
					top: 6px;
				    height: 20px;
				    left: -35px;
				}
    		}


    		.tailback {
    			background: $gblue;
    			width: 130px;
    			height: 100px;
    			opacity: 0.5;
			    

			    &.one {
			    	border-top-right-radius: 100%;
				    border-bottom-left-radius: 100%;
				    transform: rotate(-20deg);
				    left: -150px;
				    top: -50px;
    				-webkit-transform-origin: top left;
		    		transform-origin: bottom right;
				    -webkit-animation: swingingBackTailOne 3.5s ease-in-out forwards infinite;
			    	animation: swingingBackTailOne 3.5s ease-in-out forwards infinite;
			    }

			    &.two {
			    	border-top-left-radius: 100%;
				    border-bottom-right-radius: 100%;
				    transform: rotate(0deg);
    				top: 5px;
				    left: -160px;
    				-webkit-transform-origin: top right;
		    		transform-origin: top right;
		    		-webkit-animation: swingingBackTailTwo 3.5s ease-in-out forwards infinite;
				    animation: swingingBackTailTwo 3.5s ease-in-out forwards infinite;
			    }
    		}

			.tailleft, .tailright {
				position: absolute;
				background: $lightblue;
			}

			.tailleft {
				background: $lightblue;
			    border-top-right-radius: 100%;
			    border-bottom-left-radius: 100%;
			    opacity: 0.7;
				top: -8px;

				&.one {
				    height: 25px;
				    width: 80px;
				    left: -60px;
				    transform: rotate(10deg);
				    -webkit-transform-origin: bottom right;
				    transform-origin: bottom right;
				    -webkit-animation: swingTailLeftOne 3.5s ease-in-out forwards infinite;
				    animation: swingTailLeftOne 3.5s ease-in-out forwards infinite;
				}

				&.two {
					left: -100px;
				    width: 115px;
				    height: 33px;
				    transform: rotate(-3deg);
				    -webkit-transform-origin: bottom right;
				    transform-origin: bottom right;
				    -webkit-animation: swingTailLeftTwo 3.5s ease-in-out forwards infinite;
				    animation: swingTailLeftTwo 3.5s ease-in-out forwards infinite;
				}
			}

			.tailright {
				background: $lightblue;
			    border-top-left-radius: 100%;
			    border-bottom-right-radius: 100%;
			    opacity: 0.7;
				top: 12px;

				&.one {
				    height: 25px;
				    width: 80px;
				    left: -60px;
				    transform: rotate(-20deg);
    				top: 20px;
    				-webkit-transform-origin: top right;
		    		transform-origin: top right;
		    		-webkit-animation: swingTailRightOne 3.5s ease-in-out forwards infinite;
				    animation: swingTailRightOne 3.5s ease-in-out forwards infinite;
				}

				&.two {
					left: -100px;
				    width: 115px;
				    height: 33px;
				    transform: rotate(-10deg);
				    -webkit-transform-origin: top right;
		    		transform-origin: top right;
		    		-webkit-animation: swingTailRightTwo 3.5s ease-in-out forwards infinite;
				    animation: swingTailRightTwo 3.5s ease-in-out forwards infinite;
				}
			}
		}
		
		.dorsal {
			background: $lightblue;
			width: 50px;
			height: 4px;
			position: absolute;
		    top: 21px;
    		left: 50px;
		    opacity: 0.8;
		    border-top-right-radius: 100%;
		    border-bottom-left-radius: 100%;
		}
	}
}


</style>