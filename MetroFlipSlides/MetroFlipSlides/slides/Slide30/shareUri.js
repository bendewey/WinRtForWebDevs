(function () {
    "use strict";

    var sharePane = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    var packageLocation = Windows.ApplicationModel.Package.current.installedLocation;
    var isStarted = false;

    WinJS.UI.Pages.define("/slides/Slide30/shareUri.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            document.getElementById("shareUri").addEventListener("click", shareClicked, false);
            document.getElementById("shareUriStartButton").addEventListener("click", startClicked, false);
        }
    });

    function startClicked(e) {
        if (isStarted) {
            // Stop
            isStarted = false;
            document.getElementById("shareUriStartButton").innerText = "Start";
            sharePane.removeEventListener("datarequested", dataRequested);
        }
        else {
            // Start
            isStarted = true;
            document.getElementById("shareUriStartButton").innerText = "Stop";
            sharePane.addEventListener("datarequested", dataRequested);
        }
    }

    function shareClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
    }

    function dataRequested(e) {
        e.request.data.properties.title = "Sample Sharing Link";
        e.request.data.setUri(new Windows.Foundation.Uri("http://www.bing.com/images/search?q=Sailing"));
    }
})();
