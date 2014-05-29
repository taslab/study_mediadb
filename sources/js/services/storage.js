angular.module('usemediadb')
  .factory('mediaStorage', function() {
    'use strict';

    var mEventListeners = [];

    var mMusicDB = new MediaDB('music',
      function metadataParserWrapper(file, onsuccess, onerror) {
        LazyLoader.load('js/metadata_scripts.js', function() {
          parseAudioMetadata(file, onsuccess, onerror);
        });
      }, {
        indexes: ['metadata.album', 'metadata.artist', 'metadata.title',
          'metadata.rated', 'metadata.played', 'date'
        ],
        batchSize: 1,
        autoscan: false,

        version: 2
      });

    mMusicDB.onupgrading = (event) => dispatchDBEvent(event);
    mMusicDB.onunavailable = (event) => dispatchDBEvent(event);
    mMusicDB.onready = (event) => dispatchDBEvent(event);
    mMusicDB.oncardremoved = (event) => dispatchDBEvent(event);
    mMusicDB.onscanstart = (event) => dispatchDBEvent(event);
    mMusicDB.oncreated = (event) => dispatchDBEvent(event);
    mMusicDB.ondeleted = (event) => dispatchDBEvent(event);
    mMusicDB.onscanend = (event) => dispatchDBEvent(event);

    function dispatchDBEvent(event) {
      mEventListeners.forEach((listener) => listener.apply(event.target, [event.type]));
    }

    return {
      Event: {
        UPGRADING: 'upgrading',
        UNAVAILABLE: 'unavailable',
        CARD_REMOVED: 'cardremoved',
        READY: 'ready',
        SCAN_START: 'scanstart',
        SCAN_END: 'scanend',
      },

      registDBEventListener: (listener) => mEventListeners.push(listener),
      unregistDBEventListener: (listener) => mEventListeners.remove(listener),

      scan: () => mMusicDB.scan(),
      enumerateAll: (indexKey, range, direction, callback) => mMusicDB.enumerateAll(indexKey, range, direction, callback),
    };
  });
