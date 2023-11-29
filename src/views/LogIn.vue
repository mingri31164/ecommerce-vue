<template>
  <div class="page-login">
    <form class="login-form" @submit.prevent="login">
      <h1>登录</h1>
      <div class="form-input-material">
        <input type="text" name="name" id="name" placeholder=" " autocomplete="off" class="form-control-material"
          v-model="name" required />
        <label for="username">账号</label>
      </div>
      <div class="form-input-material">
        <input type="password" name="password" id="password" placeholder=" " autocomplete="off"
          class="form-control-material" v-model="password" required />
        <label for="password">密码</label>
      </div>
      <button type="submit" class="button is-white" id="btn_login">登录</button>
      <p>如果还没有账号请<router-link to="/signup">注册</router-link></p>
    </form>
  </div>
</template>


<style lang="scss">
.page-login {
  justify-content: center;
  align-items: center;
  background-color: #363636;
}

#btn_login {
  width: 100%;
  display: block;
  margin: 10px 0;
}

.login-form .form-input-material {
  margin: 22px 0;
}

.btn {
  padding: 8px 20px;
  border-radius: 0;
  overflow: hidden;



  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg,
        transparent,
        var(--primary-color),
        transparent);
    transform: translateX(-100%);
    transition: 0.6s;
  }

  &:hover {
    background: transparent;
    box-shadow: 0 0 20px 10px hsla(204, 70%, 53%, 0.5);

    &::before {
      transform: translateX(100%);
    }
  }
}

.form-input-material {
  --input-default-border-color: white;
  --input-border-bottom-color: white;
  // margin: 5px;
  padding: 0.5rem 0;

  input {
    color: white;
  }
}

.login-form {
  flex-direction: column;
  align-items: center;
  padding: 4rem 4rem;
  margin-top: 3rem;
  color: white;
  background: #363636;
  border-radius: 10px;


  h1 {
    margin: 0 0 1.6rem 0;
    font-size: 2rem;
    font-weight: bolder;
  }

  // .form-input-material {
  //   margin: 12px 0;
  // }

  .btn {
    width: 100%;
    margin: 18px 0 9px 0;
  }

  a:hover {
    background: transparent;
    color: #2D9CDB;
  }
}
</style> 

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      password: '',
      userId: '',
    }
  },
  mounted() {
    document.title = "Shopping"
  },
  methods: {
    async login() {
      const { name, password } = this

      await axios.get('/api/user/login', {
        params: {
          name,
          password
        }
      }).then(res => {
        if (res.data != 'invalid') {
          this.userId = res.data
          const userState = this.$store.state
          userState.user = {
            userId: this.userId,
            name: this.name
          }
          this.$store.dispatch("saveUserInfo", userState)

          window.location.assign('/')
        } else {
          alert('Username or password is incorrect')
          console.log("login fail, server error");
        }
      }).catch(err => {
        console.log(err);
      })

    }
  }
}
</script>