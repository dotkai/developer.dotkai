<template lang="pug">
footer
	div.copyright &copy; Created by Kai Austin 2018
	div
		a.social-link(v-for="link in social" :href="link.link")
			i.fa(:class="link.icon")
</template>


<script>

	export default {
		data(){
			return {
				social: [{
					name: 'Facebook',
					link: 'https://www.facebook.com/dotkaisonderlings',
					icon: 'fa-facebook'
				}, {
					name: 'LinkedIn',
					link: 'https://www.linkedin.com/in/kai-austin-9878a949',
					icon: 'fa-linkedin'
				}, {
					name: 'Twitter',
					link: 'https://twitter.com/dotkaidom',
					icon: 'fa-twitter'
				}, {
					name: 'Amazon',
					link: 'https://www.amazon.com/Kai-Austin/e/B00XX8O6NS',
					icon: 'fa-amazon'
				}]
			}
		}
	}

</script>


<style lang="scss">

	footer {
		display: flex;
		padding: 1em;
	    justify-content: center;
	    align-items: center;
		font-size: 10px;
		color: white;
		background: #0B2027;	

		.copyright {
			&:after {
				content:'\00B7';
				padding-left: 10px;
			}
		}

	    a.social-link {
		  margin: 0.5em;
		  padding: 0.5em;
		  color: white;		  
		  // text-shadow: 2px 2px 3px rgba(255,255,255,1);


		  &:hover {
			  color: black;
			}
		}
	}

</style>