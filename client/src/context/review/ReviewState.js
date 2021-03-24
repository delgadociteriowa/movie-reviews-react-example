import React, { useReducer } from 'react';
import axios from 'axios';
import ReviewContext from './reviewContext';
import ReviewReducer from './reviewReducer';
import {
  GET_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_REVIEW,
  FILTER_REVIEWS,
  CLEAR_REVIEWS,
  CLEAR_FILTER,
  REVIEW_ERROR
} from '../types';

// id: 1,
// movieName: 'Tarzan',
// movieYear: '1999',
// reviewTitle: 'A good movie',
// reviewText: 'A Lorem ipsun dolor sit amet',
// reviewRate: '8'

const ReviewState = props => {
  const initialState = {
    reviews: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ReviewReducer, initialState);

  // Get Reviews
  const getReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      dispatch({ type: GET_REVIEWS, payload: res.data});
    } catch (err) {
      dispatch({ type: REVIEW_ERROR, payload: err.response.msg})
    }
  }

  // Add Review
  const addReview = async review => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/reviews', review, config);
      dispatch({ type: ADD_REVIEW, payload: res.data});
    } catch (err) {
      dispatch({ type: REVIEW_ERROR, payload: err.response.msg})
    }
  }

  // Delete Review
  const deleteReview = async id => {
    try {
      await axios.delete(`/api/reviews/${id}`);
      dispatch({
        type: DELETE_REVIEW,
        payload: id 
      })
    } catch (err) {
      dispatch({ type: REVIEW_ERROR, payload: err.response.msg})
    }

  }

  // Update Review
  const updateReview = async review => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/reviews/${review._id}`, review, config);
      dispatch({ type: UPDATE_REVIEW, payload: res.data});
    } catch (err) {
      dispatch({ type: REVIEW_ERROR, payload: err.response.msg})
    }
  }

  // Clear Reviews
  const clearReviews = () => {
    dispatch({ type: CLEAR_REVIEWS })
  }

  // Set Current Review
  const setCurrent = review => {
    dispatch({ type: SET_CURRENT, payload: review })
  }

  // Clear Current Review
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Filter Reviews
  const filterReviews = text => {
    dispatch({ type: FILTER_REVIEWS, payload: text })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getReviews,
        addReview,
        deleteReview,
        setCurrent,
        clearCurrent,
        updateReview,
        filterReviews,
        clearFilter,
        clearReviews
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  )
};

export default ReviewState