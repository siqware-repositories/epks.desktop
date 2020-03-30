<template>
  <q-page padding>
    <q-card>
      <q-card-section class="q-py-sm">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Course</div>
          </div>
          <div class="col-auto">
            <q-btn color="primary" @click="confirm=true" icon="add" label="Create"/>
          </div>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-list separator>
          <q-item v-for="(i,index) in getCourse" :key="index" v-ripple clickable class="q-mb-xs shadow-1">
            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Grade</span>
              </q-item-label>
              <q-item-label>
                <span class="text-grey-10">{{i.grade_detail.name}}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Subject</span>
              </q-item-label>

              <q-item-label>
                <span class="text-grey-10">{{i.name}}</span>
              </q-item-label>

            </q-item-section>
            <q-item-section top>
              <q-item-label>
                <span class="text-weight-medium">Teacher</span>
              </q-item-label>
              <q-item-label>
                <span class="text-grey-10">{{i.user.name}}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  size="12px"
                  @click="destroyCourse(i.id)"
                  flat
                  dense
                  round
                  icon="delete"
                />
                <q-btn size="12px" @click="edit(i)" flat dense round icon="edit"/>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <!-- add course-->
    <q-dialog
      v-model="confirm"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <div>Add Course</div>

          <q-space/>

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" @click="data.subject_details = []" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="row items-center">
          <q-form @submit="storeCourse" class="full-width">
            <div class="row q-col-gutter-xs">
              <div class="col-4">
                <q-select
                  outlined
                  clearable
                  dense
                  square
                  v-model="data.grade_detail"
                  use-input
                  input-debounce="0"
                  label="Select Grade"
                  :options="optionGradeDetail"
                  @filter="filterFnGradeDetail"
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
              </div>
              <div class="col-4">
                <q-select
                  label="Add Subject"
                  outlined
                  dense
                  square
                  v-model="data.subject"
                  use-input
                  use-chips
                  input-debounce="0"
                  @new-value="createValue"
                  :options="optionSubject"
                  @filter="filterFnSubject"
                  class="full-width"
                  lazy-rules
                  :rules="[ val => !!val || 'Please type something']"
                />
              </div>
              <div class="col-4">
                <q-select
                  outlined
                  clearable
                  dense
                  square
                  v-model="data.teacher"
                  use-input
                  input-debounce="0"
                  label="Select Teacher"
                  :options="optionUsers"
                  @filter="filterFnUser"
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
              </div>
            </div>
            <q-list bordered class="full-width q-mt-sm">
              <q-item-label header>Subject Detail</q-item-label>
              <q-item v-for="(i,index) in data.subject_details" :key="index" class="q-py-sm q-ma-sm shadow-2">
                <q-item-section top>
                  <q-item-label>
                    <q-input square outlined :dense="true" v-model="i.title" label="Title" lazy-rules
                             :rules="[ val => !!val || 'Please type something']"
                             class="full-width"/>
                  </q-item-label>
                  <q-item-label>
                    <q-input type="url" square outlined :dense="true" v-model="i.video" label="Video url eg. youtube.."
                             lazy-rules
                             :rules="[ val => !!val || 'Please type something']"
                             class="full-width"/>
                  </q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label>
                    <q-input type="url" square outlined :dense="true" v-model="i.attachment"
                             label="Attachment eg. google drive, dropbox.." lazy-rules
                             :rules="[ val => !!val || 'Please type something']"
                             class="full-width"/>
                  </q-item-label>
                  <q-item-label>
                    <q-input square type="number" outlined :dense="true" v-model="i.order" label="Order" lazy-rules
                             :rules="[ val => !!val || 'Please type something']"
                             class="full-width"/>
                  </q-item-label>
                </q-item-section>
                <q-item-section top>
                  <q-item-label>
                    <q-select
                      label="Publishing"
                      outlined
                      :dense="true"
                      square
                      v-model="i.publish"
                      :options="[{'label':'publish','value':true},{'label':'trash','value':false}]"
                      class="full-width"
                      lazy-rules
                      :rules="[ val => !!val || 'Please type something']"
                    />
                  </q-item-label>
                  <q-item-label>
                    <q-input
                      v-model="i.note"
                      dense
                      square
                      outlined
                      label="Note"
                      type="textarea"
                      class="full-width"
                      rows="2"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="vertical-middle">
                    <q-btn @click="removeRow(index)" size="12px" flat dense round icon="delete"/>
                  </div>
                </q-item-section>
              </q-item>
              <q-item-label header class="flex justify-end">
                <div class="text-grey-8">
                  <q-btn @click="addRow" size="12px" flat dense round icon="add"/>
                </div>
              </q-item-label>
            </q-list>
            <q-item-label header class="q-px-none q-py-sm">Course Description</q-item-label>
            <q-editor v-model="data.description" min-height="10rem"/>
            <q-separator class="q-my-sm"/>
            <div align="right">
              <q-btn flat label="Cancel" color="primary" @click="data.subject_details = []" v-close-popup/>
              <q-btn flat label="Save" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--edit course-->
    <q-dialog
      v-model="editCourse"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <div>Edit Course</div>

          <q-space/>

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" @click="data.subject_details = []" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="row items-center">
          <q-form @submit="updateCourse(data.id)" class="full-width">
            <div class="row q-col-gutter-xs">
              <div class="col-4">
                <q-select
                  outlined
                  clearable
                  dense
                  square
                  v-model="data.grade_detail"
                  use-input
                  input-debounce="0"
                  label="Select Grade"
                  :options="optionGradeDetail"
                  @filter="filterFnGradeDetail"
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
              </div>
              <div class="col-4">
                <q-select
                  label="Add Subject"
                  outlined
                  dense
                  square
                  v-model="data.subject"
                  use-input
                  use-chips
                  input-debounce="0"
                  @new-value="createValue"
                  :options="optionSubject"
                  @filter="filterFnSubject"
                  class="full-width"
                  lazy-rules
                  :rules="[ val => !!val || 'Please type something']"
                />
              </div>
              <div class="col-4">
                <q-select
                  outlined
                  clearable
                  dense
                  square
                  v-model="data.teacher"
                  use-input
                  input-debounce="0"
                  label="Select Teacher"
                  :options="optionUsers"
                  @filter="filterFnUser"
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
              </div>
            </div>
            <q-list bordered class="full-width q-mt-sm">
              <q-item-label header>Subject Detail</q-item-label>
              <q-item v-for="(i,index) in data.subject_details" :key="index" class="q-py-sm q-ma-sm shadow-2">
                <q-item-section top>
                  <q-item-label>
                    <q-input square outlined :dense="true" v-model="i.title" label="Title" lazy-rules
                             :rules="[ val => !!val || 'Please type something']"
                             class="full-width"/>
                  </q-item-label>
                  <q-item-label>
                    <q-input type="url" square outlined :dense="true" v-model="i.video" label="Video url eg. youtube.."
                             lazy-rules
                             :rules="[ val => !!val || 'Please type something']"
                             class="full-width"/>
                  </q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label>
                    <q-input type="url" square outlined :dense="true" v-model="i.attachment"
                             label="Attachment eg. google drive, dropbox.." lazy-rules
                             :rules="[ val => !!val || 'Please type something']"
                             class="full-width"/>
                  </q-item-label>
                  <q-item-label>
                    <q-input square type="number" outlined :dense="true" v-model="i.order" label="Order" lazy-rules
                             :rules="[ val => !!val || 'Please type something']"
                             class="full-width"/>
                  </q-item-label>
                </q-item-section>
                <q-item-section top>
                  <q-item-label>
                    <q-select
                      label="Publishing"
                      outlined
                      :dense="true"
                      square
                      v-model="i.publish"
                      :options="[{'label':'publish','value':true},{'label':'trash','value':false}]"
                      class="full-width"
                      lazy-rules
                      :rules="[ val => !!val || 'Please type something']"
                    />
                  </q-item-label>
                  <q-item-label>
                    <q-input
                      v-model="i.note"
                      dense
                      square
                      outlined
                      label="Note"
                      type="textarea"
                      class="full-width"
                      rows="2"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="vertical-middle">
                    <q-btn @click="removeRow(index)" size="12px" flat dense round icon="delete"/>
                  </div>
                </q-item-section>
              </q-item>
              <q-item-label header class="flex justify-end">
                <div class="text-grey-8">
                  <q-btn @click="addRow" size="12px" flat dense round icon="add"/>
                </div>
              </q-item-label>
            </q-list>
            <q-item-label header class="q-px-none q-py-sm">Course Description</q-item-label>
            <q-editor v-model="data.description" min-height="10rem"/>
            <q-separator class="q-my-sm"/>
            <div align="right">
              <q-btn flat label="Cancel" color="primary" @click="data.subject_details = []" v-close-popup/>
              <q-btn flat label="Update" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
    const stringOptions = [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
    ];
    export default {
        data() {
            return {
                confirm: false,
                editCourse: false,
                maximizedToggle: false,
                optionGradeDetail: [],
                optionSubject: [],
                optionSubjectClone: [],
                optionUsers: [],
                data: {
                    id: null,
                    uid: 1,
                    grade_detail: '',
                    teacher: null,
                    subject: null,
                    description: '',
                    subject_details: [],
                }
            };
        },
        computed: {
            getCourse() {
                return this.$store.getters["course/getCourses"];
            },
            activeUserInfo() {
                return this.$store.state.auth.AppActiveUser;
            },
            getUser() {
                return this.$store.getters["user/getUsers"];
            },
            filterGetUser() {
                return this.getUser.map(function (x) {
                    return {
                        label: x.name,
                        value: x.id
                    };
                });
            },
            getGrade() {
                return this.$store.getters["grade/getGrades"];
            },
            getSubject() {
                return this.$store.getters["subject/getSubjects"];
            },
            filterGetSubject() {
                return this.getSubject.map(function (x) {
                    return {
                        label: x.name,
                        value: x.name
                    };
                });
            },
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
            await this.$store.dispatch("subject/indexSubject");
            await this.$store.dispatch("course/indexCourse");
            await this.$store.dispatch("user/indexUser");
            this.optionSubject = this.filterGetSubject;
            this.optionSubjectClone = this.filterGetSubject;
            this.optionUsers = this.filterGetUser;
            this.data.uid = this.activeUserInfo.uid;
        },
        methods: {
            /*edit*/
            edit(data){
                let self = this;
                self.editCourse = true;
                self.data.grade_detail = {value:data.grade_detail.id,label:data.grade_detail.name};
                self.data.subject = {value:data.name,label:data.name};
                self.data.teacher = {value:data.user.id,label:data.user.name};
                self.data.description = data.description;
                self.data.id = data.id;
                data.subject_detail.forEach(function (x,index) {
                    self.data.subject_details.push({
                        title: x.title,
                        video: x.url,
                        order: x.order,
                        attachment: x.attachment,
                        publish: {'label': x.published?'publish':'trash', 'value': x.published},
                        note: x.note
                    });
                });
                console.log(self.data)
            },
            /*\edit*/

            addRow() {
                this.data.subject_details.push({
                    title: '',
                    video: '',
                    order: 0,
                    attachment: '',
                    publish: {'label': 'publish', 'value': true},
                    note: ''
                });
            },
            removeRow(index) {
                this.data.subject_details.splice(index, 1);
            },
            storeCourse() {
                let self = this;
                self.$store.dispatch("course/storeCourse", self.data).then(function () {
                    self.$q.notify({
                        message: "Was Added",
                        position: "top",
                        color: "positive"
                    });
                    self.confirm = false;
                    self.data.subject_details = [];
                });
            },
            updateCourse(id) {
                let self = this;
                self.$store.dispatch("course/updateCourse", self.data).then(async function () {
                    await self.$store.dispatch("course/indexCourse");
                    self.$q.notify({
                        message: "Was Edited",
                        position: "top",
                        color: "positive"
                    });
                    self.editCourse = false;
                    self.data.subject_details = [];
                });
            },
            destroyCourse(id) {
                let self = this;
                self.$q
                    .dialog({
                        title: "Confirm",
                        message: "Do you want to delete?",
                        cancel: true,
                        persistent: true
                    })
                    .onOk(() => {
                        self.$store.dispatch("course/destroyCourse", id).then(function () {
                            self.$store.dispatch("course/indexCourse").then(function () {
                                self.$q.notify({
                                    message: "Was deleted",
                                    position: "top",
                                    color: "negative"
                                });
                            });
                        });
                    });
            },
            createValue(val, done) {
                let self = this;
                if (val.length > 0) {
                    if (self.optionSubjectClone.some(e => e.label.replace(/^\s+|\s+$/g, "" !== val))) {
                        self.optionSubjectClone.push({label: val, value: self.optionSubjectClone.length + 1})
                    }
                    done({label: val, value: self.optionSubjectClone.length + 1}, 'toggle');
                }
            },
            filterFnSubject(val, update) {
                let self = this;
                update(() => {
                    if (val === '') {
                        self.optionSubject = self.optionSubjectClone
                    } else {
                        const needle = val.toLowerCase()
                        self.optionSubject = self.optionSubjectClone.filter(
                            v => v.label.toLowerCase().indexOf(needle) > -1
                        )
                    }
                })
            },
            filterFnUser(val, update) {
                let self = this;
                update(() => {
                    if (val === '') {
                        self.optionUsers = self.filterGetUser
                    } else {
                        const needle = val.toLowerCase()
                        self.optionUsers = self.filterGetUser.filter(
                            v => v.label.toLowerCase().indexOf(needle) > -1
                        )
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
        }
    };
</script>

<style>
</style>
