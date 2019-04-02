<template lang="pug">
header.header(:class="[activeIcon]")
	a.symbol(href="http://dotkai.com")
		span &middot;
		span.chi &chi;
	div.navigation
		a(v-for="(icon, index) in icons" v-scroll-to="'#'+icon.link" :class="{active: icon.link == activeIcon}" @click="activeIcon = icon.link") {{icon.label || icon.link}}
	div.mobile-navigation(@click="toggleMenu")
		i.fa.fa-bars
	div.mobile-menu(v-if="mobileMenu")
		div.cancel
			span(@click="toggleMenu") x
		a(v-for="(icon, index) in icons" @click="gotoItem(icon)") {{icon.label || icon.link}}
</template>

<script>
export default {
	data(){
		return {
			mobileMenu: false,
			activeIcon: 'home',
			icons: [{
				label: 'top',
				link: 'home'
			}, {
				link: 'experience'
			}, {
				icon: '',
				link: 'work'
			}, {
				label: 'projects',
				link: 'project'
			}, {
				icon: '',
				link: 'contact'
			}]
		}
	},
	methods: {
		toggleMenu(){
			this.mobileMenu = !this.mobileMenu;
		},
		gotoItem(menuItem){
			this.$scrollTo('#'+menuItem.link);
			this.mobileMenu = false;
		},
		elemOffset(index){
			return this.icons[index]? this.icons[index].elem.offsetTop : 
				this.icons[index-1].elem.offsetTop + this.icons[index-1].elem.clientHeight;
		},
		handleScroll(e){
			let scrollLocation = window.scrollY + this.$el.clientHeight;

			for(var i=0; i < this.icons.length; i++){
				if(scrollLocation >= this.elemOffset(i) &&
					scrollLocation < this.elemOffset(i+1)){
					this.activeIcon = this.icons[i].link;
				}
			}
		}
	},
	created () {
	  window.addEventListener('scroll', this.handleScroll);
	},
	mounted (){
		this.icons.forEach(function(item){
			item.elem = document.getElementById(item.link);
		});
	},
	destroyed () {
	  window.removeEventListener('scroll', this.handleScroll);
	}
}
</script>

<style lang="scss">
	@media only screen and (max-width: 500px) {
	    .navigation {
	    	display: none;
	    }

	    .mobile-navigation {
	    	display: block;
	    	color: white;
    		font-size: 1.5em;

    		&:hover {
    			cursor: pointer;
    		}
	    }
	}

	@media only screen and (min-width: 500px) {
	    .navigation {
	    	display: block;
	    }

	    .mobile-navigation {
	    	display: none;
	    }
	}

	.header {
		position: fixed;
		display: flex;
	    align-items: center;
	    justify-content: space-between;
	    padding: 5px 16px;
		z-index: 200;
		color: darkcyan;
		left: 0;
    	right: 0;
    	transition: all 0.5s ease;

    	&.home {
			padding: 1em;

    		a.active {
				border-bottom: 1px solid white;
			}

			a, a.symbol {
				color: white;
				text-shadow: 1px 1px darkcyan;
			}
    	}

    	&.experience, &.project {
    		background: white;
    	}

    	&.work {
			background: lightgray;
    	}

    	&.contact {
			background: lightblue;
    	}

    	a {
    		color: #40798C;    
    		text-shadow: 0px 1px #70A9A1;

    		&.active {
				border-bottom: 1px solid #40798C;    			
    		}

    		&.active:hover {
				cursor: default;
				opacity: 1;
			}

			&.symbol {
				display: flex;
				font-family: serif;
	    		font-size: 2em;
	    		text-shadow: 1px 1px #70A9A1;

	    		.chi {
	    			line-height: 20px;
	    		}
			}
    	}

		.navigation {
			font-variant: all-petite-caps;

			a {
				padding: .5em;
			}
		}

		.mobile-menu {
			display: flex;
			flex-direction: column;
	    	position: fixed;
	    	background: #0B2027;
	    	color: white;
	    	top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    z-index: 500;
			font-variant: all-petite-caps;
			text-align: left;
			padding: 2em;

			div, a {
				font-size: 20px;
    			padding: 20px;
			}

			a {
    			border-bottom: 1px solid #40798C;

				&:focus {
					background: #40798C;
				}
			}

			.cancel {
				text-align: right;
			}
	    }
	}

</style>