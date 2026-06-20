import { useEffect, useRef, useState } from 'react';
import VideoControls from './VideoControls';

export default function VideoCard({ video }) {
  const videoRef   = useRef(null);
  const wrapperRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [loaded,   setLoaded]   = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView && !loaded) {
          // Lazy load: assign src only when entering viewport
          videoRef.current.src = video.url;
          setLoading(true);
          setLoaded(true);
        }

        if (!inView && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [loaded, video.url]);

  return (
    <div className="video-card" ref={wrapperRef}>
      {/* Show thumbnail until video src is assigned */}
      {!loaded && (
        <img
          className="thumbnail-placeholder"
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
        />
      )}

      {/* Spinner while buffering */}
      {loading && <div className="spinner" />}

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />

      <div className="video-info">
        <h4>{video.title}</h4>
        <p>{video.description}</p>
      </div>

      <VideoControls videoRef={videoRef} video={video} isInView={isInView} />
    </div>
  );
}
