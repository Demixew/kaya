<script setup lang="ts">
// Импортируем наш будущий компонент редактора
import DocumentEditor from '@/components/DocumentEditor.vue';
</script>

<template>
  <main class="main-container">
    <h1>Добро пожаловать в Kaya!</h1>
    <p>Это базовый каркас твоего фронтенд-приложения.</p>
    <DocumentEditor />
  </main>
</template>

<style>
/* Добавим немного стилей для красоты */
.main-container {
  max-width: 800px;
  margin: 40px auto;
  font-family: sans-serif;
  color: #333;
}
</style>