import * as React from 'react';
import Map, {Marker, Popup, GeolocateControl} from 'react-map-gl';
import "./App.css";
import RoomIcon from '@mui/icons-material/Room';
import {axiosInstance} from '../../config';
import emailjs from '@emailjs/browser';




function App() {
  const [viewState, setViewState] = React.useState({
    longitude: -105.750596,
    latitude: 55.585901,
    zoom: 4,
    position: 'absolute',
    height: '400px',
  });

  const [pins, setPins] = React.useState([]);
  const [place, setPlace] = React.useState(null);
  const [currentLoc, setCurrentLoc] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [desc, setDesc] = React.useState(null);

  
  const handleCurrLocation = (id, lat, long) => {
    setCurrentLoc(id)
    setViewState({ ...viewState, latitude: lat, longitude: long });  
  }

  React.useEffect(() => {

    const getPin = async () => {

      try {
        const allPins = await axiosInstance.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPin();
  }, [])

  const handleClick = (e) =>{

      console.log(e.lngLat);
      const { lat, lng } = e.lngLat;
      setPlace({ lat, lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: 'Farhan',
      title,
      desc,
      rating: 5,
      lat: place.lat,
      long: place.lng,
    };

    try {
      const res = await axiosInstance.post("/pins", newPin);
      setPins([...pins, res.data]);
      setPlace(null);
    } catch (err) {
      console.log(err);
    }
  };



  const navigateFunc = (lat, long, title, desc) => {

    var templateParams = {
      name: 'Mohammad Farhan Ali',
      title: title,
      description: desc,
      latitude: lat,
      longitude: long,
      email: 'farhandxb96@gmail.com'
  };


    emailjs.send('service_81mhbsn', 'template_kgqh56l', templateParams, 'HWlOam5LBN1pkd7Eq')
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
    
  }


  return (
  <div style={{ height: "100vh", width: "100vw" }}>
  <Map
    {...viewState}
   
    mapboxAccessToken= {process.env.REACT_APP_HEREMAP}
    onMove={evt => setViewState(evt.viewState)}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/navigation-day-v1"
    onDblClick={handleClick}
  >
<GeolocateControl />
{pins.map( p => (
    <>

<Marker longitude={p.long} latitude={p.lat} 
    offsetLeft={-3.5}
    offsetTop={-7}
  >
  
  <RoomIcon 
    style={{
    fontSize: 20,
    color: "tomato",
    cursor: "pointer",
    }}
    onClick = {() => handleCurrLocation(p._id, p.lat, p.long)}
  />
  </Marker>

     
{ currentLoc === p._id && (
<>
<Popup longitude={p.long} latitude={p.lat}
anchor="right"
closeOnClick={false}
onClose={() => setCurrentLoc(null)}
>

<div className="card">
  <label>Place</label>
  <h4>{p.title}</h4>
  <label>Rating</label>
  <label>Review</label>
  <p className='desc'>{p.desc}</p>
  <label>Information</label>
  <button type="submit" className="submitButton"
  onClick={ () => navigateFunc(p.lat, p.long, p.title, p.desc)}
  >
   Send Mail
  </button>
</div>
</Popup>

{/* <Source id="my-data" type="geojson" data={dataOne}>
<Layer
    id="lineLayer"
    type="line"
    source="my-data"
    layout={{
    "line-join": "round",
    "line-cap": "round"
    }}
    paint={{
    "line-color": "rgba(3, 170, 238, 0.5)",
    "line-width": 5
    }}
    />
</Source> */}

</>
)}

</>
))}
{place && (
  <Popup longitude={place.lng} latitude={place.lat}
      anchor="right"
      onClose={() => setPlace(null)}>
        <div>
          <form onSubmit={handleSubmit}>
          <label>Title</label>
              <input
              placeholder="Enter a title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              />

          <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
          </form>
        </div> 
      </Popup>
  )}
    
</Map>
</div>
);

}

export default App;

