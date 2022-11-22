# capacitor-mapbox

Display map for journeys app

## Install

```bash
npm install capacitor-mapbox
npx cap sync
```

## API

<docgen-index>

* [`loadMap(...)`](#loadmap)
* [`createMarker(...)`](#createmarker)
* [`addJourneysExperiencesLayer(...)`](#addjourneysexperienceslayer)
* [`addJourneyListLayer(...)`](#addjourneylistlayer)
* [`addPoiListLayer(...)`](#addpoilistlayer)
* [`clearSource(...)`](#clearsource)
* [`clearLayer(...)`](#clearlayer)
* [`clearMap(...)`](#clearmap)
* [`removeMarker(...)`](#removemarker)
* [`getmarkerbyId(...)`](#getmarkerbyid)
* [`addStopPoint(...)`](#addstoppoint)
* [`getJourneysStartEnd()`](#getjourneysstartend)
* [`getMap()`](#getmap)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### loadMap(...)

```typescript
loadMap(accessToken: string, container: string) => void
```

| Param             | Type                |
| ----------------- | ------------------- |
| **`accessToken`** | <code>string</code> |
| **`container`**   | <code>string</code> |

--------------------


### createMarker(...)

```typescript
createMarker(imageUrl: string, lng: number, lat: number, bgSize: string, size: string) => mapboxgl.Marker
```

| Param          | Type                |
| -------------- | ------------------- |
| **`imageUrl`** | <code>string</code> |
| **`lng`**      | <code>number</code> |
| **`lat`**      | <code>number</code> |
| **`bgSize`**   | <code>string</code> |
| **`size`**     | <code>string</code> |

**Returns:** <code>Marker</code>

--------------------


### addJourneysExperiencesLayer(...)

```typescript
addJourneysExperiencesLayer(data: GeoJSON.FeatureCollection) => mapboxgl.Map | undefined
```

| Param      | Type                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| **`data`** | <code><a href="#featurecollection">FeatureCollection</a>&lt;<a href="#geometry">Geometry</a>, GeoJsonProperties&gt;</code> |

**Returns:** <code>Map</code>

--------------------


### addJourneyListLayer(...)

```typescript
addJourneyListLayer(data: GeoJSON.FeatureCollection) => mapboxgl.Map | undefined
```

| Param      | Type                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| **`data`** | <code><a href="#featurecollection">FeatureCollection</a>&lt;<a href="#geometry">Geometry</a>, GeoJsonProperties&gt;</code> |

**Returns:** <code>Map</code>

--------------------


### addPoiListLayer(...)

```typescript
addPoiListLayer(data: GeoJSON.FeatureCollection) => mapboxgl.Map | undefined
```

| Param      | Type                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| **`data`** | <code><a href="#featurecollection">FeatureCollection</a>&lt;<a href="#geometry">Geometry</a>, GeoJsonProperties&gt;</code> |

**Returns:** <code>Map</code>

--------------------


### clearSource(...)

```typescript
clearSource(id: string) => void
```

| Param    | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### clearLayer(...)

```typescript
clearLayer(id: string) => void
```

| Param    | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### clearMap(...)

```typescript
clearMap(resetZoom: boolean) => void
```

| Param           | Type                 |
| --------------- | -------------------- |
| **`resetZoom`** | <code>boolean</code> |

--------------------


### removeMarker(...)

```typescript
removeMarker(marker: mapboxgl.Marker) => void
```

| Param        | Type                |
| ------------ | ------------------- |
| **`marker`** | <code>Marker</code> |

--------------------


### getmarkerbyId(...)

```typescript
getmarkerbyId(id: string) => mapboxgl.Marker | undefined
```

| Param    | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

**Returns:** <code>Marker</code>

--------------------


### addStopPoint(...)

```typescript
addStopPoint(data: GeoJSON.Feature) => void
```

| Param      | Type                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| **`data`** | <code><a href="#feature">Feature</a>&lt;<a href="#geometry">Geometry</a>, GeoJsonProperties&gt;</code> |

--------------------


### getJourneysStartEnd()

```typescript
getJourneysStartEnd() => mapboxgl.Marker[]
```

**Returns:** <code>Marker[]</code>

--------------------


### getMap()

```typescript
getMap() => mapboxgl.Map | undefined
```

**Returns:** <code>Map</code>

--------------------


### Interfaces


#### Point

<a href="#point">Point</a> geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.2

| Prop              | Type                                          | Description                                                  |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------ |
| **`type`**        | <code>'<a href="#point">Point</a>'</code>     | Specifies the type of <a href="#geojson">GeoJSON</a> object. |
| **`coordinates`** | <code><a href="#position">Position</a></code> |                                                              |


#### Position

| Prop         | Type                | Description |
| ------------ | ------------------- | ----------- |
| **`line`**   | <code>number</code> | &gt;= 1     |
| **`column`** | <code>number</code> | &gt;= 0     |


#### MultiPoint

<a href="#multipoint">MultiPoint</a> geometry object.
 https://tools.ietf.org/html/rfc7946#section-3.1.3

| Prop              | Type                                                | Description                                                  |
| ----------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| **`type`**        | <code>'<a href="#multipoint">MultiPoint</a>'</code> | Specifies the type of <a href="#geojson">GeoJSON</a> object. |
| **`coordinates`** | <code>Position[]</code>                             |                                                              |


#### LineString

<a href="#linestring">LineString</a> geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.4

| Prop              | Type                                                | Description                                                  |
| ----------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| **`type`**        | <code>'<a href="#linestring">LineString</a>'</code> | Specifies the type of <a href="#geojson">GeoJSON</a> object. |
| **`coordinates`** | <code>Position[]</code>                             |                                                              |


#### MultiLineString

<a href="#multilinestring">MultiLineString</a> geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.5

| Prop              | Type                                                          | Description                                                  |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| **`type`**        | <code>'<a href="#multilinestring">MultiLineString</a>'</code> | Specifies the type of <a href="#geojson">GeoJSON</a> object. |
| **`coordinates`** | <code>Position[][]</code>                                     |                                                              |


#### Polygon

<a href="#polygon">Polygon</a> geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.6

| Prop              | Type                                          | Description                                                  |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------ |
| **`type`**        | <code>'<a href="#polygon">Polygon</a>'</code> | Specifies the type of <a href="#geojson">GeoJSON</a> object. |
| **`coordinates`** | <code>Position[][]</code>                     |                                                              |


#### MultiPolygon

<a href="#multipolygon">MultiPolygon</a> geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.7

| Prop              | Type                                                    | Description                                                  |
| ----------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| **`type`**        | <code>'<a href="#multipolygon">MultiPolygon</a>'</code> | Specifies the type of <a href="#geojson">GeoJSON</a> object. |
| **`coordinates`** | <code>Position[][][]</code>                             |                                                              |


#### GeometryCollection

<a href="#geometry">Geometry</a> Collection
https://tools.ietf.org/html/rfc7946#section-3.1.8

| Prop             | Type                                                                | Description                                                  |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| **`type`**       | <code>'<a href="#geometrycollection">GeometryCollection</a>'</code> | Specifies the type of <a href="#geojson">GeoJSON</a> object. |
| **`geometries`** | <code>G[]</code>                                                    |                                                              |


#### Feature

A feature object which contains a geometry and associated properties.
https://tools.ietf.org/html/rfc7946#section-3.2

| Prop             | Type                                          | Description                                                                                         |
| ---------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **`type`**       | <code>'<a href="#feature">Feature</a>'</code> | Specifies the type of <a href="#geojson">GeoJSON</a> object.                                        |
| **`geometry`**   | <code>G</code>                                | The feature's geometry                                                                              |
| **`id`**         | <code>string \| number</code>                 | A value that uniquely identifies this feature in a https://tools.ietf.org/html/rfc7946#section-3.2. |
| **`properties`** | <code>P</code>                                | Properties associated with this feature.                                                            |


#### FeatureCollection

A collection of feature objects.
 https://tools.ietf.org/html/rfc7946#section-3.3

| Prop           | Type                                                                                      | Description                                                  |
| -------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **`type`**     | <code>'<a href="#featurecollection">FeatureCollection</a>'</code>                         | Specifies the type of <a href="#geojson">GeoJSON</a> object. |
| **`features`** | <code><a href="#array">Array</a>&lt;<a href="#feature">Feature</a>&lt;G, P&gt;&gt;</code> |                                                              |


#### Array

| Prop         | Type                | Description                                                                                            |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------ |
| **`length`** | <code>number</code> | Gets or sets the length of the array. This is a number one higher than the highest index in the array. |

| Method             | Signature                                                                                                                     | Description                                                                                                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**       | () =&gt; string                                                                                                               | Returns a string representation of an array.                                                                                                                                                                                                |
| **toLocaleString** | () =&gt; string                                                                                                               | Returns a string representation of an array. The elements are converted to string using their toLocalString methods.                                                                                                                        |
| **pop**            | () =&gt; T \| undefined                                                                                                       | Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.                                                                                                          |
| **push**           | (...items: T[]) =&gt; number                                                                                                  | Appends new elements to the end of an array, and returns the new length of the array.                                                                                                                                                       |
| **concat**         | (...items: <a href="#concatarray">ConcatArray</a>&lt;T&gt;[]) =&gt; T[]                                                       | Combines two or more arrays. This method returns a new array without modifying any existing arrays.                                                                                                                                         |
| **concat**         | (...items: (T \| <a href="#concatarray">ConcatArray</a>&lt;T&gt;)[]) =&gt; T[]                                                | Combines two or more arrays. This method returns a new array without modifying any existing arrays.                                                                                                                                         |
| **join**           | (separator?: string \| undefined) =&gt; string                                                                                | Adds all the elements of an array into a string, separated by the specified separator string.                                                                                                                                               |
| **reverse**        | () =&gt; T[]                                                                                                                  | Reverses the elements in an array in place. This method mutates the array and returns a reference to the same array.                                                                                                                        |
| **shift**          | () =&gt; T \| undefined                                                                                                       | Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.                                                                                                         |
| **slice**          | (start?: number \| undefined, end?: number \| undefined) =&gt; T[]                                                            | Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.                           |
| **sort**           | (compareFn?: ((a: T, b: T) =&gt; number) \| undefined) =&gt; this                                                             | Sorts an array in place. This method mutates the array and returns a reference to the same array.                                                                                                                                           |
| **splice**         | (start: number, deleteCount?: number \| undefined) =&gt; T[]                                                                  | Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.                                                                                                                      |
| **splice**         | (start: number, deleteCount: number, ...items: T[]) =&gt; T[]                                                                 | Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.                                                                                                                      |
| **unshift**        | (...items: T[]) =&gt; number                                                                                                  | Inserts new elements at the start of an array, and returns the new length of the array.                                                                                                                                                     |
| **indexOf**        | (searchElement: T, fromIndex?: number \| undefined) =&gt; number                                                              | Returns the index of the first occurrence of a value in an array, or -1 if it is not present.                                                                                                                                               |
| **lastIndexOf**    | (searchElement: T, fromIndex?: number \| undefined) =&gt; number                                                              | Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.                                                                                                                                      |
| **every**          | &lt;S extends T&gt;(predicate: (value: T, index: number, array: T[]) =&gt; value is S, thisArg?: any) =&gt; this is S[]       | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| **every**          | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; boolean                                 | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| **some**           | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; boolean                                 | Determines whether the specified callback function returns true for any element of an array.                                                                                                                                                |
| **forEach**        | (callbackfn: (value: T, index: number, array: T[]) =&gt; void, thisArg?: any) =&gt; void                                      | Performs the specified action for each element in an array.                                                                                                                                                                                 |
| **map**            | &lt;U&gt;(callbackfn: (value: T, index: number, array: T[]) =&gt; U, thisArg?: any) =&gt; U[]                                 | Calls a defined callback function on each element of an array, and returns an array that contains the results.                                                                                                                              |
| **filter**         | &lt;S extends T&gt;(predicate: (value: T, index: number, array: T[]) =&gt; value is S, thisArg?: any) =&gt; S[]               | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| **filter**         | (predicate: (value: T, index: number, array: T[]) =&gt; unknown, thisArg?: any) =&gt; T[]                                     | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| **reduce**         | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T) =&gt; T                           | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduce**         | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T, initialValue: T) =&gt; T          |                                                                                                                                                                                                                                             |
| **reduce**         | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) =&gt; U, initialValue: U) =&gt; U | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduceRight**    | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T) =&gt; T                           | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reduceRight**    | (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =&gt; T, initialValue: T) =&gt; T          |                                                                                                                                                                                                                                             |
| **reduceRight**    | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) =&gt; U, initialValue: U) =&gt; U | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |


#### ConcatArray

| Prop         | Type                |
| ------------ | ------------------- |
| **`length`** | <code>number</code> |

| Method    | Signature                                                          |
| --------- | ------------------------------------------------------------------ |
| **join**  | (separator?: string \| undefined) =&gt; string                     |
| **slice** | (start?: number \| undefined, end?: number \| undefined) =&gt; T[] |


### Type Aliases


#### GeoJSON

Union of <a href="#geojson">GeoJSON</a> objects.

<code><a href="#geometry">Geometry</a> | <a href="#feature">Feature</a> | <a href="#featurecollection">FeatureCollection</a></code>


#### Geometry

<a href="#geometry">Geometry</a> object.
https://tools.ietf.org/html/rfc7946#section-3

<code><a href="#point">Point</a> | <a href="#multipoint">MultiPoint</a> | <a href="#linestring">LineString</a> | <a href="#multilinestring">MultiLineString</a> | <a href="#polygon">Polygon</a> | <a href="#multipolygon">MultiPolygon</a> | <a href="#geometrycollection">GeometryCollection</a></code>


#### Position

A <a href="#position">Position</a> is an array of coordinates.
https://tools.ietf.org/html/rfc7946#section-3.1.1
Array should contain between two and three elements.
The previous <a href="#geojson">GeoJSON</a> specification allowed more elements (e.g., which could be used to represent M values),
but the current specification only allows X, Y, and (optionally) Z to be defined.

<code>number[]</code>

</docgen-api>
