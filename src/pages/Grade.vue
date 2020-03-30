<template>
  <q-page padding>
    <q-card>
      <q-card-section class="q-py-sm">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Grade</div>
          </div>
          <div class="col-auto">
            <q-btn color="primary" @click="confirm=true" icon="add" label="Create" />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list separator class="rounded-borders">
          <q-item v-for="(i,index) in getGrade" :key="index" v-ripple clickable>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{i.name}}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  size="12px"
                  @click="destroyGrade(i.id)"
                  flat
                  dense
                  round
                  icon="delete"
                />
                <q-btn size="12px" flat dense round icon="edit" />
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
          <q-form @submit="storeGrade" class="q-gutter-md full-width">
            <q-input
              filled
              v-model="data.name"
              label="Add Grade *"
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
    getGrade() {
      return this.$store.getters["grade/getGrades"];
    }
  },
  async created() {
    await this.$store.dispatch("grade/indexGrade");
  },
  methods: {
    storeGrade() {
      let self = this;
      self.$store.dispatch("grade/storeGrade", self.data).then(function() {
        self.$q.notify({
          message: "Was Added",
          position: "top",
          color: "positive"
        });
        self.confirm = false;
      });
    },
    destroyGrade(id) {
      let self = this;
      self.$q
        .dialog({
          title: "Confirm",
          message: "Do you want to delete?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          self.$store.dispatch("grade/destroyGrade", id).then(function() {
            self.$store.dispatch("grade/indexGrade").then(function() {
              self.$q.notify({
                message: "Was deleted",
                position: "top",
                color: "negative"
              });
            });
          });
        });
    }
  }
};
</script>

<style>
</style>