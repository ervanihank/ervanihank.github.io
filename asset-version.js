window.ASSET_VERSION = "2026-04-12";

window.writeVersionedStylesheet = function (path) {
  document.write('<link rel="stylesheet" href="' + path + '?v=' + window.ASSET_VERSION + '" />');
};

window.writeVersionedScript = function (path) {
  document.write('<script src="' + path + '?v=' + window.ASSET_VERSION + '"><\/script>');
};
