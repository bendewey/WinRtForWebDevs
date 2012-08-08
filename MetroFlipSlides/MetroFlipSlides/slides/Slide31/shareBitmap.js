(function () {
    "use strict";

    var sharePane = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    var isStarted = false;
    var imageFile;

    WinJS.UI.Pages.define("/slides/Slide31/shareBitmap.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            document.getElementById("shareBitmap").addEventListener("click", shareClicked, false);
            document.getElementById("shareBitmapStartButton").addEventListener("click", startClicked, false);

            preloadFile("slides\\Slide29\\sailing4.jpg");
        }
    });

    function startClicked(e) {
        if (isStarted) {
            // Stop
            isStarted = false;
            document.getElementById("shareBitmapStartButton").innerText = "Start";
            sharePane.removeEventListener("datarequested", dataRequested);
        }
        else {
            // Start
            isStarted = true;
            document.getElementById("shareBitmapStartButton").innerText = "Stop";
            sharePane.addEventListener("datarequested", dataRequested);
        }
    }

    function shareClicked(e) {
        Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
    }

    function preloadFile(filename) {
        var packageLocation = Windows.ApplicationModel.Package.current.installedLocation;

        packageLocation.getFileAsync(filename).then(function (file) {
            imageFile = file;
        });
    }

    function dataRequested(e) {
        if (settings.isDebugging) {
            debugger;
        }

        e.request.data.properties.title = "Sample Sharing Image";
        e.request.data.properties.description = "Sharing Sailing Image";

        var streamReference = Windows.Storage.Streams.RandomAccessStreamReference.createFromFile(imageFile);
        e.request.data.properties.thumbnail = streamReference;
        
        // Put the image file in an array and pass it to setStorageItems
        e.request.data.setStorageItems([imageFile]);

        // The setBitmap method requires a RandomAccessStreamReference
        e.request.data.setBitmap(streamReference);
    }
})();
