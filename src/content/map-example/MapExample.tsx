import React, { useCallback, useMemo, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import useAxios from "axios-hooks";
import { ErrorBoundary } from "react-error-boundary";
import Map, { Marker, Popup } from "react-map-gl";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const MAPBOX_USER = "doodlemap";
const MAPBOX_ACCESS = `access_token=${MAPBOX_TOKEN}`;

const MAPBOX_API_DATASETS = `https://api.mapbox.com/datasets/v1/${MAPBOX_USER}`;
// const MAPBOX_DATASET_ID = "clnishn2f0yff2qnne28ghtko";
const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";

type TFeature = GeoJSON.Feature<GeoJSON.Point>;
type TFeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Point>;

/* 
example only, currently not intended to be complete component!
passing in dataset so can write test to check error state
*/
export const MapExample = ({ dataSetID = "clnishn2f0yff2qnne28ghtko" }) => {
  const [popupInfo, setPopupInfo] = useState<null | TFeature>(null);

  const mapDataURL = `${MAPBOX_API_DATASETS}/${dataSetID}/features?${MAPBOX_ACCESS}`;

  const [{ data, loading, error }] = useAxios<TFeatureCollection>(mapDataURL);

  const markers = useMemo(() => {
    return data?.features.map((feature) => {
      return (
        <Marker
          key={feature.id}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          color="blue"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(feature);
          }}
        />
      );
    });
  }, [data?.features]);

  const popup = useCallback((feature: TFeature) => {
    return (
      <Popup
        anchor="bottom"
        longitude={feature.geometry.coordinates[0]}
        latitude={feature.geometry.coordinates[1]}
        onClose={() => {
          return setPopupInfo(null);
        }}
      >
        <div style={{ color: "black", marginTop: "0.5rem" }}>
          {feature.properties?.name}
        </div>
      </Popup>
    );
  }, []);

  if (loading) return <p>Map data loading...</p>;

  if (error) {
    return (
      <div data-testid="failover">
        <p>Map data failed to load!</p>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong with the map</div>}>
      <div data-testid="map">
        <Map
          reuseMaps
          initialViewState={{
            longitude: data?.features[0].geometry.coordinates[0],
            latitude: data?.features[0].geometry.coordinates[1],
            zoom: 14,
          }}
          style={{ width: 800, height: 600 }}
          mapStyle={MAPBOX_STYLE}
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {markers}
          {popupInfo?.properties?.name && popup(popupInfo)}
        </Map>
      </div>
    </ErrorBoundary>
  );
};
