import mapboxgl, { GeoJSONSource } from 'mapbox-gl';

export interface JourneysMapPlugin {
  loadMap(accessToken: string, apiKey: string, container: string): void;
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
    poi?: any,
  ): void;

  addJourneysExperiencesLayer(data: GeoJSON.FeatureCollection): void;
  addJourneyListLayer(data: GeoJSON.FeatureCollection): void;
  addPoiListLayer(data: GeoJSON.FeatureCollection): void;

  clearSource(id: string): void;
  clearMap(resetZoom: boolean): void;
  removeMarker(marker: mapboxgl.Marker): void;

  addStopPoint(coordinates: number[][]): void;
  getJourneysStartEnd(): mapboxgl.Marker[];
  getMap(): mapboxgl.Map | undefined;
}
