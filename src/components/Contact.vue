<template lang="pug">
section#contact
	div
		h1.title contact
		div.tagline Why yes, I am available for hire.
		form(id="contactForm" action="https://formspree.io/dotkaimail@gmail.com" method="POST")
			div.row
				input(type="text" name="name" placeholder="Name*" v-model="name" required)
				input(type="email" name="_replyto" placeholder="Email*" v-model="email" required)
			div.row
				input(type="text" name="subject" placeholder="Subject*" v-model="subject" required)
			div.row
				textarea(name="message" v-model="message" placeholder="Message*")
			div.row
				input(type="submit" value="Send" :disabled="!(name && email && subject && message)")
	app-footer
</form>
</template>

<script>
	import AppFooter from './_Footer'
export default {
	components: {
		AppFooter
	},
	data(){
		return {
			name: '',
			email: '',
			subject: '',
			message: ''
		}
	}
}
</script>

<style lang="scss">
#contact {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: lightblue;
	min-height: 100%;
	padding-bottom: 0;

	form {
		display: flex;
		flex-direction: column;
		max-width: 500px;
		margin: 0 auto;

		input, textarea {
			flex-grow: 1;
			margin: 0.5em;
		    -webkit-transition: all 0.30s ease-in-out;
		    -moz-transition: all 0.30s ease-in-out;
		    -ms-transition: all 0.30s ease-in-out;
		    -o-transition: all 0.30s ease-in-out;
		    outline: none;
		    box-sizing: border-box;
		    -webkit-box-sizing: border-box;
		    -moz-box-sizing: border-box;
		    width: 100%;
		    background: #fff;
		    border: 1px solid #ccc;
		    padding: 14px;
		    color: #555;
		    font: 95% Arial, Helvetica, sans-serif;
		}

		input:focus, textarea:focus {
			box-shadow: 0 0 5px darkcyan;
		    padding: 16px;
		    border: 1px solid darkcyan;
		}

		input[type="submit"] {
			box-sizing: border-box;
		    -webkit-box-sizing: border-box;
		    -moz-box-sizing: border-box;
		    width: 100%;
		    padding: 14px;
		    background: darkcyan;
		    border-bottom: 2px solid darkcyan;
		    border-top-style: none;
		    border-right-style: none;
		    border-left-style: none;    
		    color: #fff;

		    &:hover {
		    	background: #006161;
		    }

		    &:disabled {
		    	background: lightgrey;
		    	opacity: 0.7;
		    	border-bottom: 2px solid grey;
		    }
		}

		.row {
			display: flex;
		}
	}
}

</style>