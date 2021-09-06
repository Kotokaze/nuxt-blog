<template lang="pug">
.uk-container.uk-container-expand
  nav(uk-navbar)
    .uk-navbar-left
      NuxtLink.uk-navbar-item.uk-logo(to='/')
        img(src='/icon.png', alt='logo', width='28', height='34')
        | Kotokaze's Blog

    .uk-navbar-right
      ul.uk-navbar-nav(class='uk-visible@m')
        li
          NuxtLink(to='#') Blog
        li
          NuxtLink(to='#') About
        li
          NuxtLink(to='#') Contact
      a(class='uk-hidden@m', uk-toggle='target: #offcanvas-nav', uk-navbar-toggle-icon)
</template>
