import $http from "../../boot/http_request";
export async function storeGrade({ commit }, data) {
  try {
    const res = await $http.post("/grade", data);
    commit("SET_GRADE", res.data);
  } catch (e) {
    return false;
  }
}

export async function indexGrade({ commit }) {
  try {
    const res = await $http.get("/grade");
    commit("GET_GRADE", res.data);
  } catch (e) {
    return false;
  }
}
export async function destroyGrade({},index) {
  try {
    await $http.delete("/grade/"+index);
  } catch (e) {
    return false;
  }
}
