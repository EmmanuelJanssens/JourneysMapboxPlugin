import { WebPlugin } from '@capacitor/core';

import mapboxgl from 'mapbox-gl';

import type { JourneysMapPlugin } from './definitions';

export class JourneysMapWeb extends WebPlugin implements JourneysMapPlugin {
  constructor() {
    super();
    console.log('Construct');
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
      zoom: 3,
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

  addJourneysExperiencesLayer(data: GeoJSON.FeatureCollection): void {
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
  }

  addJourneyListLayer(data: GeoJSON.FeatureCollection): void {
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
  }
  addPoiListLayer(data: GeoJSON.FeatureCollection): void {
    console.log(data);
  }

  async addSource(
    id: string,
    data?: GeoJSON.FeatureCollection | GeoJSON.Feature,
    journey?: any,
  ) {
    if (this.map) {
      switch (id) {
        case this.MapLayer.journey_experiences:
          if (journey) {
            this.JourneysExperienceMarker.push(
              this.createMarker(
                'src/assets/icon/flag-start.svg',
                journey.start?.longitude!,
                journey.start?.latitude!,
                'cover',
                '20px',
              ),
            );
            this.JourneysExperienceMarker.push(
              this.createMarker(
                'src/assets/icon/flag-end.svg',
                journey.end?.longitude!,
                journey.end?.latitude!,
                'cover',
                '20px',
              ),
            );
            this.map.addSource(this.MapLayer.journey_route, {
              type: 'geojson',
              data: data,
            });
            this.map.addLayer({
              id: this.MapLayer.journey_route,
              type: 'line',
              source: this.MapLayer.journey_route,
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#555',
                'line-width': 2,
              },
            });
            this.map.addLayer({
              id: this.MapLayer.journey_route + '_symbol',
              type: 'symbol',
              source: this.MapLayer.journey_route,
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
          }
          if (data) {
            (data as GeoJSON.FeatureCollection).features.forEach(exp => {
              this.existingMarkers.set(
                exp.id as string,
                this.createMarker(
                  exp.properties!.images.length > 0
                    ? exp.properties!.images[0]
                    : 'https://firebasestorage.googleapis.com/v0/b/journeys-v2/o/images%2Fplaceholder.png?alt=media&token=c921b603-8028-42d4-a7a3-7b186f427c98',
                  (exp.geometry as GeoJSON.Point).coordinates[0],
                  (exp.geometry as GeoJSON.Point).coordinates[1],
                  '100%',
                  '30px',
                ),
              );
            });
          }
          break;
        case this.MapLayer.journey_list:
          this.map.addSource(id, {
            type: 'geojson',
            data: data,
          });

          this.map.addLayer({
            id: id,
            type: 'circle',
            source: id,
            paint: {
              'circle-color': '#FFBA93',
              'circle-radius': 6,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff',
            },
          });

          break;
        case this.MapLayer.journey_route:
          this.map.addSource(this.MapLayer.journey_route, {
            type: 'geojson',
            data: data,
          });
          this.map.addLayer({
            id: this.MapLayer.journey_route,
            type: 'line',
            source: this.MapLayer.journey_route,
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#555',
              'line-width': 2,
            },
          });
          this.map.addLayer({
            id: this.MapLayer.journey_route + '_symbol',
            type: 'symbol',
            source: this.MapLayer.journey_route,
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
          break;
        case this.MapLayer.poi_list:
          this.map?.addSource(this.MapLayer.poi_list, {
            type: 'geojson',
            data: data,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });
          this.map.addLayer({
            id: this.MapLayer.poi_cluster,
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
          this.map.addLayer({
            id: this.MapLayer.poi_cluster + '_count',
            type: 'symbol',
            source: this.MapLayer.poi_list,
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12,
            },
          });
          this.map.addLayer({
            id: this.MapLayer.poi_cluster + '_unclustered',
            type: 'circle',
            source: this.MapLayer.poi_list,
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': '#11b4da',
              'circle-radius': 6,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff',
            },
          });
          const num = [
            [journey.start.longitude, journey.start.latitude],
            [journey.end.longitude, journey.end.latitude],
          ];
          this.addStopPoint(num);
          break;
      }
    }
  }
  addStopPoint(coordinates: number[][]) {
    if (this.map) {
      this.clearSource(this.MapLayer.journey_route);
      this.map.addSource(this.MapLayer.journey_route, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      });

      this.map.addLayer({
        id: this.MapLayer.journey_route,
        type: 'line',
        source: this.MapLayer.journey_route,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#555',
          'line-width': 2,
        },
      });
    }
  }
  clearMap() {
    if (this.map) {
      this.existingLayers.forEach(layer_id => this.clearLayer(layer_id));
      this.existingSources.forEach(source_id => this.clearSource(source_id));
      this.existingMarkers.forEach((_, k) => console.log(k));
      this.existingMarkers.forEach((val, _) => val.remove());
    }
  }

  clearSource(id: string) {
    if (this.map?.getSource(id)) this.map.removeSource(id);
    return this.map!;
  }
  getJourneysStartEnd(): mapboxgl.Marker[] {
    return this.JourneysStartEndMarker;
  }

  removeMarker(marker: mapboxgl.Marker): void {
    marker.remove();
  }
  clearLayer(id: string) {
    if (this.map!.getLayer(id)) return this.map!.removeLayer(id);
    else return this.map!;
  }
}
