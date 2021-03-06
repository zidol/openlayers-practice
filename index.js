import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { get as getProjection } from "ol/proj";
import Overlay from 'ol/Overlay';

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
      color: "blue",
      width: 3
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
        SIG_KOR_NM: "?????????",
        EMD_CD: "47170101",
        EMD_ENG_NM: "Samsan-dong",
        EMD_KOR_NM: "?????????"
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
        SIG_KOR_NM: "?????????",
        EMD_CD: "47170102",
        EMD_ENG_NM: "Seobu-dong",
        EMD_KOR_NM: "?????????"
      }
    }
  ]
};

var vectorSource = new VectorSource({
  url: 'http://112.220.90.93:8899/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%EC%8B%9C%EB%8F%84&maxFeatures=50&outputFormat=application%2Fjson',
  format: new GeoJSON(),
});

var vectorSource2 = new VectorSource({
  url: 'http://112.220.90.93:8899/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%EC%8B%9C%EA%B5%B0%EA%B5%AC&maxFeatures=50&outputFormat=application%2Fjson',
  format: new GeoJSON(),
});
/**************overlay start *************** */

/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/**************overlay end *************** */

// var vectorSource = new VectorSource({
//   features: new GeoJSON().readFeatures(geojsonObject)
// });

var vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction
});
var vectorLayer2 = new VectorLayer({
  source: vectorSource2,
  style: styleFunction
});
// proj4.defs(
//   "EPSG:5179",
//   "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
// );
proj4.defs(
  "EPSG:4326",
  "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"
);

register(proj4);
const koreaProjection = getProjection("EPSG:4326");


/** overlay */
/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});
var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer,
    // vectorLayer2
  ],
  overlays: [overlay],
  target: "map",
  view: new View({
    projection: koreaProjection,
    center: [14143087.77691487,36.55891018869106],
    zoom: 5
  })
});

/** overlay  code start **/
/**
 * Add a click handler to the map to render the popup.
 */

var selected = null;
map.on('singleclick', function (evt) {
  var coordinate = evt.coordinate;
//   var hdms = toStringHDMS(toLonLat(coordinate));
  console.log(selected);
  if(selected != null) {
    if(selected.get('CTP_KOR_NM') != null) {
      content.innerHTML = '<p>You clicked here: <code>' + selected.get('CTP_KOR_NM') + '</code></p>';
    } else if(selected.get('CTP_KOR_NM') != null && selected.get('SIG_KOR_NM') != null){
      content.innerHTML = '<p>You clicked here: <code>' + selected.get('CTP_KOR_NM') + ' ' +selected.get('SIG_KOR_NM') + '</code></p>';
    } else if(selected.get('SIG_KOR_NM') != null){
      content.innerHTML = '<p>You clicked here: <code>' + selected.get('SIG_KOR_NM') + '</code></p>';
    } 
    
    overlay.setPosition(coordinate);
  } else {
    closer.onclick();
  }
});
map.on('dblclick', function(evt) {
  console.log(evt)
})
/** overlay  code end*/


var highlightStyle = new Style({
  fill: new Fill({
    color: 'rgba(255,255,255,0.7)',
  }),
  stroke: new Stroke({
    color: '#3399CC',
    width: 3,
  }),
});

var status = document.getElementById('status');

map.on('pointermove', function (e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    selected = null;
  }

  map.forEachFeatureAtPixel(e.pixel, function (f) {
    selected = f;
    f.setStyle(highlightStyle);
    return true;
  });

  if (selected) {
    //  content.innerHTML = '<p>You clicked here: <code>' + selected.get('CTP_KOR_NM') + '</code></p>';
    //  var coordinate = e.coordinate;
    // overlay.setPosition(coordinate);
    if(selected.get('CTP_KOR_NM') != null) {
        status.innerHTML = '&nbsp;Hovering: ' + selected.get('CTP_KOR_NM');
    } else if(selected.get('SIG_KOR_NM') != null) {
        status.innerHTML = '&nbsp;Hovering: ' + selected.get('SIG_KOR_NM');
    }
  } else {
    status.innerHTML = '&nbsp;';
  }
});

var currZoom = 0;
map.on('moveend', function(e) {
  var newZoom = map.getView().getZoom();
  console.log('currZoom : ' + currZoom)
  console.log('newZoom : ' + newZoom)
  if(newZoom >= 10 && !(currZoom > 10)) {
      // vectorLayer.getSource().clear();
      // vectorSource.setUrl('http://112.220.90.93:8899/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%EC%8B%9C%EA%B5%B0%EA%B5%AC&maxFeatures=50&outputFormat=application%2Fjson');
      // vectorSource.refresh(); 
      // map.layers.push(vectorLayer2);
      // vectorSource.refresh(); 
      map.addLayer(vectorLayer2);

  } else if(newZoom < 10 && !(currZoom < 10)){
      map.removeLayer(vectorLayer2)
    // vectorLayer.getSource().clear();
    // vectorSource.setUrl('http://112.220.90.93:8899/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%EC%8B%9C%EB%8F%84&maxFeatures=50&outputFormat=application%2Fjson');
    // vectorSource.refresh(); 
  }
  currZoom = map.getView().getZoom();
})