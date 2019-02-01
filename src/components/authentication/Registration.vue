<template>
<v-container fluid>
    <div  v-if="loading === true" > 
      <preloader-component></preloader-component>
    </div>

    <div v-if="requestError">
      <error-alert @dismissed="onDismissed" :text='requestError'></error-alert>
    </div>
    
    <v-container> 
      <v-layout justify-center>
        <v-flex xs12 md6 >
          <h1 class="text-xs-center login-header text-uppercase">Register</h1>
          <form class="login-form">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              label="Password"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :append-icon="show1 ? 'visibility_off' : 'visibility'"

            ></v-text-field>
            <v-text-field
              v-model="repeatPassword"
              :error-messages="repeatPasswordErrors"
              label="Repeat password"
              required
              @input="$v.repeatPassword.$touch()"
              @blur="$v.repeatPassword.$touch()"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              :append-icon="show2 ? 'visibility_off' : 'visibility'"
            ></v-text-field>
            <div class="text-xs-right">
              <v-btn @click="clear">cancel</v-btn>
              <v-btn @click="register" color ="info" >Register</v-btn>
            </div>
          </form>
          <p>If you allready have an account, please<router-link to='/'> Login</router-link> </p>
        </v-flex>
      </v-layout>
    </v-container> 
</v-container>
</template>

<script>

  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, sameAs} from 'vuelidate/lib/validators'

  export default {
     mixins: [validationMixin],

     validations: {
      email: { required, email },
      password: { required },
      repeatPassword: {
      sameAsPassword: sameAs('password')
    }
    },

    data: () => ({
      email: '',
      password:'',
      repeatPassword: '',
      show1: false,
      show2: false,
    }),

     computed: {
      registered(){
          this.$store.state.registered
      },
      requestError(){
          return this.$store.getters.requestError
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      repeatPasswordErrors () {
        const errors = []
        if (!this.$v.repeatPassword.$dirty) return errors
        !this.$v.repeatPassword.sameAsPassword && errors.push('Password must be identical.')
        return errors
      },
      userRegistration() {
        return this.$store.getters.userRegistration;
      },
      loading(){
        return this.$store.getters.loading;
      }
    },
    watch: {
      userRegistration(value) {
        if (value === true ) {
          this.$router.push("/");
          }
        }
    },
    methods: {
      register() {
        this.$v.$touch()
        if (!this.emailErrors.length && 
        !this.passwordErrors.length && 
        !this.repeatPasswordErrors.length) {
            const dataForLogin = {
              username:this.email,
              password:this.password
            }
            console.log(dataForLogin);
            this.$store.dispatch('register', dataForLogin)
        }
      },
      clear() {
        this.$v.$reset()
        this.password = ''
        this.email = ''
      },
      onDismissed() {
        this.$store.dispatch("clearError");
      },
    }
  }
</script>

<style>
    .login-form{
      margin-top: 50px;
    }
    .login-header {
      margin-top: 50px;
    }
</style>
