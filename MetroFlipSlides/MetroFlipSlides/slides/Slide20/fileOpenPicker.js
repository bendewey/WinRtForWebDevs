(function () {
    "use strict";

    var output;

    WinJS.UI.Pages.define("/slides/Slide20/fileOpenPicker.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            output = document.getElementById("open-output");

            document.getElementById("pickFile").addEventListener("click", pickFileClicked, false);
            document.getElementById("pickFiles").addEventListener("click", pickFilesClicked, false);
            
        }
    });

    function pickFileClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        // Create the picker
        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.commitButtonText = "Select";
        picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        picker.fileTypeFilter.replaceAll(["*"]);

        // Open the picker for the user to select a file
        picker.pickSingleFileAsync().then(processResult, displayError);
    }

    function pickFilesClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        // Create the picker
        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.commitButtonText = "Select";
        picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        picker.fileTypeFilter.replaceAll(["*"]);

        // Open the picker for the user to select a file
        picker.pickMultipleFilesAsync().then(processResults, displayError);
    }

    function processResult(file) {
        // Check that the picker returned a file. 
        // The picker returns null if the user clicked Cancel.
        output.innerHTML = "";
        if (file) {
            addFile(file);
        } else {
            displayError("An image wasn't selected.");
        }
    }

    function processResults(files) {

        // Check that the picker returned a file. 
        // The picker returns null if the user clicked Cancel.
        output.innerHTML = "";
        if (files && files.length > 0) {
            files.forEach(addFile);
        } else {
            displayError("No images were selected.");
        }
    }

    function addFile(file) {
        file.getThumbnailAsync(Windows.Storage.FileProperties.ThumbnailMode.listView).done(function (thumbnail) {
            if (settings.isDebugging) {
                debugger;
            }

            var imageBlob = URL.createObjectURL(thumbnail);

            var fileElement = document.createElement("div");
            var imgElement = document.createElement("img");
            var nameElement = document.createElement("span");
            imgElement.src = imageBlob;
            imgElement.className = "list-thumbnail";
            nameElement.innerHTML = file.name;

            fileElement.appendChild(imgElement);
            fileElement.appendChild(nameElement);
            output.appendChild(fileElement);

            // Release the blob resources.
            URL.revokeObjectURL(imageBlob);
        });
    }

    function displayError(error) {
        output.innerText = error;
    }
})();
