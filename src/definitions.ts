import mapboxgl, { GeoJSONSource } from 'mapbox-gl';

export interface JourneysMapPlugin {
  loadMap(accessToken: string, apiKey: string, container: string): void;
  clearMap(resetZoom: boolean): void;
  getSource(id: string): GeoJSONSource;
  createMarker(
    imageUrl: string,
    lng: number,
    lat: number,
    bgSize: string,
    size: string,
  ): mapboxgl.Marker;
  addSource(
    id: string,
    data?: GeoJSON.FeatureCollection | GeoJSON.Feature,
    journey?: any,
  ): void;
  clearSource(id: string): mapboxgl.Map;

  getMap(): mapboxgl.Map | undefined;
}
