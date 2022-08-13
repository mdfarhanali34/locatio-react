// src/DisplayMapClass.js
import React from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';

export class DisplayMapClass extends React.Component {
 
    mapElement = useRef()

    [mapLongitude, setMapLongitude] = useState(-121.91599)
    [mapLatitude, setMapLatitude] = useState(37.36765)
    [mapZoom, setMapZoom] = useState(13)
    [map, setMap] = useState({})

    increaseZoom = () => {
        if (mapZoom < MAX_ZOOM) {
          setMapZoom(mapZoom + 1);
        }
      }
      
    decreaseZoom = () => {
        if (mapZoom > 1) {
          setMapZoom(mapZoom - 1);
        }
      }
      
    updateMap = () => {
        map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
        map.setZoom(mapZoom);
      }
 
 
 
      useEffect(() => {
        let map = tt.map({
          key: "5JbNEi2LWCVk3GOpjX5NOGmB6g6zGySI",
          container: mapElement.current,
          center: [mapLongitude, mapLatitude],
          zoom: mapZoom
        });
        setMap(map);
        return () => map.remove();
      }, []);

  render() {
    return (
      // Set a height on the map so it will display
        <div>
            <Input
                type="text"
                name="longitude"
                value={mapLongitude}
                onChange={(e) => setMapLongitude(e.target.value)}
                />
        </div>
    );
  }

};
