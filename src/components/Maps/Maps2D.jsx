import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import { Button } from "@chakra-ui/react";
import FloatingMenu from "components/FloatingMenu/FloatingMenu";
import Swal from "sweetalert2";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN





export default function Maps2D() {
    const mapContainer = useRef()
    const [isRealTime, setIsRealTime] = useState(false)
    const [isAtStart, setisAtStart] = useState(true);





    // this is where all of our map logic is going to live
    // adding the empty dependency array ensures that the map
    // is only created once
    useEffect(() => {
        // create the map and configure it
        // check out the API reference for more options
        // https://docs.mapbox.com/mapbox-gl-js/api/map/
        const map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/atomauro/cl716gz31000714ndxrraz3ah',
            center: [-74.0066, 40.7135],
            zoom: 1,
            pitch: 0,
            bearing: 0,
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
        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );

        // Add geolocate control to the map.
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            })
        );

        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl());


    }, [])

    return (
        <>
            <div
                id="map"
                ref={mapContainer}
                style={{ width: "100%", height: "50rem", marginTop: "4rem" }}
            >
                <FloatingMenu socket={socket} isRealTime={isRealTime} setIsRealTime={setIsRealTime} />
            </div>
        </>
    )
}