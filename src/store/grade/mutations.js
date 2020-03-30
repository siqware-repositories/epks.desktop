export function SET_GRADE(state, payload) {
    state.grades.unshift(payload)
}
export function GET_GRADE(state, payload) {
    state.grades = payload
}