(function () {
    "use strict";

    var output;

    WinJS.UI.Pages.define("/slides/Slide14/camera.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            output = document.getElementById("camera-output");

            document.getElementById("launchCamera").addEventListener("click", launchCameraClicked, false);

        }
    });

    function launchCameraClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        // Using Windows.Media.Capture.CameraCaptureUI API to capture a photo
        var dialog = new Windows.Media.Capture.CameraCaptureUI();
        var aspectRatio = { width: 1, height: 1 };

        dialog.photoSettings.croppedAspectRatio = aspectRatio;
        dialog.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).done(function (file) {

            if (file) {

                var photoBlobUrl = URL.createObjectURL(file);
                var capturedPhoto = document.createElement("img");
                capturedPhoto.src = photoBlobUrl;
                output.innerHTML = "";
                output.appendChild(capturedPhoto);
                
            } else {
                output.innerText = "No photo captured.";
            }
        }, function (err) {
            output.innerText = err
        });

    }
})();
