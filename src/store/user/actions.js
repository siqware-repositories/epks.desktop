import $http from "../../boot/http_request";

export async function storeUser({commit}, data) {
  try {
    const res = await $http.post("/user", data);
    commit("SET_USER", res.data);
  } catch (e) {
    return false;
  }
}

export async function indexUser({commit}) {
  try {
    const res = await $http.get("/user");
    commit("GET_USER", res.data);
  } catch (e) {
    return false;
  }
}

export async function toggleActivateUser({}, id) {
  try {
    await $http.post("/user-toggle-activate/" + id);
  } catch (e) {
    return false;
  }
}

export async function destroyUser({}, index) {
  try {
    await $http.delete("/user/" + index);
  } catch (e) {
    return false;
  }
}
