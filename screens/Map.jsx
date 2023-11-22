// // import React, { useState, useEffect } from 'react';
// // import { Map, GoogleApiWrapper, Marker, DirectionsRenderer } from 'google-maps-react';

// // const MapContainer = (props) => {
// //   const [currentLocation, setCurrentLocation] = useState(null);
// //   const [destination, setDestination] = useState({ lat: 0, lng: 0 });
// //   const [directions, setDirections] = useState(null);

// //   useEffect(() => {
// //     // Отримати геодані поточного місця користувача
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           setCurrentLocation({
// //             lat: position.coords.latitude,
// //             lng: position.coords.longitude,
// //           });
// //         },
// //         (error) => {
// //           console.error('Error getting user location:', error);
// //         }
// //       );
// //     } else {
// //       console.error('Geolocation is not supported by this browser.');
// //     }
// //   }, []);

// //   const onMapReady = (mapProps, map) => {
// //     // Додати маркер для поточного місця користувача
// //     if (currentLocation) {
// //       const marker = new mapProps.google.maps.Marker({
// //         position: currentLocation,
// //         map,
// //         title: 'Current Location',
// //       });
// //     }
// //   };

// //   const calculateDirections = () => {
// //     const { google } = props;
// //     const directionsService = new google.maps.DirectionsService();

// //     directionsService.route(
// //       {
// //         origin: currentLocation,
// //         destination,
// //         travelMode: google.maps.TravelMode.DRIVING,
// //       },
// //       (result, status) => {
// //         if (status === google.maps.DirectionsStatus.OK) {
// //           setDirections(result);
// //         } else {
// //           console.error('Error calculating directions:', status);
// //         }
// //       }
// //     );
// //   };

// //   useEffect(() => {
// //     // Обчислити маршрут, коли змінюється точка призначення
// //     if (currentLocation && destination.lat !== 0 && destination.lng !== 0) {
// //       calculateDirections();
// //     }
// //   }, [currentLocation, destination]);

// //   const onMapClicked = (mapProps, map, clickEvent) => {
// //     // Встановити нову точку призначення при кліці на карті
// //     setDestination({
// //       lat: clickEvent.latLng.lat(),
// //       lng: clickEvent.latLng.lng(),
// //     });
// //   };

// //   return (
// //     <Map
// //       google={props.google}
// //       zoom={14}
// //       initialCenter={currentLocation}
// //       center={currentLocation}
// //       onReady={onMapReady}
// //       onClick={onMapClicked}
// //     >
// //       {/* Маркер для точки призначення */}
// //       {destination.lat !== 0 && destination.lng !== 0 && (
// //         <Marker position={destination} title="Destination" />
// //       )}

// //       {/* Відобразити маршрут */}
// //       {directions && <DirectionsRenderer directions={directions} />}
// //     </Map>
// //   );
// // };

// // export default GoogleApiWrapper({
// //   apiKey: 'AIzaSyC7EdSBr2rAHxn1LtJJauW-Be4IRpliNH4',
// // })(MapContainer);


// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';

// const MapComponent = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [destination, setDestination] = useState({ latitude: 0, longitude: 0 });
//   const [routeCoordinates, setRouteCoordinates] = useState([]);

//   useEffect(() => {
//     // Отримати геодані з телефону
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setCurrentLocation({ latitude, longitude });
//       },
//       error => console.log(error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   }, []);

//   const getDirections = async () => {
//     // Використовуйте Google Maps Directions API для отримання маршруту
//     // Вам слід використовувати свій API ключ
//     const apiKey = 'AIzaSyC7EdSBr2rAHxn1LtJJauW-Be4IRpliNH4';
//     const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
//     const dest = `${destination.latitude},${destination.longitude}`;

//     const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${apiKey}`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       if (data.routes.length) {
//         const route = data.routes[0].overview_polyline.points;
//         const decodedRoute = decodePolyline(route);
//         setRouteCoordinates(decodedRoute);
//       }
//     } catch (error) {
//       console.error('Error fetching directions:', error);
//     }
//   };

//   const decodePolyline = polyline => {
//     const points = [];
//     let index = 0,
//       lat = 0,
//       lng = 0;

//     while (index < polyline.length) {
//       let b, shift = 0, result = 0;
//       do {
//         b = polyline.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       const dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
//       lat += dlat;

//       shift = 0;
//       result = 0;
//       do {
//         b = polyline.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       const dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
//       lng += dlng;

//       points.push({
//         latitude: lat / 1e5,
//         longitude: lng / 1e5,
//       });
//     }
//     return points;
//   };

//   return (
//     <View style={styles.container}>
//       {currentLocation && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: currentLocation.latitude,
//             longitude: currentLocation.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker coordinate={currentLocation} title="Current Location" />
//           {destination.latitude !== 0 && (
//             <Marker coordinate={destination} title="Destination" />
//           )}
//           {routeCoordinates.length > 0 && (
//             <Polyline
//               coordinates={routeCoordinates}
//               strokeColor="#000"
//               strokeWidth={6}
//             />
//           )}
//         </MapView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapComponent;



// import * as React from "react"
// import { Dimensions, StyleSheet, Text, View } from "react-native"
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
// import MapView, { Callout, Circle, Marker } from "react-native-maps"

// export default function MapComponent() {
// 	const [ pin, setPin ] = React.useState({
// 		latitude: 37.78825,
// 		longitude: -122.4324
// 	})
// 	const [ region, setRegion ] = React.useState({
// 		latitude: 37.78825,
// 		longitude: -122.4324,
// 		latitudeDelta: 0.0922,
// 		longitudeDelta: 0.0421
// 	})

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<GooglePlacesAutocomplete
// 				placeholder="Search"
// 				fetchDetails={true}
// 				GooglePlacesSearchQuery={{
// 					rankby: "distance"
// 				}}
// 				onPress={(data, details = null) => {
// 					// 'details' is provided when fetchDetails = true
// 					console.log(data, details)
// 					setRegion({
// 						latitude: details.geometry.location.lat,
// 						longitude: details.geometry.location.lng,
// 						latitudeDelta: 0.0922,
// 						longitudeDelta: 0.0421
// 					})
// 				}}
// 				query={{
// 					key: "AIzaSyC7EdSBr2rAHxn1LtJJauW-Be4IRpliNH4",
// 					language: "en",
// 					components: "country:us",
// 					types: "establishment",
// 					radius: 30000,
// 					location: `${region.latitude}, ${region.longitude}`
// 				}}
// 				styles={{
// 					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
// 					listView: { backgroundColor: "white" }
// 				}}
// 			/>
// 			<MapView
// 				style={styles.map}
// 				initialRegion={{
// 					latitude: 37.78825,
// 					longitude: -122.4324,
// 					latitudeDelta: 0.0922,
// 					longitudeDelta: 0.0421
// 				}}
// 				provider="google"
// 			>
// 				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
// 				<Marker
// 					coordinate={pin}
// 					pinColor="black"
// 					draggable={true}
// 					onDragStart={(e) => {
// 						console.log("Drag start", e.nativeEvent.coordinates)
// 					}}
// 					onDragEnd={(e) => {
// 						setPin({
// 							latitude: e.nativeEvent.coordinate.latitude,
// 							longitude: e.nativeEvent.coordinate.longitude
// 						})
// 					}}
// 				>
// 					<Callout>
// 						<Text>I'm here</Text>
// 					</Callout>
// 				</Marker>
// 				<Circle center={pin} radius={1000} />
// 			</MapView>
// 		</View>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center"
// 	},
// 	map: {
// 		width: Dimensions.get("window").width,
// 		height: Dimensions.get("window").height
// 	}
// })


import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
// import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import MapViewDirections from "react-native-maps-directions";

export default function MapComponent() {
  const [userLocation, setUserLocation] = useState(null);
  const [pin, setPin] = useState({
    latitude: 50.4501, // Kyiv latitude
    longitude: 30.5234, // Kyiv longitude
  });
  const [region, setRegion] = useState({
    latitude: 50.4501,
    longitude: 30.5234,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Check and request location permission for Android
    const requestLocationPermission = async () => {
      try {
          getCurrentLocation();
        }
       catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();

    // Cleanup function
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const watchId = Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={region}
        provider="google"
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {userLocation && (
          <MapViewDirections
            origin={userLocation}
            destination={pin}
            apikey="AIzaSyC7EdSBr2rAHxn1LtJJauW-Be4IRpliNH4"
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )}
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable={true}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={1000} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
