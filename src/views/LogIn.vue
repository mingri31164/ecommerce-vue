<template>
  <vue-particles class="vue-particles" color="#8EB5C9" :particleOpacity="0.7" :particlesNumber="150" shapeType="star"
                 :particleSize="4" linesColor="#8EB5C9" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
                 :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" ref="particles">
  </vue-particles>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{active:isLogin}">
        <!--登录-->
        <div class="big-contain" key="bigContainLogin" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="email" placeholder="用户名" v-model="name">
            <span class="errTips" v-if="nameError">* 用户名不能为空 *</span>
            <span class="errTips" v-if="loginError">* 账号或密码错误 *</span>
            <input type="password" placeholder="密码" v-model="password">
            <span class="errTips" v-if="passError">* 密码不能为空 *</span>
            <span class="errTips" v-if="loginError">* 账号或密码错误 *</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
        </div>
        <!--注册-->
        <div class="big-contain" key="bigContainRegister" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="name">
            <span class="errTips" v-if="nameError">* 用户名不能为空 *</span>
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="password" placeholder="密码" v-model="password">
            <span class="errTips" v-if="passError">* 密码不能为空 *</span>
          </div>
          <button class="bbutton" @click="register">注册</button>
        </div>


      </div>
      <div class="small-box is-dark" :class="{active:isLogin}">
        <div class="small-contain" key="smallContainRegister" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">还没有账号？点击注册！</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" key="smallContainLogin" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">已有账号，点击登录！</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      isLogin:true,
      nameError: false,
      passError: false,
      loginError: false,
      existed: false,
      name: '',
      password: '',
      userId: '',
    }
  },
  mounted() {
    document.title = "Shopping"
  },
  methods: {
    changeType() {
      this.isLogin = !this.isLogin
      this.name = ''
      this.password = ''
      this.nameError = false
      this.passError = false
      this.loginError = false
      this.existed = false
    },
    async login() {
      const { name, password } = this
      if(name != "" && password != ""){
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
            alert("登录成功！")
            window.location.assign('/')
          } else {
            this.loginError = true
            this.nameError = false
            this.passError = false
            alert("账号或密码错误！")
            console.log("login fail, server error");
          }
        }).catch(err => {
          console.log(err);
        })
      }
      else if(name == ""){
        this.loginError = false
        this.nameError = true
      }
      else if(password == ""){
        this.loginError = false
        this.passError = true
      }
    },


    async register() {
      const { name, password } = this
      if(name != "" && password != ""){
        await axios.get('/api/user/register', {
          params: {
            name,
            password
          }
        }).then(res => {
          if (res.data != 'isexist') {
            alert("注册成功")
            this.name = ''
            this.password = ''
            this.isLogin = true
          } else {
            this.existed = true
            this.nameError = false
            this.passError = false
            alert('账号已存在')
            console.log("注册失败");
          }
        }).catch(err => {
          console.log(err);
        })
      }
      else if(name == ""){
        this.loginError = false
        this.nameError = true
      }
      else if(password == ""){
        this.loginError = false
        this.passError = true
      }
    },
  }
}
</script>



<style scoped="scoped">
#particles-js {
  position: absolute; /* 为防止页面有其他的内容时会挤下去 */
  height: 69.5vh;
  width: 100%;
  overflow: hidden;
}

.login-register{
  width: 100vw;
  height: 69.5vh;
  box-sizing: border-box;
}
.contain{
  width: 40%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.big-box{
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle{
  font-size: 1.5em;
  font-weight: bold;
  //color: rgb(57,167,176);
  color: #363636;
}
.bform{
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips{
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input{
  width: 50%;
  height: 40%;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton{
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  //background-color: rgb(57,167,176);
  background-color: #56CCF2;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box{
  width: 30%;
  height: 100%;
  //background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
  background-color: #363636;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle{
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent{
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton{
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active{
  left: 0;
  transition: all 0.5s;
}
.small-box.active{
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>