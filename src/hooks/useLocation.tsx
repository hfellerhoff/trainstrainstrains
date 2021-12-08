// import {useEffect, useState} from 'react';
// import {PermissionsAndroid} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

// interface Props {}

// const useLocation = () => {
//   const [hasAuthorized, setHasAuthorized] = useState(false);
//   const [isWatching, setIsWatching] = useState(false);
//   const [location, setLocation] = useState<Geolocation.GeoPosition>();

//   useEffect(() => {
//     const requestCameraPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'TrainsTrainsTrains: Allow Location Use',
//             message: 'Share your location to show nearby CTA stations.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           setHasAuthorized(true);
//         } else {
//           // denied :()
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestCameraPermission();
//   }, []);

//   useEffect(() => {
//     if (hasAuthorized && !isWatching) {
//       Geolocation.watchPosition(
//         info => {
//           setLocation(info);
//           console.log(info);
//         },
//         error => console.error(error),
//         {},
//       );
//       setIsWatching(true);
//     }

//     return () => {
//       Geolocation.stopObserving();
//     };
//   }, [hasAuthorized, isWatching]);

//   return location;
// };

// export default useLocation;
