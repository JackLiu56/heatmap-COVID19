import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import KML from "ol/format/KML";
import { Heatmap as HeatmapLayer, Tile as TileLayer } from "ol/layer";
import Stamen from "ol/source/Stamen";
import VectorSource from "ol/source/Vector";

var blur = document.getElementById("blur");
var radius = document.getElementById("radius");

var vector = new HeatmapLayer({
  source: new VectorSource({
    url: "data/kml/mobility_report_regions.kml",
    format: new KML({
      extractStyles: false
    })
  }),
  blur: parseInt(blur.value, 10),
  radius: parseInt(radius.value, 10),
  weight: function(feature) {
    return 5;
  }
});

var raster = new TileLayer({
  source: new Stamen({
    layer: "toner"
  })
});

new Map({
  layers: [raster, vector],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

var blurHandler = function() {
  vector.setBlur(parseInt(blur.value, 10));
};
blur.addEventListener("input", blurHandler);
blur.addEventListener("change", blurHandler);

var radiusHandler = function() {
  vector.setRadius(parseInt(radius.value, 10));
};
radius.addEventListener("input", radiusHandler);
radius.addEventListener("change", radiusHandler);
