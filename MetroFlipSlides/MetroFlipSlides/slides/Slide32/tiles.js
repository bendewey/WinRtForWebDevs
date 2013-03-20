(function () {
    "use strict";

    WinJS.UI.Pages.define("/slides/Slide32/tiles.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            document.getElementById("setTile").addEventListener("click", setTileClicked, false);
        }
    });

    function setTileClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        // get a XML DOM version of a specific template by using getTemplateContent
        var templateTypes = Windows.UI.Notifications.TileTemplateType;
        var tileXml = Windows.UI.Notifications.TileUpdateManager
            .getTemplateContent(templateTypes.tileSquarePeekImageAndText01);

        // You will need to look at the template documentation to know how many text fields a particular template has
        // get the text attributes for this template and fill them in
        var tileTextAttributes = tileXml.getElementsByTagName("text");
        tileTextAttributes[0].appendChild(tileXml.createTextNode("Sailing"));

        var tileImageAttributes = tileXml.getElementsByTagName("image");
        tileImageAttributes[0].setAttribute("src", "ms-appx:///slides/Slide32/sailing4.jpg");

        // create the notification from the XML
        var tileNotification = new Windows.UI.Notifications.TileNotification(tileXml);

        // send the notification to the app's application tile
        var primaryTileUpdater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();
        primaryTileUpdater.update(tileNotification);
    }
})();
