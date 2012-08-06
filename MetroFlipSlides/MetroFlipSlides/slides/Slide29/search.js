(function () {
    "use strict";

    var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();
    var packageLocation = Windows.ApplicationModel.Package.current.installedLocation;
    var sailingResults = ["slides\\Slide29\\sailing1.jpg", "slides\\Slide29\\sailing2.jpg", "slides\\Slide29\\sailing3.jpg", "slides\\Slide29\\sailing4.jpg"];

    WinJS.UI.Pages.define("/slides/Slide29/search.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            searchPane.addEventListener("querysubmitted", querySubmitted);

            document.getElementById("search").addEventListener("click", searchClicked, false);
        }
    });

    function searchClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        searchPane.show();
    }

    function querySubmitted(e) {
        if (settings.isDebugging) {
            debugger;
        }

        if (e.queryText.toUpperCase() == "SAILING") {
        
            clearResults();
            for (var s in sailingResults) {
                appendResult(sailingResults[s]);
            }
        }
        else {
            displayError("This demo only supports searching for 'Sailing'.  It's just a demo after all.");
        }
    }

    function appendResult(filename) {
        var fileElement = document.createElement("div");
        var imgElement = document.createElement("img");
        var nameElement = document.createElement("span");
        imgElement.className = "list-thumbnail";

        fileElement.appendChild(imgElement);
        fileElement.appendChild(nameElement);
        document.getElementById("output").appendChild(fileElement);

        return packageLocation.getFileAsync(filename).then(function (file) {

            if (settings.isDebugging) {
                debugger;
            }

            nameElement.innerHTML = file.name;

            return file.getThumbnailAsync(Windows.Storage.FileProperties.ThumbnailMode.listView).then(function (thumbnail) {
                var imageBlob = URL.createObjectURL(thumbnail);
                imgElement.src = imageBlob;
                URL.revokeObjectURL(imageBlob);
            });
               
        }, function (err) {
            displayError(err);
        });
    }

    function displayError(error) {
        document.getElementById("output").innerText = error;
    }

    function clearResults() {
        document.getElementById("output").innerText = "";
    }
})();
