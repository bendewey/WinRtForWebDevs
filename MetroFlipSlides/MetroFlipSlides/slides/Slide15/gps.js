(function () {
    "use strict";
    var map;
    var appKey = 'AjtCwLue0sbWlEA97KGGdYOLgMMVd0kJ4qQuieZ3hS1MPs0gz4XWHIPqmTg3yRzd';

    WinJS.UI.Pages.define("/slides/Slide15/gps.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            document.getElementById("findOnMap").addEventListener("click", findOnMapClicked, false);

            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap });
        }
    });

    function initMap() {
        try {
            var mapOptions =
            {
                credentials: appKey,
                center: new Microsoft.Maps.Location(40.71, -74.00),
                mapTypeId: Microsoft.Maps.MapTypeId.auto,
                zoom: 8
            };
            map = new Microsoft.Maps.Map(document.getElementById("mapdiv"), mapOptions);
        }
        catch (e) {
            var md = new Windows.UI.Popups.MessageDialog(e.message);
            md.showAsync();
        }
    }

    function findOnMapClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        var geolocator = new Windows.Devices.Geolocation.Geolocator();
        geolocator.getGeopositionAsync().then(function (e) {

            var pushpin = new Microsoft.Maps.Pushpin(e.coordinate, null);
            map.entities.push(pushpin);

            map.setView({ center: e.coordinate, mapTypeId: Microsoft.Maps.MapTypeId.auto, zoom: 15 });

        }, function (error) {
            WinJS.log && WinJS.log(error);
        });
    }

})();