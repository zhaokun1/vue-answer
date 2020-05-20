<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<style lang="scss">
@import '@/base.scss';
* {
    margin: 0;
    padding: 0;
}
html,
body {
    background-color: $bg;
    height: 100%;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
    color: #fff;
}
</style>

