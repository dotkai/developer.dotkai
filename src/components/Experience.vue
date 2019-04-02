<template lang="pug">
section#experience
	h1.title experience
	p.tagline What I mean when I say I do everything except sports.
	div.content
		div(v-for="(exp, index) in explist")
			i.fa(:class="'fa-'+exp.icon")
			h3.item-title {{ exp.title }}
			p {{exp.text}}
</form>
</template>

<script>
	// Ideation, UX/UI, Code, Write, Teach

export default {
	data(){
		return {
			explist: [{
				title: 'Ideation',
				icon: 'lightbulb-o',
				text: 'Whether coming up with creative solutions or turning them into executable tasks, I have got you covered in all steps of the process.'
			}, {
				title: 'UX/UI',
				icon: 'television',
				text: 'Combine minimalism with intuitive and natural workflow -- both in the UI and in the code-base. That is my philosophy.'
			}, {
				title: 'Code',
				icon: 'code',
				text: 'I make web applications, primarily in Javascript-based tech-stacks, with scalable architecture.'
			}, {
				title: 'Test',
				icon: 'eye',
				text: 'I break things--I mean, I test products to ensure they are good for release and offer UX/UI improvements to ensure minimal user error.'
			}, {
				title: 'Write',
				icon: 'pencil',
				text: 'I started writing technical documention and instruction manuals for fun around age 6. Now it\'s an impulse. Otherwise, I value continued communication without physical presence.'
			}, {
				title: 'Teach',
				icon: 'users',
				text: 'What better way to give back to the community than enable others to join it?'
			}]
		}
	}
}
</script>

<style lang="scss">
#experience {
	min-height: 100%;

	.content {
		display: flex;
    	flex-wrap: wrap;

    	> div {
    		margin:10px 0 0 2%;
    		padding: 1em;
    		flex-grow: 1;
    		width: calc(100% * (1/4) - 10px - 1px);
    		min-width: 200px;

    		.fa {
    			font-size: 35px;
    			color: #FFB400;
    		}

    		.item-title {
    			font-weight: 700;
    			padding: 0.5em;
    		}
    	}
	}
}

</style>