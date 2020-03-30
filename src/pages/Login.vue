<template>
  <q-page padding class="flex flex-center" style="background-image: url(../statics/login-bg.jpg)">
    <q-card
      square
      flat
      bordered
      style="width: 500px;" :class="!$q.screen.gt.sm?'full-width':''"
    >
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login"/>
        <q-tab name="register" label="Register"/>
      </q-tabs>
      <q-separator/>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <q-banner class="bg-grey-3 q-mb-lg">
            <template v-slot:avatar>
              <q-icon name="lock" color="primary"/>
            </template>
            Login to your account
          </q-banner>
          <q-form
            @submit="onSubmit"
            @reset=""
            class="q-gutter-sm"
          >
            <q-input
              dense
              clearable
              outlined
              square
              type="email"
              v-model="data.email"
              label="Your Email"
              hint="Please enter your email"
              lazy-rules
              :rules="[ val => !!val||'Please enter your email' ]"
            >
              <template v-slot:prepend>
                <q-icon name="email"/>
              </template>
            </q-input>

            <q-input
              dense
              clearable
              outlined
              square
              :type="isPwd ? 'password' : 'text'"
              v-model="data.password"
              label="Your Password"
              hint="Please enter your password"
              lazy-rules
              :rules="[val => !!val||'Please enter your password']"
            >
              <template v-slot:prepend>
                <q-icon name="lock"/>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div class="text-right">
              <q-btn label="Login" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="register">
          <q-banner class="bg-grey-3 q-mb-lg">
            <template v-slot:avatar>
              <q-icon name="people" color="primary"/>
            </template>
            Create a new account now!
          </q-banner>
          <q-form
            @submit="registerUser"
            class="q-gutter-sm"
          >
            <q-input
              dense
              clearable
              outlined
              square
              v-model="registerData.name"
              label="Your Full Name"
              hint="Please enter your full name"
              lazy-rules
              :rules="[ val => !!val||'Please enter your full name' ]"
            >
              <template v-slot:prepend>
                <q-icon name="recent_actors"/>
              </template>
            </q-input>
            <q-input
              dense
              clearable
              outlined
              square
              type="email"
              v-model="registerData.email"
              label="Your Email"
              hint="Please enter your email"
              lazy-rules
              :rules="[ val => !!val||'Please enter your email' ]"
            >
              <template v-slot:prepend>
                <q-icon name="email"/>
              </template>
            </q-input>
            <q-input
              dense
              clearable
              outlined
              square
              v-model="registerData.contact"
              label="Your Phone Number"
              hint="Please enter phone number"
              lazy-rules
              :rules="[ val => !!val||'Please enter your phone number' ]"
            >
              <template v-slot:prepend>
                <q-icon name="call"/>
              </template>
            </q-input>
            <q-select
              outlined
              square
              clearable
              dense
              v-model="registerData.grade"
              use-input
              input-debounce="0"
              label="Select Grade"
              :options="optionGradeDetail"
              @filter="filterFnGradeDetail"
              hint="Please select grade"
              lazy-rules
              :rules="[ val => !!val || 'Please select grade']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="category" />
              </template>
            </q-select>
            <q-input
              dense
              clearable
              outlined
              square
              :type="isPwd ? 'password' : 'text'"
              v-model="registerData.password"
              label="Your Password"
              hint="Please enter your password"
              lazy-rules
              :rules="[val => !!val||'Please enter your password']"
            >
              <template v-slot:prepend>
                <q-icon name="lock"/>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div class="text-right">
              <q-btn label="Register" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                isPwd: true,
                tab: 'login',
                data: {
                    email: '',
                    password: '',
                    remember_me: false
                },
                registerData: {
                    email: '',
                    password: '',
                    contact: '',
                    grade: null,
                    name: '',
                },
                optionGradeDetail: []
            }
        },
        methods: {
            onSubmit() {
                let self = this;
                self.$store.dispatch('auth/authLogin', self.data).then(function (data) {
                    if (data) {
                        if (data.message) {
                            self.$q.notify({
                                color: 'red-5',
                                textColor: 'white',
                                icon: 'warning',
                                message: data.message
                            })
                        } else {
                            self.$q.notify({
                                color: 'green-4',
                                textColor: 'white',
                                icon: 'cloud_done',
                                message: 'Logging in.....'
                            });
                            window.location.href = "/"
                        }
                    } else {
                        self.$q.notify({
                            color: 'red-5',
                            textColor: 'white',
                            icon: 'warning',
                            message: 'Please check input again!'
                        })
                    }
                })
            },
            registerUser() {
                let self = this;
                self.$store.dispatch('auth/authRegister', self.registerData).then(function (data) {
                    if (data) {
                        if (data.message) {
                            self.$q.notify({
                                color: 'red-5',
                                textColor: 'white',
                                icon: 'warning',
                                message: data.message
                            })
                        } else {
                            self.$q.notify({
                                color: 'green-4',
                                textColor: 'white',
                                icon: 'cloud_done',
                                message: 'Logging in.....'
                            });
                            window.location.href = "/"
                        }
                    } else {
                        self.$q.notify({
                            color: 'red-5',
                            textColor: 'white',
                            icon: 'warning',
                            message: 'Please check input again!'
                        })
                    }
                })
            },
            filterFnGradeDetail(val, update) {
                let self = this;
                if (val === "") {
                    update(() => {
                        self.optionGradeDetail = self.filterGradeDetail;
                    });
                    return;
                }

                update(() => {
                    const needle = val.toLowerCase();
                    self.optionGradeDetail = self.filterGradeDetail.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
                });
            }
        },
        computed:{
            getGradeDetail() {
                return this.$store.getters["grade_detail/getGradeDetails"];
            },
            filterGradeDetail() {
                return this.getGradeDetail.map(function (x) {
                    return {
                        label: x.name,
                        value: x.id
                    };
                });
            }
        },
        async created() {
            await this.$store.dispatch("grade_detail/indexGradeDetail");
        }
    }
</script>

<style scoped>

</style>
