import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/firebaseconfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.email) {
      navigate('/');
      return;
    }

    setLoading(true);

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });

      setUserTrips(trips);
    } catch (error) {
      console.error('Error fetching user trips: ', error);
    }

    setLoading(false);
  };

  return (
    <div className='container mt-5 mx-auto px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
          {userTrips.length === 0 ? (
            <div className='col-span-full text-center'>
              <p>No trip history found</p>
            </div>
          ) : (
            userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
