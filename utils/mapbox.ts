import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_ACCESS_TOKEN } from './constants';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN || '';

export default mapboxgl;