import mapboxgl from 'mapbox-gl';

export interface JourneyMapCapacitorPlugin {
  loadMap(accessToken: string, apiKey: string, container: string): void;
  createMarker(
    imageUrl: string,
    lng: number,
    lat: number,
    bgSize: string,
    size: string,
  ): mapboxgl.Marker;

  addJourneysExperiencesLayer(
    data: GeoJSON.FeatureCollection,
  ): mapboxgl.Map | undefined;
  addJourneyListLayer(
    data: GeoJSON.FeatureCollection,
  ): mapboxgl.Map | undefined;
  addPoiListLayer(data: GeoJSON.FeatureCollection): mapboxgl.Map | undefined;

  clearSource(id: string): void;
  clearLayer(id: string): void;

  clearMap(resetZoom: boolean): void;
  removeMarker(marker: mapboxgl.Marker): void;

  getmarkerbyId(id: string): mapboxgl.Marker | undefined;
  addStopPoint(data: GeoJSON.Feature): void;
  getJourneysStartEnd(): mapboxgl.Marker[];
  getMap(): mapboxgl.Map | undefined;
}
