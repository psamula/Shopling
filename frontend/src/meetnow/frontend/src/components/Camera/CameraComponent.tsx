import React, { useEffect, useRef, useState } from 'react';

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(true);

  // Function to start the video stream from the camera
  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Function to stop the video stream from the camera
  const stopVideoStream = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks() ?? [];
    tracks.forEach((track) => {
      track.stop();
    });
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Function to take a photo
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (video && canvas && context) {
      // Set the canvas size to match the video stream size
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image data in base64 format
      const photo = canvas.toDataURL('image/jpeg');

      setPhotoData(photo);
      stopVideoStream();
      setShowVideo(false);
    }
  };

  const acceptPhoto = () => {
    // Handle accepting the photo here
  };

  const dismissPhoto = () => {
    setPhotoData(null);
    setShowVideo(true);
    startVideoStream();
  };

  useEffect(() => {
    startVideoStream();
    return () => {
      stopVideoStream();
    };
  }, []);

  return (
    <div className="h-full ">
      {showVideo ? (
        <div className="flex justify-center items-center relative h-full">
          <video ref={videoRef} autoPlay={true} className="h-screen w-screen object-cover" />
          <svg className=" cursor-pointer absolute bottom-0 left-1/2 transform -translate-x-1/2" width="100" height="100" onClick={takePhoto}>
            <circle cx="50" cy="50" r="40" stroke="magenta" strokeWidth="15" fill="none" />
            <image x="25" y="25" href="public/MeetLogoNoBack.png" height="50" width="50" />
          </svg>
        </div>
      ) : (
        <div className="h-full">
          {photoData && (
            <div className="flex justify-center items-center relative">
              <img src={photoData} alt="Photo" className="h-screen w-screen object-cover"/>
            </div>
          )}
          <div className="flex justify-center items-center">
          <svg className="cursor-pointer absolute bottom-0 transform right-1/2" width="100" height="100" onClick={acceptPhoto}>
            <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="15" fill="none" />
            <text x="36" y="60" fontSize="32" fill="green" fontWeight="bold">
                ✓
              </text>
            </svg>
            <svg className="cursor-pointer absolute bottom-0  transform left-1/2" width="100" height="100" onClick={dismissPhoto}>
            <circle cx="50" cy="50" r="40" stroke="red" strokeWidth="15" fill="none" />
            <text x="36" y="60" fontSize="32" fill="red" fontWeight="bold">
            <tspan fontWeight="800">✕</tspan>
              </text>
            </svg>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default CameraComponent;