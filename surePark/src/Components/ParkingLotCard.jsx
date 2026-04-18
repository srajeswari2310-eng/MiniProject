import React, { useEffect, useState } from 'react'
import { FaCarSide, FaHeart  } from "react-icons/fa";

const ParkingLotCard = ({ floorId, slotDetails, currentUser, onSelectSlot, onAddFavorite, locationId  })  => {

  const [isFav, setIsFav] = useState(false);

    const handleSelectSlot = (slotDetails) =>{
        onSelectSlot({slot: slotDetails, floorid: floorId});
}

const handleAddFavorite =(data)=>{
  console.log(data);
  onAddFavorite({slotId: data.slotId, floorId: data.floorId, locationId: data.locationId});

}
 // Mask vehicle number: show XXX + last 4 digits
  const maskedVehicleNo = slotDetails?.user
    ? `XXX${slotDetails.userVehicleNo.slice(-4)}`
    : null;

useEffect(()=>{

 var fav =   currentUser?.favoriteSlot?.find(x=> x.locationId == locationId && x.floorId == floorId && slotDetails.id == x.slotId );
   return fav ? setIsFav(true) : setIsFav(false);
},[currentUser])    
  
  return (
    
  //  <div
  //     className={`group w-40 h-28 rounded-lg shadow-md relative 
  //       ${slotDetails.occupied ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"} 
  //       border-2 flex flex-col items-center justify-center cursor-pointer`}
  //     onClick={() => handleSelectSlot(slotDetails)}
  //   >
  //     <h3 className="text-sm font-semibold mb-2">{slotDetails.slotName}</h3>

  //     {slotDetails.occupied ? (
  //       <>
  //         <FaCarSide className="w-8 h-8 text-red-500 absolute bottom-2" />
  //         {/* Hover tooltip */}
  //         <div
  //           className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded 
  //                      opacity-0 group-hover:opacity-100 transition duration-300"
  //         >
  //           {maskedVehicleNo}
  //         </div>
  //       </>
  //     ) : (
  //       <span className="text-green-600 text-sm">Available</span>
  //     )}
  //   </div>

     <div
      className={`group w-40 h-28 rounded-lg shadow-md relative 
        ${slotDetails.occupied ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"} 
        border-2 flex flex-col items-center justify-center cursor-pointer`}
      onClick={() => handleSelectSlot(slotDetails)}
    >
      <h3 className="text-sm font-semibold mb-2">{slotDetails.slotName}</h3>

      {slotDetails.occupied ? (
        <>
          <FaCarSide className="w-8 h-8 text-red-500 absolute bottom-2" />
          {/* Hover tooltip */}
          <div
            className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded 
                       opacity-0 group-hover:opacity-100 transition duration-300"
          >
            {maskedVehicleNo}
          </div>
        </>
      ) : (
        <span className="text-green-600 text-sm">Available</span>
      )}

      {/* Favorite Button */}
      <button
        className={`absolute top-2 right-2 transition 
         ${isFav == true ? "text-red-500" : "text-gray-400"}`}
        
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering slot select
          handleAddFavorite({slotId: slotDetails.id, floorId: floorId, locationId : locationId});
        }}
      >
        <FaHeart />
      </button>
    </div>
  )
}

export default ParkingLotCard