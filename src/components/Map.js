import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const Map = withScriptjs(
  withGoogleMap(props => {
    const refs = {};
    const onMapMounted = ref => {
      console.log('mounted ref');
      refs.map = ref;
    };

    const handleBoundsChanged = () => {
      const { onChangedBounds } = props;
      console.log('handleBoundsChanged');
      if (refs.map === undefined) return;

      const coords = refs.map.getBounds();
      if (coords === undefined || coords === null) return;
      const bounds = {};
      bounds['nw'] = { lat: coords.f.b, lng: coords.b.b };
      bounds['se'] = { lat: coords.f.f, lng: coords.b.f };
      console.log({ bounds });
      onChangedBounds(bounds);
    };

    const { center } = props;
    return (
      <GoogleMap
        ref={onMapMounted}
        defaultZoom={8}
        defaultCenter={center}
        onBoundsChanged={handleBoundsChanged}
      >
        <Marker position={center} />
      </GoogleMap>
    );
  })
);

export default Map;
