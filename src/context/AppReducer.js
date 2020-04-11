export default (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true
      }
    case 'SIGNED_IN':
      return {
        ...state,
        error: '',
        isLoading: false,
        isLogged: true
      }
    case 'SIGN_IN_REJECTED':
      return {
        ...state,
        error: '',
        isLoading: false,
        isLogged: false
      }
    case 'SIGN_OUT':
      return {
        ...state,
        error: '',
        isLogged: false
      }
    case 'GET_HABITS':
      return {
        ...state,
        isLoading: false,
        error: '',
        habits: action.payload
      }
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case 'ADD_HABIT':
      return {
        ...state,
        habits: action.payload
      }
    case 'DELETING_HABIT':
      return {
        ...state, 
        isDeleting: action.payload
      }
    default:
      return state
  }
}
