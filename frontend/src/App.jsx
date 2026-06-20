import { useEffect, useState } from 'react';
import axios from 'axios';
import OuterSlider from './components/OuterSlider';
import InnerSlider from './components/InnerSlider';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/videos`)
      .then((res) => setVideos(res.data))
      .catch(() => console.error('Failed to fetch videos'));
  }, []);

  return (
    <div>
      <OuterSlider videos={videos} onVideoClick={setSelectedIndex} />
      {selectedIndex !== null && (
        <InnerSlider
          videos={videos}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}
