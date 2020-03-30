import $http from "../../boot/http_request";
export async function storeCourse({ commit }, data) {
  try {
    const res = await $http.post("/course", data);
    commit("SET_COURSE", res.data);
  } catch (e) {
    return false;
  }
}

export async function updateCourse({ commit }, data) {
  try {
    const res = await $http.put("/course/"+data.id,data);
  } catch (e) {
    return false;
  }
}

export async function indexCourse({ commit }) {
  try {
    const res = await $http.get("/course");
    commit("GET_COURSE", res.data); } catch (e) {
    return false;
  }
}
export async function destroyCourse({},index) {
  try {
    await $http.delete("/course/"+index);
  } catch (e) {
    return false;
  }
}
