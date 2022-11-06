import { WebPlugin } from '@capacitor/core';

import mapboxgl from 'mapbox-gl';

import type { JourneyMapCapacitorPlugin } from './definitions';

export class JourneysMapWeb
  extends WebPlugin
  implements JourneyMapCapacitorPlugin
{
  constructor() {
    super();
  }

  MapLayer = {
    journey_route: 'journey_route',
    journey_list: 'journey_list',
    journey_list_route: 'journey_list_route',
    journey_experiences: 'journey_experiences',
    journey_cluster: 'journey_clusters',
    poi_list: 'poi_list',
    poi_cluster: 'poi_cluster',
  };

  map: mapboxgl.Map | undefined;
  existingMarkers: Map<string, mapboxgl.Marker> = new Map();
  existingLayers: Array<string> = new Array();
  existingSources: Array<string> = new Array();

  JourneysExperienceMarker: mapboxgl.Marker[] = [];
  JourneysStartEndMarker: mapboxgl.Marker[] = [];
  getMap(): mapboxgl.Map | undefined {
    return this.map;
  }
  loadMap(accessToken: string, apiKey: string, container: string) {
    mapboxgl.accessToken = accessToken;
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
    this.map = new mapboxgl.Map({
      container: container,
      style: `https://api.maptiler.com/maps/voyager/style.json?key=${apiKey}`,
      zoom: 6,
      center: [30, 50],
      projection: {
        name: 'globe',
      },
    });
  }

  createMarker(
    imageUrl: string,
    lng: number,
    lat: number,
    bgSize: string,
    size: string,
  ) {
    const marker = document.createElement('div');
    marker.className = 'marker';

    marker.style.backgroundImage = `url(${imageUrl})`;
    marker.style.width = size;
    marker.style.height = size;
    marker.style.backgroundRepeat = 'no-repeat';
    marker.style.borderRadius = '50%';
    marker.style.backgroundPosition = 'center center';
    marker.style.backgroundSize = bgSize;
    marker.style.display = 'block';
    return new mapboxgl.Marker(marker)
      .setLngLat(new mapboxgl.LngLat(lng, lat))
      .addTo(this.map!);
  }

  addJourneysExperiencesLayer(
    data: GeoJSON.FeatureCollection,
  ): mapboxgl.Map | undefined {
    this.clearMap();
    if (this.map) {
      const source = this.map.getSource(
        this.MapLayer.journey_experiences,
      ) as mapboxgl.GeoJSONSource;

      if (source) {
        source.setData(data);
      } else {
        this.map.addSource(this.MapLayer.journey_experiences, {
          type: 'geojson',
          data: data,
        });
        this.existingSources.push(this.MapLayer.journey_experiences);
      }
      this.map.addLayer({
        id: this.MapLayer.journey_experiences + '_route',
        type: 'line',
        source: this.MapLayer.journey_experiences,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#555',
          'line-width': 2,
        },
        filter: ['==', '$type', 'LineString'],
      });
      this.existingLayers.push(this.MapLayer.journey_experiences + '_route');

      this.map.addLayer({
        id: this.MapLayer.journey_experiences + '_route_label',
        type: 'symbol',
        source: this.MapLayer.journey_experiences,
        layout: {
          'text-justify': 'center',
          'symbol-placement': 'line-center',
          'text-font': ['Open Sans Regular'],
          'text-field': '{title}',
          'text-size': 16,
        },
        paint: {
          'text-translate': [0, -10],
        },
        filter: ['==', '$type', 'LineString'],
      });
      this.existingLayers.push(
        this.MapLayer.journey_experiences + '_route_label',
      );

      this.map.addLayer({
        id: this.MapLayer.journey_experiences + '_layer',
        type: 'circle',
        source: this.MapLayer.journey_experiences,
        paint: {
          'circle-color': '#FFBA93',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
        filter: ['==', '$type', 'Point'],
      });
      this.existingLayers.push(this.MapLayer.journey_experiences + '_layer');

      const lines = data.features.filter(
        feature => feature.geometry.type == 'LineString',
      );

      this.existingMarkers.set(
        'start',
        this.createMarker(
          'src/assets/icon/flag-start.svg',
          lines[0].properties!.start.longitude,
          lines[0].properties!.start.latitude,
          'cover',
          '20px',
        ),
      );
      this.existingMarkers.set(
        'end',
        this.createMarker(
          'src/assets/icon/flag-end.svg',
          lines[0].properties!.end.longitude,
          lines[0].properties!.end.latitude,
          'cover',
          '20px',
        ),
      );
      this.map.fitBounds(
        [
          [
            lines[0].properties!.start.longitude,
            lines[0].properties!.start.latitude,
          ],
          [
            lines[0].properties!.end.longitude,
            lines[0].properties!.end.latitude,
          ],
        ],
        {
          padding: 30,
        },
      );
    }
    return this.map;
  }

  addJourneyListLayer(
    data: GeoJSON.FeatureCollection,
  ): mapboxgl.Map | undefined {
    this.clearMap();
    if (this.map) {
      const source = this.map.getSource(
        this.MapLayer.journey_list,
      ) as mapboxgl.GeoJSONSource;

      if (source) {
        source.setData(data);
      } else {
        this.map.addSource(this.MapLayer.journey_list, {
          type: 'geojson',
          data: data,
        });
        this.existingSources.push(this.MapLayer.journey_list);
      }

      this.map.addLayer({
        id: this.MapLayer.journey_list + '_connections',
        type: 'line',
        source: this.MapLayer.journey_list,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#555',
          'line-width': 2,
        },
        filter: ['==', '$type', 'LineString'],
      });
      this.existingLayers.push(this.MapLayer.journey_list + '_connections');

      this.map.addLayer({
        id: this.MapLayer.journey_list,
        type: 'circle',
        source: this.MapLayer.journey_list,
        paint: {
          'circle-color': '#FFBA93',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
        filter: ['==', '$type', 'Point'],
      });
      this.existingLayers.push(this.MapLayer.journey_list);

      this.map.addLayer({
        id: this.MapLayer.journey_list + '_labels',
        type: 'symbol',
        source: this.MapLayer.journey_list,
        layout: {
          'text-justify': 'center',
          'symbol-placement': 'line-center',
          'text-font': ['Open Sans Regular'],
          'text-field': '{title}',
          'text-size': 16,
        },
        paint: {
          'text-translate': [0, -10],
        },
      });
      this.existingLayers.push(this.MapLayer.journey_list + '_labels');
    }
    return this.map;
  }

  addPoiListLayer(data: GeoJSON.FeatureCollection): mapboxgl.Map | undefined {
    this.clearMap();
    if (this.map) {
      this.map.off('click', () => {});
      const source = this.map.getSource(
        this.MapLayer.poi_list,
      ) as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData(data);
      } else {
        this.map?.addSource(this.MapLayer.poi_list, {
          type: 'geojson',
          data: data,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
        this.existingSources.push(this.MapLayer.poi_list);
      }
      const lines = data.features.filter(
        feature => feature.geometry.type == 'LineString',
      );

      const route_source = this.map.getSource(
        this.MapLayer.poi_list + '_route',
      ) as mapboxgl.GeoJSONSource;
      if (route_source) {
        route_source.setData(lines[0]);
      } else {
        this.map?.addSource(this.MapLayer.poi_list + '_route', {
          type: 'geojson',
          data: lines[0],
        });
        this.existingSources.push(this.MapLayer.poi_list + '_route');
      }

      this.map.addLayer({
        id: this.MapLayer.poi_list + '_route',
        type: 'line',
        source: this.MapLayer.poi_list + '_route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#555',
          'line-width': 2,
        },
        filter: ['==', '$type', 'LineString'],
      });
      this.existingLayers.push(this.MapLayer.poi_list + '_route');

      this.map.addLayer({
        id: this.MapLayer.poi_list + '_cluster',
        type: 'circle',
        source: this.MapLayer.poi_list,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });
      this.existingLayers.push(this.MapLayer.poi_list + '_cluster');

      this.map.addLayer({
        id: this.MapLayer.poi_list + '_cluster_count',
        type: 'symbol',
        source: this.MapLayer.poi_list,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      });
      this.existingLayers.push(this.MapLayer.poi_list + '_cluster_count');

      this.map.addLayer({
        id: this.MapLayer.poi_list + '_unclustered',
        type: 'circle',
        source: this.MapLayer.poi_list,
        filter: ['all', ['!has', 'point_count'], ['==', '$type', 'Point']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });
      this.existingLayers.push(this.MapLayer.poi_list + '_unclustered');

      this.existingMarkers.set(
        'journey_start',
        this.createMarker(
          'src/assets/icon/flag-start.svg',
          lines[0].properties!.start.longitude,
          lines[0].properties!.start.latitude,
          'cover',
          '20px',
        ),
      );
      this.existingMarkers.set(
        'journey_end',
        this.createMarker(
          'src/assets/icon/flag-end.svg',
          lines[0].properties!.end.longitude,
          lines[0].properties!.end.latitude,
          'cover',
          '20px',
        ),
      );
      this.map.fitBounds(
        [
          [
            lines[0].properties!.start.longitude,
            lines[0].properties!.start.latitude,
          ],
          [
            lines[0].properties!.end.longitude,
            lines[0].properties!.end.latitude,
          ],
        ],
        {
          padding: 100,
        },
      );
    }

    return this.map;
  }
  addStopPoint(data: GeoJSON.Feature) {
    if (this.map) {
      const route = this.map.getSource(
        this.MapLayer.poi_list + '_route',
      ) as mapboxgl.GeoJSONSource;
      if (route) {
        route.setData(data);
      }
    }
  }
  clearMap() {
    if (this.map) {
      this.existingLayers.forEach(layer_id => this.clearLayer(layer_id));
      this.existingSources.forEach(source_id => this.clearSource(source_id));
      this.existingMarkers.forEach((val, _) => val.remove());

      this.existingLayers.forEach((_, idx, obj) => obj.splice(idx, 1));
      this.existingSources.forEach((_, idx, obj) => obj.splice(idx, 1));
      this.existingMarkers.forEach((_, key, map) => map.delete(key));
    }
  }

  clearSource(id: string) {
    if (this.map?.getSource(id)) this.map.removeSource(id);
  }

  getmarkerbyId(id: string): mapboxgl.Marker | undefined {
    return this.existingMarkers.get(id);
  }
  getJourneysStartEnd(): mapboxgl.Marker[] {
    return this.JourneysStartEndMarker;
  }

  removeMarker(marker: mapboxgl.Marker): void {
    marker.remove();
  }
  clearLayer(id: string) {
    if (this.map?.getLayer(id)) this.map.removeLayer(id);
  }
}
