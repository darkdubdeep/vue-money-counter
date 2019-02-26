<template>
  <v-container fluid>
    <div v-if="loading === true">
      <preloader-component></preloader-component>
    </div>

    <div v-if="requestError">
      <error-alert @dismissed="onDismissed" :text="requestError"></error-alert>
    </div>

    <v-container>
      <v-layout justify-center>
        <v-flex xs12 md6 lg4>
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
              :append-icon="show ? 'visibility_off' : 'visibility'"
              :error-messages="passwordErrors"
              :type="show ? 'text' : 'password'"
              label="Password"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              @click:append="show = !show"
            ></v-text-field>
            <div class="text-xs-right">
              <v-btn @click="clear">clear</v-btn>
              <v-btn @click="logIn" color="info">submit</v-btn>
            </div>
          </form>
          <p>You dont`t have account?
            <router-link to="/registration">You can create one!</router-link>
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required }
  },

  data: () => ({
    email: "",
    password: "",
    show: false
  }),

  computed: {
    requestError() {
      return this.$store.getters.requestError;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    }
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
      this.$v.$touch();
      if (!this.emailErrors.length && !this.passwordErrors.length) {
        const dataForLogin = {
          username: this.email,
          password: this.password
        };
        this.$store.dispatch("login", dataForLogin);
      }
    },
    clear() {
      this.$v.$reset();
      this.password = "";
      this.email = "";
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style>
.login-form {
  margin-top: 50px;
}
.login-header {
  margin-top: 50px;
}
</style>
