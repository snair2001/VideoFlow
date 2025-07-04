/**
 * NFTs Component - Video Listing and Display
 * 
 * DSA CONCEPTS USED:
 * 1. Data Fetching - Asynchronous data retrieval from blockchain
 * 2. Array Processing - Iterative data transformation
 * 3. State Management - Component state with loading states
 * 4. Error Handling - Try-catch with fallback states
 * 5. Memory Management - Efficient data structure creation
 * 6. Conditional Rendering - Boolean state-based UI rendering
 */

import React, { useEffect, useState, useCallback } from 'react'
import Cards from './Cards'
import PlayerCard from './PlayerCard';
import { getContract, formatEther } from '../contractConfig';
import { PINATA_CONFIG } from '../config';

// import { toast } from 'react-toastify';

function NFTs({ marketplace, setMarketplace, account }) {

  // STATE MANAGEMENT - Component state with loading states
  // Time Complexity: O(1) for state updates
  // Space Complexity: O(n) where n is number of videos
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState([])

  // DATA FETCHING ALGORITHM - Asynchronous blockchain data retrieval
  // Time Complexity: O(n) where n is number of videos in contract
  // Space Complexity: O(n) for storing video data
  const loadVideos = useCallback(async () => {
    setLoading(true)
    try {
      let contract = marketplace;
      if (!contract) {
        contract = await getContract(false);
      }

      // BLOCKCHAIN DATA RETRIEVAL - Smart contract interaction
      // Time Complexity: O(1) for contract call, O(n) for data processing
      // Space Complexity: O(n) for returned arrays
      const [uploaders, videoHashes, thumbnailHashes, prices, displayTimes] = await contract.getVideos();
      
      console.log("Videos found:", uploaders.length);

      // ARRAY PROCESSING - Data transformation and mapping
      // Time Complexity: O(n) where n is number of videos
      // Space Complexity: O(n) for transformed data structure
      let displayVideos = [];
      for (let i = 0; i < uploaders.length; i++) {
        // MEMORY MANAGEMENT - Efficient object creation
        const video = {
          id: i,
          uploader: uploaders[i],
          videoHash: videoHashes[i],
          thumbnailHash: thumbnailHashes[i],
          price: formatEther(prices[i]),
          displayTime: displayTimes[i].toString(),
          videoUrl: `${PINATA_CONFIG.GATEWAY_URL}${videoHashes[i]}`,
          thumbnailUrl: `${PINATA_CONFIG.GATEWAY_URL}${thumbnailHashes[i]}`,
          title: `Video ${i + 1}` // You might want to store titles in metadata
        };
        console.log(`Created video with ID ${i}:`, video);
        displayVideos.push(video);
      }

      setVideos(displayVideos);
      setLoading(false);
    } catch (error) {
      // ERROR HANDLING - Try-catch with fallback states
      console.error("Error loading videos:", error);
      setLoading(false);
    }
  }, [marketplace])

  // EFFECT HOOK - Dependency-based side effects
  // Time Complexity: O(1) for effect execution
  // Space Complexity: O(1) for effect cleanup
  useEffect(() => {
    loadVideos()
  }, [loadVideos])

  // STATE MANAGEMENT - Video player state
  // Time Complexity: O(1) for state updates
  // Space Complexity: O(1) for current video reference
  let [currVideo, setCurrVideo] = useState(null);
  let [player, setPlayer] = useState(false);

  // CONDITIONAL RENDERING - Loading state handling
  if (loading) {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2 className='text-white font-bold pt-24 text-2xl text-center'>Loading...</h2>
      </main>
    )
  }

  return (
    <>
      <div className='flex flex-wrap gradient-bg-welcome gap-10 justify-center pt-24 pb-5 px-16'>
        {/* CONDITIONAL RENDERING - Player state-based UI */}
        {player && (
          <div style={{
            width: '650px',
            height: 'auto',
            margin: '0 auto',
            display: 'block',
          }}>
            <div className='audio-outer'>
              <div className='audio-inner'>
                <PlayerCard item={currVideo} player={player} setPlayer={setPlayer} setCurrVideo={setCurrVideo} currVideo={currVideo} />
              </div>
            </div>
          </div>
        )}
        {/* ARRAY RENDERING - Iterative component rendering */}
        {
          (videos.length > 0 ?
            videos.map((video, idx) => (
              <Cards 
                key={idx}
                item={video} 
                currVideo={currVideo} 
                player={player} 
                setPlayer={setPlayer} 
                setCurrVideo={setCurrVideo} 
                account={account} 
                idx={idx} 
                marketplace={marketplace} 
              />
            ))
            : (
              <main style={{ padding: "1rem 0" }}>
                <h2 className='text-white'>No videos available</h2>
              </main>
            ))}
      </div>
    </>
  )
}

export default NFTs