export function liveReloadScript() {
  return `
    let reloadTimeout
    (function() {
      let ws = new WebSocket(\"ws://localhost:3001/ws\")

      ws.onopen = function() {
        console.log("LiveReload connected");
      };

      ws.onmessage = function(event) {
        clearTimeout(reloadTimeout);

        reloadTimeout = setTimeout(function() {
          location.reload();
        }, 100);
      };
    })();
  `
}
