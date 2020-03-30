<template>
  <q-page padding>
    <q-card>
      <q-card-section class="q-py-sm">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">User Management</div>
          </div>
          <div class="col-auto">
            <q-btn color="primary" @click="confirm=true" icon="add" label="Create" />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list separator class="rounded-borders">
          <q-item v-for="(i,index) in getUser" :key="index" v-ripple clickable class="shadow-2 q-my-sm">
            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Name</span>
              </q-item-label>
              <q-item-label>
                <span class="text-grey-14">{{i.name}}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Contact</span>
              </q-item-label>
              <q-item-label>
                <span class="text-grey-14">{{i.contact}}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Email</span>
              </q-item-label>
              <q-item-label>
                <span class="text-grey-14">{{i.email}}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Grade</span>
              </q-item-label>
              <q-item-label>
                <q-badge outline color="positive" :label="i.grade" />
              </q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Role</span>
              </q-item-label>
              <q-item-label>
                <span class="text-grey-14">{{i.role}}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Status</span>
              </q-item-label>
              <q-item-label>
                <q-badge v-if="i.status" outline color="positive" label="Activated" />
                <q-badge v-else outline color="negative" label="Inactive" />
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <!--<q-btn
                  size="12px"
                  @click="destroyUser(i.id)"
                  flat
                  dense
                  round
                  icon="delete"
                />-->
                <q-btn @click="toggleActivateUser(i.id)" size="15px" flat dense round icon="toggle_off" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <!-- add grade-->
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <q-form @submit="storeUser" class="q-gutter-md full-width">
            <q-input
              filled
              v-model="data.name"
              label="Add User *"
              lazy-rules
              :rules="[ val => !!val || 'Please type something']"
              class="full-width"
            />
            <div align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Save" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
    export default {
        data() {
            return {
                confirm: false,
                data: {
                    name: ""
                }
            };
        },
        computed: {
            getUser() {
                return this.$store.getters["user/getUsers"];
            }
        },
        async created() {
            await this.$store.dispatch("user/indexUser");
        },
        methods: {
            storeUser() {
                let self = this;
                self.$store.dispatch("user/storeUser", self.data).then(function() {
                    self.$q.notify({
                        message: "Was Added",
                        position: "top",
                        color: "positive"
                    });
                    self.confirm = false;
                });
            },
            destroyUser(id) {
                let self = this;
                self.$q
                    .dialog({
                        title: "Confirm",
                        message: "Do you want to delete?",
                        cancel: true,
                        persistent: true
                    })
                    .onOk(() => {
                        self.$store.dispatch("user/destroyUser", id).then(function() {
                            self.$store.dispatch("user/indexUser").then(function() {
                                self.$q.notify({
                                    message: "Was deleted",
                                    position: "top",
                                    color: "negative"
                                });
                            });
                        });
                    });
            },
            toggleActivateUser(id) {
                let self = this;
                self.$q
                    .dialog({
                        title: "Confirm",
                        message: "Do you want to toggle activate?",
                        cancel: true,
                        persistent: true
                    })
                    .onOk(() => {
                        self.$store.dispatch("user/toggleActivateUser", id).then(function() {
                            self.$store.dispatch("user/indexUser").then(function() {
                                self.$q.notify({
                                    message: "Was toggled",
                                    position: "top",
                                    color: "positive"
                                });
                            });
                        });
                    });
            },
        }
    };
</script>

<style>
</style>
