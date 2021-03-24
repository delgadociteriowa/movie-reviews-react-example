import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReviewItem from './ReviewItem';
import Spinner from '../layout/Spinner';
import ReviewContext from '../../context/review/reviewContext';

export const Reviews = () => {
  const reviewContext = useContext(ReviewContext);

  const { reviews, filtered, getReviews, loading } = reviewContext;

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  },[]);

  if(reviews !== null && reviews.length === 0 && !loading) {
    return <h4>There are no reviews. Be the first one and post a review now!</h4>
  }

  return (
    <Fragment>
      {reviews !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null ? filtered.map(review => (
              <CSSTransition key={review._id} timeout={500} classNames="item">
                <ReviewItem review={review} />
              </CSSTransition>
              )) : reviews.map(review => (
              <CSSTransition key={review._id} timeout={500} classNames="item">
                <ReviewItem review={review} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      ) : <Spinner />}
    </Fragment>
  )
}

export default Reviews
