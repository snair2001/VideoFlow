import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import '../App.css';

import { toast } from 'react-toastify'
import { parseEther } from '../contractConfig'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { FaRegShareSquare } from "react-icons/fa";

function Cards({ item, currVideo, player, setPlayer, setCurrVideo, account, idx, processing, setProcessing, marketplace }) {

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [canView, setCanView] = useState(false)

  useEffect(() => {
    checkViewAccess();
  }, [item, account]);

  const checkViewAccess = async () => {
    if (!marketplace || !account) return;
    
    try {
      const canViewVideo = await marketplace.canView(item.id, account);
      setCanView(canViewVideo);
    } catch (error) {
      console.error("Error checking view access:", error);
    }
  };

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
  }
  
  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
  }

  async function handlePayment(item) {
    setProcessing(true)
    try {
      const marketplacecontract = marketplace
      console.log(marketplacecontract);   
      
      const price = parseEther(item.price);
      console.log("price to pay: " + price);
      
      const tx = await marketplacecontract.payToView(item.id, {
        value: price
      });
      
      toast.info("Your transaction is being processed", {
        position: "top-center"
      })

      await tx.wait();
      toast.success("Payment successful! You can now view the video.", { position: "top-center" })
      
      // Update view access
      await checkViewAccess();
      
      setPlayer(true);
      setCurrVideo(item)

    } catch (error) {
      console.log(error);
      toast.error("Payment failed. Please try again.", {
        position: "top-center"
      });
    }
    setProcessing(false)
  }

  const handlePlayVideo = () => {
    setPlayer(true);
    setCurrVideo(item);
  }

  return (
    <div className='card-div'>
      <div className='card-inner p-2'>
        <img 
          src={item.thumbnailUrl} 
          alt="Video thumbnail" 
          className='object-cover w-[230px] h-[230px] rounded overflow-hidden' 
        />
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-white text-2xl font-thin mt-3'>{item.title}</h3>
          <h4 className='text-white text-2xl font-thin mt-3'>Price: <span className='text-green-400'><strong>{item.price} </strong></span> FLOW</h4>
          <h5 className='text-white text-sm font-thin mt-1'>Duration: {Math.floor(item.displayTime / 60)} minutes</h5>
          <div className='flex text-white justify-between items-center mb-3 gap-4 mt-3'>
            {!player && (
              canView ? (
                <button 
                  type="button" 
                  className="text-white bg-gradient-to-r from-green-500 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded text-sm px-5 py-1.5 text-center me-2" 
                  onClick={handlePlayVideo}
                >
                  Watch Video
                </button>
              ) : (
                <button 
                  type="button" 
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded text-sm px-5 py-1.5 text-center me-2" 
                  disabled={processing} 
                  onClick={() => { handlePayment(item) }}
                >
                  {processing ? "Processing..." : `Pay ${item.price} FLOW`}
                </button>
              )
            )}
          </div>
          <div className='flex justify-center items-center gap-4 mt-2'>
            <button
              type="button"
              className={`flex items-center gap-2 text-white ${liked ? "bg-green-500" : " border border-green-500"} font-medium rounded text-sm px-4 py-1.5 text-center`}
              onClick={() => handleLike(item)}
            >
              <AiOutlineLike />
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 text-white ${disliked ? "bg-red-500" : "border border-red-500"} font-medium rounded text-sm px-4 py-1.5 text-center`}
              onClick={() => handleDislike(item)}
            >
              <AiOutlineDislike />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 text-center"
              onClick={() => {
                navigator.clipboard.writeText("https://ripples-of-music.netlify.app/")
                  .then(() => {
                    toast.success("Link copied to clipboard!", {
                      position: "top-center"
                    });
                  })
                  .catch(err => {
                    console.error("Failed to copy: ", err);
                  });
              }}
            >
              <FaRegShareSquare /> Share
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cards