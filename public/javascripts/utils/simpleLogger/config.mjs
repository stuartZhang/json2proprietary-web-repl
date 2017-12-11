export default {
  'entry': __filepath,
  'bbjsStack': true,
  'priorExcluded': true,
  'includes': {
    'all': 'all'
  },
  'excludes': {
    // A
    'Adjust DVR TPTH & TPAR & TPSH > UI Thread > Checkpoints': 'd',
    // B
    'Background Source > loadFeatures': 'd',
    'Binary': 'i',
    // C
    'Concurrent Serializer': 'd',
    'Controls > Menu > Feature Info > ZeroClipboard': 'i',
    // D
    'DB lvl2 Cache > restore': 'd',
    // F
    'Formatter': 'd',
    'Formatter > Altitude': 'd',
    'Formatter > Materials > getMaterial': 'd',
    'Frontground Source > onZoomChanged > Checkpoints': 'd',
    'Frontground Source > Performance': 'd',
    // I
    'IndexedDB Driver': 'd',
    // R
    'Rotate DVR-TPTH > UI Thread > Styles In Features': 'd',
    'Rotate DVR-TPTH > UI Thread > Checkpoints': 'd',
    // L
    'Layer': 'd',
    // M
    'Multi Source Merge > onMapZoomChanged': '',
    'Multi Source Merge > onMapZoomChanged > Checkpoints': 'd',
    'Multi Source Merge > Build TPTH & TPAR & TPSH & PNTS > UI Thread > Styles In Features': 'd',
    'Multi Source Merge > Build TPTH & TPAR & TPSH & PNTS > UI Thread > Checkpoints': 'd',
    // N
    'NBM Loader Worker': 'd',
    // S
    'serialize > Web Worker': 'i',
    'serialize > UI Thread': 'i',
    'serialize > UI Thread > Features': 'd',
    'serialize > UI Thread > Sub Features': 'd',
    'Serialize(ws2ui) > ol.style.style': 'd',
    'Serialize(ui2ws) > ol.style.style': 'd',
    'Serialize(ws2ui) > ol.geom.Point': 'd',
    'Serialize(ui2ws) > ol.geom.Point': 'd',
    'Serialize(ui2ws) > ol.Feature': 'd',
    'Storage > get': 'd',
    'sylvesterExt > Polyline#amendForArrow': 'd',
    'Service Worker': 'd',
    // T
    'Tile Loader > NBM': 'i',
    'Tile Loader > NBM > performance': 'd',
    // U
    'Unpacker > NBM': 'd',
    'Unpacker > NBM > TypeSet': 'd',
    // W
    'webworker-load-vectortile': 'd',
    'webworker-build-road': 'i',
    'webworker-adjust-road': 'i',
    'webworker-rotate-roads': 'd',
    'Worker Manager': 'd',
    'Worker Manager > PoolWorker': 'd'
  }
};
