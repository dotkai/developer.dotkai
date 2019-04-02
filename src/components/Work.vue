<template lang="pug">
section#work
	h1.title work
	div.row
		div.row-img
			img(src="/assets/centage.png")
		div.content
			h2.item-title Front-End/UI Architect
			div.company Centage
			div.date (May 2015 -- December 2017)
			p Transformed early bootstrapped template into a scalable application with unit testing. Established standards and styles for incoming developers to follow. Lead and set path of Angular 1.X migration to Angular 2+. Created multiple widgets and complex UI features, such as a tree with virtual scrolling. Worked in scrum/agile environment with 2-week sprints.
	div.line
	div.row
		div.content
			h2.item-title Software Developer Intern
			div.company Playposit
			div.date (May 2014 -- August 2014)
			p Expanded flipped-learning platform built with PHP and MySQL database to include more embedded question types, grading views, etc. Optimized UI to create easier work flow for teachers and students. Built two apps to incorporate eduCanon into Schoology and Edmodo via their respective APIs.
		div.row-img
			img(src="/assets/playposit.jpg")
</form>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#work {
	background: lightgray;
	min-height: 100%;

	.line {
		width: 50%;
	    border-bottom: 1px solid darkgray;
	    margin: 1em auto;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
    	justify-content: center;
		text-align: left;
		padding: 0 3em;

		img {
    		max-width: 300px;
			margin: 1em;
		}

		.row-img {
    		max-width: 400px;
		}
		.content {
			padding: 16px;
			width: calc(100% - 400px - 16*2px);
			min-width: 260px;

			.item-title {    
				margin-bottom: 0.5em;
			}

			.company {
				font-family: 'Montserrat', Arial, sans-serif;
			}

			.date {
				font-size: 0.75em;
			    margin: 0.5em 0 1em;
			    opacity: 0.7;
			}
		}
	}
}

</style>