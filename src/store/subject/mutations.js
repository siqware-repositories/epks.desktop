export function SET_SUBJECT(state, payload) {
    state.subjects.unshift(payload)
}
export function GET_SUBJECT(state, payload) {
    state.subjects = payload
}