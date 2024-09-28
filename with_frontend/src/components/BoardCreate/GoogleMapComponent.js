import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import Autocomplete from "react-google-autocomplete"; // 자동 완성 기능을 위해 import

const mapContainerStyle = {
  width: "100%",
  height: "100%", // 남은 공간을 모두 차지하도록 설정
};

const defaultCenter = {
  lat: 37.5665, // 초기 중앙 위치 (서울)
  lng: 126.978,
};

const GoogleMapComponent = ({ searchPlace, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null); // 지도 인스턴스를 관리하기 위한 상태

  // 지도 클릭 시 마커 위치를 변경하고 부모 컴포넌트로 위도, 경도 전달
  const handleMapClick = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    onLocationSelect(newPosition); // 부모 컴포넌트로 위도, 경도 전달
  };

  // 주소 자동 완성에서 선택 시 호출되는 함수
  const handlePlaceSelected = (place) => {
    const location = place.geometry.location;
    const newPosition = {
      lat: location.lat(),
      lng: location.lng(),
    };
    setMarkerPosition(newPosition);
    onLocationSelect(newPosition); // 부모 컴포넌트로 위도, 경도 전달
    map.panTo(newPosition); // 지도의 중심을 선택한 위치로 이동
  };

  // 부모 컴포넌트에서 searchPlace prop이 변경될 때 지도의 중심 이동
  React.useEffect(() => {
    if (searchPlace && map) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchPlace }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          const newPosition = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setMarkerPosition(newPosition);
          map.panTo(newPosition);
          onLocationSelect(newPosition); // 부모 컴포넌트로 위도, 경도 전달
        } else {
          alert("주소를 찾을 수 없습니다.");
        }
      });
    }
  }, [searchPlace, map]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={markerPosition}
        zoom={15}
        onClick={handleMapClick}
        onLoad={(mapInstance) => setMap(mapInstance)} // 지도 인스턴스를 상태에 저장
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
