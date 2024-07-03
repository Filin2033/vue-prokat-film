<template>
   <el-form class="main-form"
        :model="loginForm"
        :rules="rules" 
        ref="loginForm"  
        @submit.prevent="handleSubmit"
      >
        <h2>Авторизация</h2>
        <el-form-item class="el-form-item"
          prop="username"
          label="Логин:"
          label-width="120px" 
        >
          <el-input class="input" v-model="loginForm.username" placeholder="Введите логин"></el-input>
        </el-form-item>

        <el-form-item class="el-form-item"
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
        <div v-show="errorMessage" class="error">{{ errorMessage }}</div>
        <el-form-item class="el-form-item">
          <el-button type="primary" native-type="submit">Войти</el-button>
        </el-form-item>
      </el-form>
</template>


<script>
export default {
  data() {
    return {
      loginForm: { 
        username: '',
        password: '',
      },
      errorMessage: null,
      rules: {
        username: [
          { required: true, message: 'Пожалуйста, введите логин', trigger: 'blur' } 
        ],
        password: [
          { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' }, 
        ],
      },
    };
  },
  methods: {
    handleSubmit() { 
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.errorMessage = null;

          if (this.loginForm.username === 'pepa' && this.loginForm.password === 'qwerty') { 
            localStorage.setItem('isLoggedIn', 'true');
            this.$router.push('/');
          } else {
            this.errorMessage = 'Введены неверные данные';
          }
        } else {
          return false; 
        }
      });
    },
  },
};
</script>
