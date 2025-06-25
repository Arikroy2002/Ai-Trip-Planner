import { db } from '@/service/firebaseconfig';
import { getDoc,doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from './components/infoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';
function Viewtrip(){
    const {tripId}=useParams();
    const[trip,setTrip]=useState([])
    useEffect(()=>{
       tripId&&GetTripData();
    },[tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId)
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data())
        }else{
            console.log("No such document!");
            toast('No Trip Found')
        }
    }
    return(
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
          <InfoSection trip={trip} />  
          <Hotels trip={trip}/>
          <PlacesToVisit trip={trip}/>
          <Footer trip={trip}/>
        </div>
    )
}
export default Viewtrip