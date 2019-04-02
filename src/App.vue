<template lang="pug">
div#app
  app-header
  home-section
  experience-section
  work-section
  project-section
  contact-section
</template>

<script>
  import AppHeader from './components/_header'
  import HomeSection from './components/Home'
  import ExperienceSection from './components/Experience'
  import WorkSection from './components/Work'
  import ProjectSection from './components/Projects'
  import ContactSection from './components/Contact'
export default {
  components: {
    AppHeader,
    HomeSection,
    ExperienceSection,
    WorkSection,
    ProjectSection,
    ContactSection
  },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
@import './reset';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  text-decoration: none;

  &:hover {
    opacity: 0.75;
    cursor: pointer;
  }
}

p {
    line-height: 20px;
}

section {
    padding-bottom: 2em;
}

.title {
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: 3em;
    padding: 1em 0 0.5em;
    font-variant: all-petite-caps;
}
.tagline {
    font-family: 'Montserrat', Arial, sans-serif;
    margin-bottom: 2em;

    a {
      color: #40798C;
    }
}
.item-title {
  font-size: 2em;
    font-variant: all-petite-caps;
    font-family: 'Montserrat', Arial, sans-serif;

}
</style>
