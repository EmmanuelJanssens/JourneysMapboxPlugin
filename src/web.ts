import { WebPlugin } from '@capacitor/core';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';

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
  JourneysExperienceMarker: mapboxgl.Marker[] = [];

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

  clearMap(resetZoom: boolean) {
    if (this.map) {
      this.clearSource(this.MapLayer.journey_experiences);
      this.clearSource(this.MapLayer.journey_list);
      this.clearSource(this.MapLayer.journey_route);
      if (resetZoom) this.map.setZoom(3);
    }
  }

  getSource(id: string): GeoJSONSource {
    return this.map!.getSource(id) as GeoJSONSource;
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
  addSource(
    id: string,
    data?: GeoJSON.FeatureCollection | GeoJSON.Feature,
    journey?: any,
  ) {
    console.log(this.map);
    console.log(id);
    console.log(data);
    console.log(journey);
    if (this.map) {
      let collection: GeoJSON.FeatureCollection;
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
          }
          collection = data as GeoJSON.FeatureCollection;
          if (collection) {
            collection.features.forEach(exp => {
              this.JourneysExperienceMarker.push(
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
      }
    }
  }

  clearSource(id: string) {
    switch (id) {
      case this.MapLayer.journey_experiences:
        if (
          this.JourneysExperienceMarker &&
          this.JourneysExperienceMarker.length > 0
        ) {
          this.JourneysExperienceMarker.forEach(marker => marker.remove());
          this.JourneysExperienceMarker = [];
        }
        /*clear_layer(this.MapLayer.journey_experiences);
                    clear_layer(this.MapLayer.journey_experiences + "_cluster");
                    clear_layer(this.MapLayer.journey_experiences + "_cluster_count");
                    clear_layer(this.MapLayer.journey_experiences + "_unclustered");
                    this.JourneysMap.removeSource(this.MapLayer.journey_experiences); */

        break;
      case this.MapLayer.journey_list:
        if (this.getSource(this.MapLayer.journey_list)) {
          this.clearLayer(this.MapLayer.journey_list);
          this.clearLayer(this.MapLayer.journey_list + '_cluster');
          this.clearLayer(this.MapLayer.journey_list + '_cluster_count');
          this.clearLayer(this.MapLayer.journey_list + '_unclustered');
          return this.map!.removeSource(this.MapLayer.journey_list);
        }
        break;
      case this.MapLayer.journey_route:
        if (this.getSource(this.MapLayer.journey_route)) {
          this.clearLayer(this.MapLayer.journey_route);
          this.clearLayer(this.MapLayer.journey_route + '_symbol');

          return this.map!.removeSource(this.MapLayer.journey_route);
        }
        break;
    }
    return this.map!;
  }

  clearLayer(id: string) {
    if (this.map!.getLayer(id)) return this.map!.removeLayer(id);
    else return this.map!;
  }
}
