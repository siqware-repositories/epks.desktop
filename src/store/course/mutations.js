export function SET_COURSE(state, payload) {
    state.courses.unshift(payload)
}
export function GET_COURSE(state, payload) {
    state.courses = payload
}