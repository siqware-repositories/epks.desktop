import $http from "../../boot/http_request";
export async function storeGradeDetail({ commit }, data) {
  try {
    const res = await $http.post("/grade-detail", data);
    commit("SET_GRADE_DETAIL", res.data);
  } catch (e) {
    return false;
  }
}

export async function indexGradeDetail({ commit }) {
  try {
    const res = await $http.get("/grade-detail");
    commit("GET_GRADE_DETAIL", res.data);
  } catch (e) {
    return false;
  }
}
export async function destroyGradeDetail({},index) {
  try {
    await $http.delete("/grade-detail/"+index);
  } catch (e) {
    return false;
  }
}
