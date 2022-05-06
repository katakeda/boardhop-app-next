import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MAPBOX_ACCESS_TOKEN } from './constants';

// Set access token before export
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN || '';

// We will export all library imports through this file
export default mapboxgl;
export const MapboxGlGeocoder = MapboxGeocoder;

// Constants
export const DEFAULT_STYLE = 'mapbox://styles/mapbox/streets-v11';
export const DEFAULT_CENTER: mapboxgl.LngLatLike = [138.592229549504, 36.3864928218528];
export const DEFAULT_ZOOM = 5;