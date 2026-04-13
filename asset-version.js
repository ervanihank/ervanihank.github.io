window.ASSET_VERSION = "2026-04-16";

window.writeVersionedStylesheet = function (path) {
  document.write('<link rel="stylesheet" href="' + path + '?v=' + window.ASSET_VERSION + '" />');
};

window.writeVersionedScript = function (path) {
  document.write('<script src="' + path + '?v=' + window.ASSET_VERSION + '"><\/script>');
};

window.writeFaviconTags = function (iconPath, appleTouchPath) {
  document.write('<link rel="icon" type="image/svg+xml" href="' + iconPath + '?v=' + window.ASSET_VERSION + '" />');
  document.write('<link rel="alternate icon" type="image/png" href="' + (appleTouchPath || iconPath) + '?v=' + window.ASSET_VERSION + '" />');
  document.write('<link rel="apple-touch-icon" href="' + (appleTouchPath || iconPath) + '?v=' + window.ASSET_VERSION + '" />');
};
