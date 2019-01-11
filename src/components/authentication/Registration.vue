<template>
<v-container > 
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
        ></v-text-field>
         <v-text-field
          v-model="repeatPassword"
          :error-messages="repeatPasswordErrors"
          label="Repeat password"
          required
          @input="$v.repeatPassword.$touch()"
          @blur="$v.repeatPassword.$touch()"
        ></v-text-field>
        <div class="text-xs-right">
          <v-btn @click="clear">cancel</v-btn>
          <v-btn @click="Register" color ="info" >Register</v-btn>
        </div>
      </form>
      <p>If you allready have an account, please<router-link to='/'> Login</router-link> </p>
    </v-flex>
  </v-layout>
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
    }),

     computed: {
      registered(){
          this.$store.state.registered
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
      }
    },
    methods: {
      Register() {
        this.$v.$touch()
        if (!this.emailErrors.length && 
        !this.passwordErrors.length && 
        !this.repeatPasswordErrors.length) {
            this.$store.dispatch('register', true)
            console.log(this.registered)
            this.$router.replace('/home')
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
