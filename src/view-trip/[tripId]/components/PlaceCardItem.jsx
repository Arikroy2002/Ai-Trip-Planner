
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
function PlaceCardItem({ place, trip}) {
    const[photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        GetPlacePhoto();
    },[place])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:place.place_name
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            const Photourl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(Photourl)
        })
    }
  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' + place.place_name + "," + trip?.userSelection?.location?.label
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl?photoUrl:'/ai-generated-8131428_1280.webp'}
          alt={place.place_name}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place.place_name}</h2>
          <p className="text-sm text-gray-400">{place.place_details}</p>
          <h2 className="mt-2">⏲️ {place.time_to_spend}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
