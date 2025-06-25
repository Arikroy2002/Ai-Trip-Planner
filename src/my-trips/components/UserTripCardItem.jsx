import React from 'react'
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';
function UserTripCardItem({trip}) {
    const[photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        GetPlacePhoto();
    },[trip])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            const Photourl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(Photourl)
        })
    }
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all hover-shadow-md'>
        <img src={photoUrl?photoUrl:'/ai-generated-8131428_1280.webp'} className='object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'> {trip?.userSelection.noOfDays} Days Trip with {trip?.userSelection?.budget} budget </h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem