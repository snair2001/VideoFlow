import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import PlayerCard from './PlayerCard';
import { ethers } from 'ethers';
import { getContract, formatEther } from '../contractConfig';

// import { toast } from 'react-toastify';

function NFTs({ marketplace, setMarketplace, account }) {

  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState([])
  const [processing, setProcessing] = useState(false)

  const loadVideos = async () => {
    setLoading(true)
    try {
      let contract = marketplace;
      if (!contract) {
        contract = await getContract(false);
      }

      // Get all videos from the contract
      const [uploaders, videoHashes, thumbnailHashes, prices, displayTimes] = await contract.getVideos();
      
      console.log("Videos found:", uploaders.length);

      let displayVideos = [];
      for (let i = 0; i < uploaders.length; i++) {
        const video = {
          id: i,
          uploader: uploaders[i],
          videoHash: videoHashes[i],
          thumbnailHash: thumbnailHashes[i],
          price: formatEther(prices[i]),
          displayTime: displayTimes[i].toString(),
          videoUrl: `https://ipfs.io/ipfs/${videoHashes[i]}`,
          thumbnailUrl: `https://ipfs.io/ipfs/${thumbnailHashes[i]}`,
          title: `Video ${i + 1}` // You might want to store titles in metadata
        };
        displayVideos.push(video);
      }

      setVideos(displayVideos);
      setLoading(false);
    } catch (error) {
      console.error("Error loading videos:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVideos()
  }, [marketplace])

  let [currVideo, setCurrVideo] = useState(null);
  let [player, setPlayer] = useState(false);

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
                processing={processing} 
                setProcessing={setProcessing} 
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