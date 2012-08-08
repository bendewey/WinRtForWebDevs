(function () {
    "use strict";

    var packageLocation = Windows.ApplicationModel.Package.current.installedLocation;
    var output;

    WinJS.UI.Pages.define("/slides/Slide22/fileSavePicker.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            output = document.getElementById("save-output");

            document.getElementById("saveFile").addEventListener("click", saveFileClicked, false);
        }
    });

    function saveFileClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        // Create the picker
        var picker = new Windows.Storage.Pickers.FileSavePicker();
        picker.commitButtonText = "Select";
        picker.suggestedFileName = "sailing.jpg";
        picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        picker.fileTypeChoices.insert("JPEG Image", [".jpg"]);

        // Open the picker for the user to select a file
        picker.pickSaveFileAsync().done(processResult, displayError);
    }

    function processResult(file) {
        if (settings.isDebugging) {
            debugger;
        }

        if (file) {
        
            writePackageFileTo("slides\\Slide22\\sailing.jpg", file)
                .then(function () {
                    output.innerText = "File " + file.name + " was saved.";
                },function () {
                    output.innerText = "File " + file.name + " couldn't be saved."; 
                });
        } else {
            displayError("An image wasn't selected.");
        }
    }

    function writePackageFileTo(packageFilePath, outputFile) {
        // get input stream from package contents
        return packageLocation.getFileAsync(packageFilePath).then(function (packageFile) {
           return packageFile.openReadAsync().then(function (packageStream) {
               // output stream
               return outputFile.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (outputStream) {
                    return Windows.Storage.Streams.RandomAccessStream.copyAsync(packageStream, outputStream).then(function () {
                        // Copy the stream from the blob to the File stream
                        return outputStream.flushAsync().then(function () {
                            outputStream.close();
                            packageStream.close();
                        });
                    });
                });
            });
        });
    }

    function displayError(error) {
        output.innerText = error;
    }

})();
