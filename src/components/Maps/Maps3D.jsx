import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"

// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export default function Maps3D() {
    const mapContainer = useRef()

    // this is where all of our map logic is going to live
    // adding the empty dependency array ensures that the map
    // is only created once
    useEffect(() => {
        // create the map and configure it
        // check out the API reference for more options
        // https://docs.mapbox.com/mapbox-gl-js/api/map/
        const map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-74.0066, 40.7135],
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            container: 'map',
            antialias: true
        })

        map.on('load', () => {
            // Insert the layer beneath any symbol layer.
            const layers = map.getStyle().layers;
            const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout['text-field']
            ).id;

            // The 'building' layer in the Mapbox Streets
            // vector tileset contains building height data
            // from OpenStreetMap.
            map.addLayer(
                {
                    'id': 'add-3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',

                        // Use an 'interpolate' expression to
                        // add a smooth transition effect to
                        // the buildings as the user zooms in.
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );
        });
    }, [])

    return (
        <div
            id="map"
            ref={mapContainer}
            style={{ width: "100%", height: "100vh" }}
        />
    )
}