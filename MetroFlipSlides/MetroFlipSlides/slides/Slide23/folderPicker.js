(function () {
    "use strict";

    var packageLocation = Windows.ApplicationModel.Package.current.installedLocation;
    var output;

    WinJS.UI.Pages.define("/slides/Slide23/folderPicker.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            output = document.getElementById("folder-output");

            document.getElementById("saveToFolder").addEventListener("click", saveFileClicked, false);
        }
    });

    function saveFileClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        // Create the picker
        var picker = new Windows.Storage.Pickers.FolderPicker();
        picker.commitButtonText = "Select";
        picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        picker.fileTypeFilter.replaceAll(["*"]);

        // Open the picker for the user to select a file
        picker.pickSingleFolderAsync().done(processResult, displayError);
    }

    function processResult(folder) {
        if (settings.isDebugging) {
            debugger;
        }

        if (folder) {
            output.innerText = "Saving files...";

            var savingPromises = [];

            // parallel async
            savingPromises.push(writePackageFileToFolder("slides\\Slide23\\sailing1.jpg", "sailing1.jpg", folder));
            savingPromises.push(writePackageFileToFolder("slides\\Slide23\\sailing2.jpg", "sailing2.jpg", folder));
            savingPromises.push(writePackageFileToFolder("slides\\Slide23\\sailing3.jpg", "sailing3.jpg", folder));
            savingPromises.push(writePackageFileToFolder("slides\\Slide23\\sailing4.jpg", "sailing4.jpg", folder));

            WinJS.Promise.join(savingPromises).then(function () {
                output.innerText = "4 Files were saved to " + folder.displayName;
            });

        } else {
            displayError("An image wasn't selected.");
        }
    }

    function writePackageFileToFolder(packageFilePath, filename, outputFolder) {
        // get input stream from package contents
        return packageLocation.getFileAsync(packageFilePath).then(function (packageFile) {
            return packageFile.openReadAsync().then(function (packageStream) {
                // output stream
                return outputFolder.createFileAsync(filename, Windows.Storage.CreationCollisionOption.replaceExisting).then(function (outputFile) {
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
        });
    }

    function displayError(error) {
        output.innerText = error;
    }


})();
