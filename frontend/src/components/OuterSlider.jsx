import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function OuterSlider({ videos, onVideoClick }) {
  return (
    <div className="outer-section">
      <h2>🔥 Socially Approved</h2>
      <Swiper
        modules={[FreeMode]}
        freeMode
        slidesPerView="auto"
        spaceBetween={12}
      >
        {videos.map((video, index) => (
          <SwiperSlide
            key={video.id}
            className="outer-slide"
            onClick={() => onVideoClick(index)}
          >
            <img src={video.thumbnail} alt={video.title} loading="lazy" />
            <div className="outer-slide-overlay">{video.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
