<template lang="pug">
#offcanvas-nav(uk-offcanvas='flip: true; overlay: true')
  .uk-offcanvas-bar
    ul.uk-nav
      li
        a(href='#')
        | #[span.uk-margin-small-right(uk-icon='icon: home')] Home
      li
        a(href='#')
        | #[span.uk-margin-small-right(uk-icon='icon: info')] About
      li
        a(href='#')
        | #[span.uk-margin-small-right(uk-icon='icon: location')] Contact
</template>
