export default function loadScript({data, options, scriptsPath, serialize}) {
  const result = `
    window.data = \"${data ? data : null}\";
    function loadScripts(file, callback, redraw, isModule) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            var hcScript = document.createElement('script');
            hcScript.innerHTML = this.responseText;
            document.body.appendChild(hcScript);

            if (callback) {
                callback.call();
            }

            if (redraw) {
                Highcharts.chart("container", ${serialize(options)});
            }
         }
        };
        xhttp.open("GET", '${scriptsPath}' + (file) + '.hcscript', true);
        xhttp.send();
    }

    loadScripts('highcharts', function () {
        var redraw = true;
        loadScripts('highcharts-more', function () {
        }, redraw);
    }, false);`;
  return result;
}
