<template>
  <div>
    <svg-icon icon-class="question" @click="goTarget('https://parkmycloud.atlassian.net/wiki/x/xyN_AQ')"/>
  </div>
</template>

<script>
export default {
  name: 'help-doc',
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  }
}
</script>