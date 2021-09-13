<template lang="pug">
.uk-section.uk-section-default
  .uk-container.uk-container-small.uk-position-relative
    ul
      li(v-for='content in contents', :key='content.id')
        NuxtLink(:to='`/blogs/${content.id}`') {{ content.title }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData({ app: { $accessor } }) {
    const titles: Array<string> = $accessor.titles
    const slugs: Array<string> = $accessor.slugs
    const contents: Array<{
      id: string
      title: string
    }> = slugs.map((slug, index) => {
      return {
        id: slug,
        title: titles[index],
      }
    })

    return { contents }
  },
})
</script>
