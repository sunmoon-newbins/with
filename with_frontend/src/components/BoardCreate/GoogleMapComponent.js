import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const GoogleMapComponent = ({ searchLocation, onLocationSelect }) => {
  const [region, setRegion] = useState({
    latitude: 37.5665, // 초기 중앙 위치 (서울)
    longitude: 126.978,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421, // 확대 정도
  });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 37.5665, // 기본값 서울.
    longitude: 126.978,
  });

  // searchLocation prop이 변경될 때마다 위치를 업데이트하는 useEffect
  useEffect(() => {
    if (searchLocation && searchLocation.latitude && searchLocation.longitude) {
      const newRegion = {
        latitude: searchLocation.latitude,
        longitude: searchLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      // 지도 중심과 마커 위치 업데이트
      setRegion(newRegion);
      setMarkerPosition({
        latitude: searchLocation.latitude,
        longitude: searchLocation.longitude,
      });

      // 부모 컴포넌트로 선택된 위치 전달
      if (onLocationSelect) {
        onLocationSelect({
          latitude: searchLocation.latitude,
          longitude: searchLocation.longitude,
        });
      }
    }
  }, [searchLocation, onLocationSelect]); // searchLocation가 변경될 때만 실행

  // 지도 클릭 시 마커 위치 업데이트 및 부모 컴포넌트에 전달
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate);

    if (onLocationSelect) {
      onLocationSelect(coordinate); // 부모 컴포넌트로 선택된 위치 전달
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        onPress={handleMapPress} // 지도를 클릭했을 때 마커 위치 변경
      >
        <Marker coordinate={markerPosition} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default GoogleMapComponent;
