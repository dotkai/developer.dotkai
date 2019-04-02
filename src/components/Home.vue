<template lang="pug">
section#home
	div.cover
		h1.title Hi. I'm Kai.
		h2.subtitle UX/UI Architect. Full-stack Developer. Engineer of Imagination.
	div.ripple-wrap
		img(src="/assets/water-blue-ocean.jpg" onload="waterRipple(this, 'home');")
	fish
	div.scrolldown
		a(v-scroll-to="'#experience'" style="padding:1em")
			i.fa.fa-angle-down
</form>
</template>

<script>
	import Fish from './_Fish'
	import AppFooter from './_Footer'
export default {
	components: {
		Fish,
		AppFooter
	}
}
</script>

<style lang="scss">
	@media only screen and (max-width: 500px) {
	    .ripple-wrap, #fish {
	    	display: none;
	    }

	    .cover {
	    	background: #40798C;
	    }
	}

	#home {
		height: 100%;
		overflow: hidden;
		background: lightblue;
		color: white;
		padding-bottom: 0;


		.cover {
			position: absolute;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    justify-content: center;
		    height: 100%;
		    width: 100%;
		    z-index: 100;
		}

		.ripple-wrap {
			position: absolute;
		    top: 0;
			  left: 0;
			  bottom: 0;
			  right: 0;
		    width: 100%;
		    height: 100%;
		    z-index: 50;
		    opacity: 0.7;
		    overflow: hidden;
		}

		.title {
			font-family: 'Montserrat', Arial, sans-serif;
			font-size: 3em;
			padding: 0;
    		margin-bottom: 1em;
    		font-variant: all-petite-caps;
    		text-shadow: 1px 1px 5px darkcyan, 0px 0px 5px black;
		}

		.subtitle {
			font-family: 'Montserrat', Arial, sans-serif;
    		//font-weight: 700;
    		text-shadow: 0px 0px 5px black;
    		padding: 0 1em;
    		line-height: 20px;
		}

		.scrolldown {
			position: absolute;
		    font-size: 1.5em;
		    z-index: 300;
		    bottom: 0;
		    left: 0;
		    right: 0;
		    padding: 1em;
		    text-shadow: 1px 1px 5px darkcyan, 0px 0px 5px black;

		    a {
		    	color: white;
		    }
		}
	}
</style>