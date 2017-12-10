export default {
  'entry': __isWorker ? __filename : __filepath,
  'bbjsStack': true,
  'priorExcluded': true,
  'includes': {
    'all': 'all'
  },
  'excludes': {
    'jqstorage': 'd',
    'jbinary': 'i',
    'map_nbm_unpack': 'd',
    'map_tile_load': 'd',
    'map_nbm_tile_load': 'd',
    'map_nbm_format': 'd',
    'map_nbm_format_dvr': 'd',
    'map_nbm_source_dvr': 'd'
  },
  'categories': {
    'jbinary': 'jBinary Base',
    'jqstorage': 'jQuery Storage',
    'wwr': 'Web Worker Response',
    'idbm': 'IndexedDB Management',
    'upr': 'Unhandled Promise Rejection',
    //
    'map_ctrl_ctxmu': 'Map Control Context Menu',
    //
    'map_nbm_format': 'Map NBM Format',
    'map_nbm_format_dvr': 'Map NBM DVR Format',
    //
    'map_nbm_unpack': 'Map NBM Unpack',
    'map_nbm_unpack_text': 'Map NBM Unpack:TEXT',
    //
    'map_tile_load': 'Map Tile Load',
    'map_nbm_tile_load': 'Map NBM Tile Load',
    //
    'map_nbm_source_dvr': 'Map Draw DVR'
  }
};
