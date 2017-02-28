var chessground = require('chessground');

function make(data, config, onMove, onNewPiece, opts) {
  return new chessground.controller({
    fen: config.fen,
    check: config.check,
    lastMove: config.lastMove,
    orientation: data.orientation,
    coordinates: data.pref.coords !== 0,
    movable: {
      free: false,
      color: config.movable.color,
      dests: config.movable.dests,
      rookCastle: data.pref.rookCastle
    },
    events: {
      move: onMove,
      dropNewPiece: onNewPiece
    },
    premovable: {
      enabled: config.premovable
    },
    drawable: {
      enabled: true,
      eraseOnClick: !opts.study || opts.practice
    },
    highlight: {
      lastMove: data.pref.highlight,
      check: data.pref.highlight,
      dragOver: true
    },
    animation: {
      enabled: true,
      duration: data.pref.animationDuration
    },
    disableContextMenu: true
  });
}

function promote(ground, key, role) {
  var pieces = {};
  var piece = ground.data.pieces[key];
  if (piece && piece.role == 'pawn') {
    pieces[key] = {
      color: piece.color,
      role: role
    };
    ground.setPieces(pieces);
  }
}

module.exports = {
  make: make,
  promote: promote
};
