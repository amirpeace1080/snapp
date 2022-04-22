<template>
  <!-- <div class="container mt-4">
    <v-text-field></v-text-field>

    <v-btn class="mr-4"> submit </v-btn>
    <br /><br /><br />
  </div> -->
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login or Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="phone"
                    name="login"
                    label="Phone Number"
                    type="tel"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="goPage">Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "AddPhone",
  data() {
    return {
      phone: null,
    };
  },
  methods: {
    goPage() {
      let cellphone = this.phone;
      this.$store
        .dispatch("phone", { cellphone })
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
