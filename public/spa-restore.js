// GitHub Pages SPA: restore the path 404.html encoded into ?p= (kept out of index.html so the CSP can forbid inline scripts).
(function () {
  var p = new URLSearchParams(window.location.search).get('p');
  if (p) {
    var h = new URLSearchParams(window.location.search).get('h') || '';
    window.history.replaceState(null, '', decodeURIComponent(p) + decodeURIComponent(h));
  }
})();
