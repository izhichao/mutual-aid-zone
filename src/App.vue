<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useUser } from './composables/useUser';
const { handleFirstIn } = useUser();
handleFirstIn();
</script>
