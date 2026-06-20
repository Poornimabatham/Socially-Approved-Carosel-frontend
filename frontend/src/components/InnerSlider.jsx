import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import VideoCard from './VideoCard';

export default function InnerSlider({ videos, startIndex, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <div className="inner-slider-wrapper" onClick={(e) => e.stopPropagation()}>
        <Swiper
          modules={[Navigation]}
          navigation
          initialSlide={startIndex}
          slidesPerView={3}
          centeredSlides
          spaceBetween={14}
          breakpoints={{
            0:   { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id} className="inner-slide">
              <VideoCard video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
