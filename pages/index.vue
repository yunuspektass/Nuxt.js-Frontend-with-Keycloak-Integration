<template>
  <div />
</template>

<script>
export default {
  middleware({ redirect }) {
    return redirect('/login')
  }
}
</script>
