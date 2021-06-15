import "ol/ol.css";
import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { get as getProjection } from "ol/proj";
var image = new CircleStyle({
  radius: 5,
  fill: null,
  stroke: new Stroke({ color: "red", width: 1 })
});

var styles = {
  Point: new Style({
    image: image
  }),
  LineString: new Style({
    stroke: new Stroke({
      color: "green",
      width: 1
    })
  }),
  MultiLineString: new Style({
    stroke: new Stroke({
      color: "green",
      width: 1
    })
  }),
  MultiPoint: new Style({
    image: image
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "yellow",
      width: 1
    }),
    fill: new Fill({
      color: "rgba(255, 255, 0, 0.1)"
    })
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)"
    })
  }),
  GeometryCollection: new Style({
    stroke: new Stroke({
      color: "magenta",
      width: 2
    }),
    fill: new Fill({
      color: "magenta"
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: "magenta"
      })
    })
  }),
  Circle: new Style({
    stroke: new Stroke({
      color: "red",
      width: 2
    }),
    fill: new Fill({
      color: "rgba(255,0,0,0.2)"
    })
  })
};

var styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

var geojsonObject = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "EPSG:5179"
    }
  },
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [1110292.0883391346, 1841685.5549198543]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [1110292.0883391346, 1841685.5549198543],
            [1110245.8378409285, 1841692.6666170647],
            [1110213.677576043, 1841694.7690716009],
            [1110155.1895817479, 1841691.0751905642],
            [1110140.8490816173, 1841690.149366993],
            [1110140.542571588, 1841691.3374110227],
            [1110137.4164913567, 1841690.6666865947],
            [1110146.684912659, 1841665.0700765443],
            [1110149.0259113666, 1841652.690398559],
            [1110102.4129133618, 1841662.208092973],
            [1110073.0931256032, 1841561.3525963407],
            [1110057.7007561997, 1841508.3037909844],
            [1110145.9539120179, 1841494.041017557],
            [1110154.9748657614, 1841492.745076324],
            [1110194.8233211976, 1841485.9493296945],
            [1110209.894313258, 1841483.0590939308],
            [1110235.9782160437, 1841477.8331705735],
            [1110243.2776295093, 1841476.1394009164],
            [1110277.882677912, 1841620.4763099696],
            [1110285.9446856005, 1841657.4139691181],
            [1110292.0883391346, 1841685.5549198543]
          ]
        ]
      },
      properties: {
        SIG_CD: "47170",
        SIG_KOR_NM: "안동시",
        EMD_CD: "47170101",
        EMD_ENG_NM: "Samsan-dong",
        EMD_KOR_NM: "삼산동"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [1110292.0883391346, 1841685.5549198543],
            [1110245.8378409285, 1841692.6666170647],
            [1110213.677576043, 1841694.7690716009],
            [1110155.1895817479, 1841691.0751905642],
            [1110140.8490816173, 1841690.149366993],
            [1110140.542571588, 1841691.3374110227],
            [1110137.4164913567, 1841690.6666865947],
            [1110146.684912659, 1841665.0700765443],
            [1110149.0259113666, 1841652.690398559],
            [1110102.4129133618, 1841662.208092973],
            [1110073.0931256032, 1841561.3525963407],
            [1110057.7007561997, 1841508.3037909844],
            [1110145.9539120179, 1841494.041017557],
            [1110154.9748657614, 1841492.745076324],
            [1110194.8233211976, 1841485.9493296945],
            [1110209.894313258, 1841483.0590939308],
            [1110235.9782160437, 1841477.8331705735],
            [1110243.2776295093, 1841476.1394009164],
            [1110277.882677912, 1841620.4763099696],
            [1110285.9446856005, 1841657.4139691181],
            [1110292.0883391346, 1841685.5549198543]
          ]
        ]
      },
      properties: {
        SIG_CD: "47170",
        SIG_KOR_NM: "안동시",
        EMD_CD: "47170101",
        EMD_ENG_NM: "Samsan-dong",
        EMD_KOR_NM: "삼산동"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [1110057.7007561997, 1841508.3037909844],
            [1110073.0931256032, 1841561.3525963407],
            [1110102.4129133618, 1841662.208092973],
            [1110018.9323561029, 1841681.2556650708],
            [1109993.2246087561, 1841686.9173789672],
            [1109963.9706062172, 1841695.189336691],
            [1109959.8674515476, 1841692.8675897417],
            [1109949.5302834138, 1841687.081981823],
            [1109888.7022369278, 1841659.7239503437],
            [1109848.1652541095, 1841624.1719864437],
            [1109797.4264048252, 1841584.8632522793],
            [1109805.033509886, 1841582.4813917177],
            [1109896.1514781944, 1841554.3043847915],
            [1109957.1551987748, 1841537.4344653708],
            [1110057.7007561997, 1841508.3037909844]
          ]
        ]
      },
      properties: {
        SIG_CD: "47170",
        SIG_KOR_NM: "안동시",
        EMD_CD: "47170102",
        EMD_ENG_NM: "Seobu-dong",
        EMD_KOR_NM: "서부동"
      }
    }
  ]
};

var vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject)
});

vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

var vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction
});
proj4.defs(
  "EPSG:5179",
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
);
register(proj4);
const koreaProjection = getProjection("EPSG:5179");
var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer
  ],
  target: "map",
  view: new View({
    projection: koreaProjection,
    center: [1110292.0883391346, 1841685.5549198543],
    zoom: 12
  })
});
