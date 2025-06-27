import React, { useEffect, useState } from 'react'
import { ethers } from "ethers"
import axios from 'axios'
import { toast } from 'react-toastify'
import pinata from '../key.json'
import { parseEther } from '../contractConfig'

function Create({ marketplace, account, setMarketplace }) {

  const [videoFile, setVideoFile] = useState();
  const [thumbnailFile, setThumbnailFile] = useState();
  const [isMinting, setIsMinting] = useState(false);
  const [forminfo, setFormInfo] = useState({
    title: "",
    price: 0,
    displayTime: 3600 // Default 1 hour in seconds
  });

  useEffect(() => {
    document.title = "Create Video"
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "price") {
      if (value <= 0) return
    }
    if(name === "displayTime") {
      if (value <= 0) return
    }
    setFormInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const videoChangeHandler = (event) => {
    const file = event.target.files[0];
    try {
      console.log("Video file type:", file.type);
    } catch (error) {
      console.log(error);
    }
    if (file.type.startsWith('video/')) {
      setVideoFile(file);
    } else {
      alert('Please select a video file.');
      return;
    }
  };

  const thumbnailChangeHandler = (event) => {
    const file = event.target.files[0];
    try {
      console.log("Thumbnail file type:", file.type);
    } catch (error) {
      console.log(error);
    }
    if (file.type.startsWith('image/')) {
      setThumbnailFile(file);
    } else {
      alert('Please select an image file for thumbnail.');
      return;
    }
  };

  const handleEvent = async (e) => {
    setIsMinting(true)
    e.preventDefault();

    if (!videoFile || !thumbnailFile) {
      toast.error("Please select both video and thumbnail files", {
        position: "top-center",
      });
      setIsMinting(false);
      return;
    }

    toast.info("Uploading video file", {
      position: "top-center",
    })
    console.log("uploading video file");

    try {
      // Upload video file
      const videoData = new FormData();
      videoData.append('file', videoFile);

      const resVideo = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: videoData,
        headers: {
          Authorization: `Bearer ${pinata.JWT}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Video uploaded!", {
        position: "top-center",
      })

      // Upload thumbnail file
      toast.info("Uploading thumbnail", {
        position: "top-center",
      })

      const thumbnailData = new FormData();
      thumbnailData.append('file', thumbnailFile);

      const resThumbnail = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: thumbnailData,
        headers: {
          Authorization: `Bearer ${pinata.JWT}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Thumbnail uploaded!", {
        position: "top-center",
      })

      const videoHash = resVideo.data.IpfsHash;
      const thumbnailHash = resThumbnail.data.IpfsHash;
      const price = parseEther(forminfo.price.toString());
      const displayTime = forminfo.displayTime;

      toast.info("Uploading video to blockchain", {
        position: "top-center",
      })

      // Upload to blockchain
      const tx = await marketplace.uploadVideo(
        videoHash,
        thumbnailHash,
        price,
        displayTime
      );

      toast.info("Wait till transaction confirms....", {
        position: "top-center"
      })

      await tx.wait()
      toast.success("Video uploaded to blockchain successfully", { position: "top-center" })

    } catch (error) {
      toast.error("Error uploading video")
      console.log(error);
    }
    setIsMinting(false)
  }

  return (
    <div className='h-screen pt-24'>
      <div className="container-fluid mt-5 text-left">
        <div className="content mx-auto">

          <form className="max-w-sm mx-auto">
            <div className='max-w-lg mx-auto'>
              <label className="block mb-2 text-sm font-medium text-white" htmlFor="videofile">Upload Video File</label>
              <input onChange={videoChangeHandler} name="videofile" className="block w-full mb-4 h-8 text-m text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept="video/*" />
            </div>

            <div className='max-w-lg mx-auto'>
              <label className="block mb-2 text-sm font-medium text-white" htmlFor="thumbnailfile">Upload Thumbnail Image</label>
              <input onChange={thumbnailChangeHandler} name="thumbnailfile" className="block w-full mb-4 h-8 text-m text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept="image/*" />
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Video Title</label>
              <input onChange={handleChange} type="text" id="title" name='title' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter video title" required />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">Price (FLOW)</label>
              <input onChange={handleChange} type="number" id="price" name='price' value={forminfo.price} step="0.001" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0.001 FLOW" />
            </div>

            <div className="mb-4">
              <label htmlFor="displayTime" className="block mb-2 text-sm font-medium text-white">Display Time (seconds)</label>
              <input onChange={handleChange} type="number" id="displayTime" name='displayTime' value={forminfo.displayTime} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="3600" />
            </div>
            
            <div className='text-center'>
              <button onClick={handleEvent} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disabled={isMinting}>
                {isMinting ? "Uploading..." : "Upload Video"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create