<template>
  <div v-if="isAuthenticated" class="home-page">
    <h1>Каталог фильмов</h1>

    <div class="search-bar">
      <input
        type="text"
        placeholder="Поиск фильмов..."
        v-model="searchTerm"
        @input="onSearch"
      />
    </div>

    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <div class="movie-info">
          <h2>{{ movie.title }}</h2>
          <p>Год выпуска: {{ movie.release_date.slice(0, 4) }}</p>
          <p>Рейтинг: {{ movie.vote_average }}</p>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="onPageChanged(currentPage - 1)"
      >
        Предыдущая
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="onPageChanged(currentPage + 1)"
      >
        Следующая
      </button>
    </div>
  </div>
  <div v-else>
    <el-form
      class="main-form"
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      @submit.prevent="handleSubmit"
    >
      <h2>Авторизация</h2>
      <el-form-item
        class="el-form-item"
        prop="username"
        label="Логин:"
        label-width="120px"
      >
        <el-input
          class="input"
          v-model="loginForm.username"
          placeholder="Введите логин"
        ></el-input>
      </el-form-item>

      <el-form-item
        class="el-form-item"
        prop="password"
        label="Пароль:"
        label-width="120px"
      >
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="Введите пароль"
        ></el-input>
      </el-form-item>
      <div v-show="errorMessage" class="error">
        {{ errorMessage }}
      </div>
      <div>
        <el-button type="primary" native-type="submit">Войти</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      searchTerm: "",
      loginForm: {
        username: "",
        password: "",
      },
      errorMessage: null,
      rules: {
        username: [
          {
            required: true,
            message: "Пожалуйста, введите логин",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Пожалуйста, введите пароль",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem("isLoggedIn") === "true";
    },
  },
  methods: {
    async fetchMovies() {
      try {
        const apiKey = "Ключ";
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.currentPage}&query=${this.searchTerm}`
        );
        this.movies = response.data.results;
        this.totalPages = response.data.total_pages;
      } catch (error) {
        console.error("Ошибка при получении фильмов:", error);
      }
    },
    onSearch() {
      this.currentPage = 1;
      this.fetchMovies();
    },
    onPageChanged(page) {
      this.currentPage = page;
      this.fetchMovies();
    },
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.errorMessage = null;

          if (
            this.loginForm.username === "pepa" &&
            this.loginForm.password === "qwerty"
          ) {
            localStorage.setItem("isLoggedIn", "true");
            this.fetchMovies(); 
          } else {
            this.errorMessage = "Введены неверные данные";
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.main-form {
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 26%;
}
.el-form-item__content {
  justify-content: center;
  align-items: center;
  flex: none;
}
</style>