import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function VideoControls({ videoRef, video, isInView }) {
  const [playing,     setPlaying]     = useState(false);
  const [muted,       setMuted]       = useState(true);
  const [progress,    setProgress]    = useState(0);
  const [liked,       setLiked]       = useState(false);
  const [likes,       setLikes]       = useState(video.likes);
  const [showShare,   setShowShare]   = useState(false);

  // Auto play/pause based on IntersectionObserver
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isInView) {
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [isInView]);

  // Progress bar update
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onTimeUpdate = () => {
      if (el.duration) setProgress((el.currentTime / el.duration) * 100);
    };
    el.addEventListener('timeupdate', onTimeUpdate);
    return () => el.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); }
    else           { el.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleProgressClick = (e) => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    el.currentTime = ratio * el.duration;
  };

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((p) => p + 1);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/like`, { videoId: video.id });
      setLikes(res.data.likes);
    } catch {
      // optimistic update already applied
    }
  };

  const handleShare = async (platform) => {
    setShowShare(false);
    try {
      await navigator.clipboard.writeText(video.url);
      await axios.post(`${import.meta.env.VITE_API_URL}/share`, { videoId: video.id, platform });
      alert('Link copied!');
    } catch {
      alert('Could not copy link');
    }
  };

  return (
    <div className="video-controls">
      {/* Progress Bar */}
      <div className="progress-bar-wrapper" onClick={handleProgressClick}>
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Buttons Row */}
      <div className="controls-row">
        <button className="ctrl-btn" onClick={togglePlay}>
          {playing ? '⏸' : '▶️'}
        </button>

        <button className="ctrl-btn" onClick={toggleMute}>
          {muted ? '🔇' : '🔊'}
        </button>

        <button className={`ctrl-btn like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
          ❤️ <span className="like-count">{likes}</span>
        </button>

        <button className="ctrl-btn" onClick={() => setShowShare((s) => !s)}>
          🔗
        </button>
      </div>

      {/* Share Popup */}
      {showShare && (
        <div className="share-popup">
          <button onClick={() => handleShare('copy')}>📋 Copy Link</button>
          <button onClick={() => handleShare('whatsapp')}>💬 WhatsApp</button>
          <button onClick={() => handleShare('instagram')}>📸 Instagram</button>
        </div>
      )}
    </div>
  );
}
