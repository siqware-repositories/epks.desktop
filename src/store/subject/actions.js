import $http from "../../boot/http_request";
export async function storeSubject({ commit }, data) {
  try {
    const res = await $http.post("/subject", data);
    commit("SET_SUBJECT", res.data);
  } catch (e) {
    return false;
  }
}

export async function indexSubject({ commit }) {
  try {
    const res = await $http.get("/subject");
    commit("GET_SUBJECT", res.data); } catch (e) {
    return false;
  }
}
export async function destroySubject({},index) {
  try {
    await $http.delete("/subject/"+index);
  } catch (e) {
    return false;
  }
}
