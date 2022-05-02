<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit">
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>ورود یا عضویت</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <validation-provider
                        v-slot="{ errors }"
                        name="phone"
                        :rules="{
                          required: true,
                          digits: 11,
                        }"
                      >
                        <v-text-field
                          v-model="phone"
                          :counter="11"
                          :error-messages="errors"
                          label="شماره تلفن همراه"
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
  name: "AddPhone",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      phone: null,
    };
  },
  methods: {
    goPage() {
      let cellphone = this.phone;
      let optionalLoginToken = false;
      this.$store
        .dispatch("phone", { cellphone, optionalLoginToken })
        .then(() => {
          // window.location = "/";
          // console.log(res);
          this.$router.push({ name: "VerifyPhone", params: { cellphone } });
          // this.storeme();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // storeme: function () {
    //   this.$store.dispatch("storeme").then(() => {
    //     // console.log(res);
    //     window.location = "/";
    //   });
    // },
  },
};
</script>

<style></style>
