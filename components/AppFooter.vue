<template lang="pug">
.uk-section.uk-section-default
  .uk-text-center
    h3.uk-h3.uk-margin-remove
    | Copyright &copy;{{ year }} #[a(href='https://twitter.com/Kotokaze__R') Kotokaze]. All rights reserved.
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      year: new Date().getFullYear(),
    }
  },
})
</script>
