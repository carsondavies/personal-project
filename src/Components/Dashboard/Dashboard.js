// // import {
// //   Combobox,
// //   ComboboxInput,
// //   ComboboxPopover,
// //   ComboboxList,
// //   ComboboxOption
// // } from '@reach/combobox'
// // import '@reach/combobox/styles.css'
// import React from 'react'
// import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
// import usePlacesAutocomplete, { getGeocode, getLatLng, } from 'use-places-autocomplete'
// import MapStyles from './MapStyles'


// const { placeType, REACT_APP_GOOGLE_MAPS_API_KEY } = process.env
// const libraries = ["places"]
// const mapContainerStyle = {
//   height: '100vh',
//   width: '100vw'
// }
// //eventually will need to be user location below
// const center = {
//   lat: 40.3065467,
//   lng: -111.6831156
// }
// const options = {
//   styles: MapStyles,
// }

// export default function Dashboard() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries,
//   })

//   const mapRef = React.useRef()
//   const onMapLoad = React.useCallback((map) => {
//     mapRef.current = map
//   }, [])

//   const panTo = React.useCallback(({ lat, lng }) => {
//     mapRef.current.panTo({ lat, lng })
//     mapRef.current.setZoom(10)
//   }, [])

//   const service = new google.maps.places.PlacesService(map)
//   service.nearbySearch({
//     location: {
//       lat: 40.3065467,
//       lng: -111.6831156
//     },
//     radius: 1600 * 30
//   })

//   if (loadError) return "ERROR"
//   if (!isLoaded) return "Loading..."
//   return (
//     <div className='theater-map'>
//       <GoogleMap
//         id='map'
//         mapContainerStyle={mapContainerStyle}
//         zoom={10}
//         center={center}
//         options={options}
//       >


//       </GoogleMap>
//     </div>
//   )
// }