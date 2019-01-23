<template>
<v-container > 
  <v-layout justify-center>
    <v-flex xs12 md6 >
      <h1 class="text-xs-center login-header text-uppercase">Login</h1>
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
        ></v-text-field>
        <div class="text-xs-right">
          <v-btn @click="clear">cancel</v-btn>
          <v-btn @click="logIn" color ="info" >submit</v-btn>
        </div>
      </form>
      <p>You dont`t have account? <router-link to='/registration'> You can create one!</router-link> </p>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>

  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
     mixins: [validationMixin],

     validations: {
      email: { required, email },
      password: { required },
    },

    data: () => ({
      email: '',
      password: '',
    }),

    computed: {
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
      user() {
        return this.$store.getters.user;
      },
    },
    watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/home");
        }
      }
    },
    methods: {
      logIn() {
        this.$v.$touch()
        if (!this.emailErrors.length && !this.passwordErrors.length) {
            const dataForLogin = {
              username:this.email,
              password:this.password
            }
            console.log(dataForLogin)
            this.$store.dispatch('login', dataForLogin);
        }
        
      },
      clear () {
        this.$v.$reset()
        this.password = ''
        this.email = ''
      }
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
