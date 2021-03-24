import {
  GET_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_REVIEW,
  FILTER_REVIEWS,
  CLEAR_FILTER,
  REVIEW_ERROR,
  CLEAR_REVIEWS
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false
      }
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
        loading: false
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review => review._id === action.payload._id ? action.payload : review),
        loading: false
      }
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload),
        loading: false
      }
    case CLEAR_REVIEWS:
      return {
        ...state,
        reviews: null,
        filtered: null,
        error: null,
        current: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case FILTER_REVIEWS:
      return {
        ...state,
        filtered: state.reviews.filter(review => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return review.movieName.match(regex) || review.movieYear.match(regex) 
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case REVIEW_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }

}