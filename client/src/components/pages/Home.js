import React, { useContext, useEffect } from 'react';
import Reviews from '../reviews/Reviews';
import ReviewForm from '../reviews/ReviewForm';
import ReviewFilter from '../reviews/ReviewFilter';
import AuthContext from '../../context/auth/authContext';

export const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div>
        <ReviewForm/>
      </div>
      <div>
        <ReviewFilter />
        <Reviews />
      </div>
    </div>
  )
}

export default Home