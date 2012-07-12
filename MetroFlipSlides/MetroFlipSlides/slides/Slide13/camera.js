(function () {
    "use strict";

    WinJS.UI.Pages.define("/slides/Slide13/camera.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            document.getElementById("launchCamera").addEventListener("click", launchCameraClicked, false);

        }
    });

    function launchCameraClicked(e) {

        // Using Windows.Media.Capture.CameraCaptureUI API to capture a photo
        var dialog = new Windows.Media.Capture.CameraCaptureUI();
        var aspectRatio = { width: 1, height: 1 };

        dialog.photoSettings.croppedAspectRatio = aspectRatio;
        dialog.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).done(function (file) {

            if (file) {

                //var photoBlobUrl = URL.createObjectURL(file);
                //document.getElementById("capturedPhoto").src = photoBlobUrl;
                
            } else {
                WinJS.log && WinJS.log("No photo captured.", "sample", "status");
            }
        }, function (err) {
            WinJS.log && WinJS.log(err, "sample", "error");
        });

    }
})();
