<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" v-show="sendCode === false">
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit">
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>ورود به حساب کاربری </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <validation-provider
                        v-slot="{ errors }"
                        name="password"
                        :rules="{
                          required: true,
                        }"
                      >
                        <v-text-field
                          v-model="password"
                          :error-messages="errors"
                          label="رمز عبور"
                          required
                        ></v-text-field>
                      </validation-provider>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- <v-btn color="primary" @click="forgetPassword"
                      >فراموشی رمز عبور</v-btn
                    > -->
                    <v-btn color="primary" @click="gotoPhone"
                      >ورود بارمز یک بارمصرف</v-btn
                    >
                    <v-btn
                      color="primary"
                      @click="loginWithPassword"
                      :disabled="invalid"
                      >ادامه</v-btn
                    >
                  </v-card-actions>
                </form>
              </validation-observer>
            </v-card>

            <v-card class="elevation-12" v-show="sendCode === true">
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit">
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>تایید شماره</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <!-- <span
                      >کد تایید به شماره {{ this.$route.params }} ارسال
                      گردید</span
                    > -->
                    <v-form>
                      <validation-provider
                        v-slot="{ errors }"
                        name="password"
                        :rules="{
                          required: true,
                        }"
                      >
                        <v-text-field
                          v-model="code"
                          :error-messages="errors"
                          label="کد تایید"
                          required
                        ></v-text-field>
                      </validation-provider>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="goPage" :disabled="invalid"
                      >ادامه</v-btn
                    >
                  </v-card-actions>
                </form>
              </validation-observer>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { required, digits, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

export default {
  name: "VerifyPhone",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      sendCode: false,
      password: "",
    };
  },
  methods: {
    gotoPhone() {
      this.sendCode = true;
      let cellphone = this.$route.params;
      console.log(typeof cellphone);
      let optionalLoginToken = true;
      this.$store
        .dispatch("phone", { cellphone, optionalLoginToken })
        .then(() => {
          // window.location = "/";
          // console.log(res);
          this.$router.push("/verifyPhone");
          // this.storeme();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    loginWithPassword() {
      let cellphone = this.$route.params;
      let pass = this.password;
      this.$store
        .dispatch("loginWithPassword", { cellphone, pass })
        .then(() => {
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    console.log(this.$route.params);
  },
};
</script>

<style></style>
