import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StationData} from '../api/chicago/getAllStations';
import {searchForStations} from '../api/chicago/searchForStations';
import {Disc} from 'react-native-feather';

interface Props {}

const MapScreen = () => {
  const [hasAuthorized, setHasAuthorized] = useState(false);
  const [stations, setStations] = useState<StationData[]>([]);
  const [location, setLocation] = useState<{
    coordinate: {
      latitude: number;
      longitude: number;
      altitude: number;
      timestamp: number;
      accuracy: number;
      speed: number;
      heading: number;
      isFromMockProvider: boolean;
    };
  }>();

  useEffect(() => {
    const handleFetchStations = async () => {
      const data = await searchForStations('red');
      setStations(data);
    };

    handleFetchStations();
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'TrainsTrainsTrains: Allow Location Use',
            message: 'Share your location to show nearby CTA stations.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasAuthorized(true);
        } else {
          // denied :()
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        onUserLocationChange={e => setLocation(e.nativeEvent)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // showsUserLocation={hasAuthorized || !!location}
        // customMapStyle={mapStyle}
        initialRegion={{
          latitude: 41.998996,
          longitude: -87.657944,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {stations.map((station, i) => (
          <Marker
            title={station.station_name}
            key={i}
            coordinate={{
              latitude: parseFloat(station.location.latitude),
              longitude: parseFloat(station.location.longitude),
            }}>
            <View
              style={{
                backgroundColor: 'black',
              }}>
              <Text
                style={{
                  color: 'white',
                  margin: 8,
                }}>
                {station.station_name}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
