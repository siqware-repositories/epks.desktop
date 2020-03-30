export function SET_GRADE_DETAIL(state, payload) {
    state.grade_details.unshift(payload)
}
export function GET_GRADE_DETAIL(state, payload) {
    state.grade_details = payload
}