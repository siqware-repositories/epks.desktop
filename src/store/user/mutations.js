export function SET_USER(state, payload) {
    state.users.unshift(payload)
}
export function GET_USER(state, payload) {
    state.users = payload
}