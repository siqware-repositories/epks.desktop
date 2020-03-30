<template>
  <q-page padding>
    <q-card>
      <q-card-section class="q-py-sm">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Grade Detail</div>
          </div>
          <div class="col-auto">
            <q-btn color="primary" @click="confirm=true" icon="add" label="Create" />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list separator class="rounded-borders">
          <q-item v-for="(i,index) in getGradeDetail" :key="index" v-ripple clickable>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{i.name}}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn size="12px" @click="destroyGradeDetail(i.id)" flat dense round icon="delete" />
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
            <q-select
              filled
              clearable
              v-model="data.grade"
              use-input
              input-debounce="0"
              label="Select Grade"
              :options="options"
              @filter="filterFn"
              lazy-rules
              :rules="[ val => !!val || 'Please type something']"
              class="full-width"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
            clearable
              filled
              v-model="data.name"
              label="Add Grade Detail"
              lazy-rules
              :rules="[ val => !!val || 'Please type something']"
              class="full-width"
            />
            <div align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Save" type="submit" color="primary" />
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
      options: this.filterGrade,
      data: {
        name: "",
        grade: ''
      }
    };
  },
  computed: {
    getGrade() {
      return this.$store.getters["grade/getGrades"];
    },
    getGradeDetail() {
      return this.$store.getters["grade_detail/getGradeDetails"];
    },
    filterGrade() {
      return this.getGrade.map(function(x) {
        return {
          label: x.name,
          value: x.id
        };
      });
    }
  },
  async created() {
    await this.$store.dispatch("grade/indexGrade");
    await this.$store.dispatch("grade_detail/indexGradeDetail");
  },
  methods: {
    storeGrade() {
      let self = this;
      self.$store.dispatch("grade_detail/storeGradeDetail", self.data).then(function() {
        self.$q.notify({
          message: "Was Added",
          position: "top",
          color: "positive"
        });
        self.confirm = false;
      });
    },
    destroyGradeDetail(id) {
      let self = this;
      self.$q
        .dialog({
          title: "Confirm",
          message: "Do you want to delete?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          self.$store.dispatch("grade_detail/destroyGradeDetail", id).then(function() {
            self.$store.dispatch("grade_detail/indexGradeDetail").then(function() {
              self.$q.notify({
                message: "Was deleted",
                position: "top",
                color: "negative"
              });
            });
          });
        });
    },
    filterFn(val, update) {
      let self = this;
      if (val === "") {
        update(() => {
          self.options = self.filterGrade;

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        self.options = self.filterGrade.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
      });
    }
  }
};
</script>

<style>
</style>