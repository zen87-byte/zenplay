import React, { useRef, useEffect } from 'react';

interface VideoThumbnailProps {
  videoUrl: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const generateThumbnail = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    if (videoRef.current) {
        videoRef.current.addEventListener('loadeddata', generateThumbnail);
        videoRef.current.addEventListener('canplay', generateThumbnail);
        videoRef.current.addEventListener('canplaythrough', generateThumbnail);
        console.log(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', generateThumbnail);
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} src={videoUrl} controls />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default VideoThumbnail;
