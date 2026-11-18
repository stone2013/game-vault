/* GAME VAULT original games catalog extension */
(function () {
  "use strict";
  if (typeof DEFAULT_GAMES === "undefined" || typeof CATEGORIES === "undefined") return;

  function makeCover(title, emoji, c1, c2) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect width="480" height="270" rx="20" fill="url(#g)"/>' +
      '<circle cx="415" cy="45" r="90" fill="#fff" opacity=".12"/><circle cx="55" cy="250" r="90" fill="#fff" opacity=".10"/>' +
      '<rect x="22" y="20" width="120" height="28" rx="14" fill="#0f172a" opacity=".28"/>' +
      '<text x="82" y="39" fill="#fff" font-size="12" text-anchor="middle" font-family="sans-serif" font-weight="800">GAME VAULT</text>' +
      '<text x="240" y="137" fill="#fff" font-size="76" text-anchor="middle">' + emoji + '</text>' +
      '<text x="240" y="200" fill="#fff" font-size="25" text-anchor="middle" font-family="sans-serif" font-weight="900">' + title + '</text>' +
      '<text x="240" y="229" fill="#fff" opacity=".86" font-size="13" text-anchor="middle" font-family="sans-serif">ORIGINAL CREATOR GAME</text></svg>';
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  const originals = [
    {
      id: "game-original-crash-simulator",
      title: "3D低多边形车祸模拟器",
      category: "模拟驾驶",
      path: "games/3D低多边形车祸模拟器.html",
      sourceType: "path",
      rating: "原创作品",
      players: "GAME VAULT",
      author: "Stone Studio",
      updatedAt: "2026-11-19",
      description: "原创低多边形 3D 车祸模拟器，体验车辆碰撞与物理效果。",
      cover: makeCover("CRASH SIMULATOR", "🚗", "#475569", "#ef4444"),
      playCount: 0
    },
    {
      id: "game-original-map-builder-racer",
      title: "地图搭建中：实时建路与机关乱斗竞速",
      category: "地图竞速",
      path: "games/地图搭建中___网页版实时建路与机关乱斗竞速.html",
      sourceType: "path",
      rating: "原创作品",
      players: "GAME VAULT",
      author: "Stone Studio",
      updatedAt: "2026-11-19",
      description: "原创实时建路与机关乱斗竞速游戏，边搭建地图边体验竞速挑战。",
      cover: makeCover("BUILD & RACE", "🏁", "#0f766e", "#2563eb"),
      playCount: 0
    }
  ];

  originals.forEach(function (game) {
    if (!DEFAULT_GAMES.some(function (item) { return item.id === game.id; })) {
      DEFAULT_GAMES.push(game);
    }
  });

  ["模拟驾驶", "地图竞速"].forEach(function (category) {
    if (!CATEGORIES.includes(category)) CATEGORIES.push(category);
  });

  // Existing visitors get the two additions once, without replacing custom games or history.
  const previousLoad = loadStateFromStorage;
  loadStateFromStorage = function () {
    previousLoad();
    const migrationKey = "gv_original_games_seed_v1";
    if (localStorage.getItem(migrationKey) === "done") return;
    originals.forEach(function (game) {
      if (!state.games.some(function (item) { return item.id === game.id; })) {
        state.games.push(JSON.parse(JSON.stringify(game)));
      }
    });
    saveGamesToStorage();
    localStorage.setItem(migrationKey, "done");
  };
})();