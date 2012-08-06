<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Slide28.aspx.cs" Inherits="WinRtComparisonSite.Slide28" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Internet Browser Search</title>
    <link href="default.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div style="position:absolute; top: 100px; left: 636px;">
        <input id="searchText" type="text" style="width:220px;" /> <input type="button" id="searchButton" value="Go" />
    </div>
    <div id="output" class="bulleted-content">
    </div>
    <img src="images/Slide28.png" alt="" style="width:100%; height:100%;" />
    </form>

    <script>
        var sailingResults = ["sailing1.jpg", "sailing2.jpg", "sailing3.jpg", "sailing4.jpg"];
        var searchButton = document.getElementById("searchButton");
        searchButton.addEventListener("click", function (e) {

            var queryText = document.getElementById("searchText").value;
            if (queryText.toUpperCase() == "SAILING") {

                clearResults();
                for (var s in sailingResults) {
                    appendResult(sailingResults[s]);
                }
            }
            else {
                displayError("This demo only supports searching for 'Sailing'.  It's just a demo after all.");
            }
                
        });

        function appendResult(filename) {
            var fileElement = document.createElement("div");
            var imgElement = document.createElement("img");
            var nameElement = document.createElement("span");
            imgElement.className = "list-thumbnail";

            fileElement.appendChild(imgElement);
            fileElement.appendChild(nameElement);
            document.getElementById("output").appendChild(fileElement);

            nameElement.innerHTML = filename;
            imgElement.src = "images/" + filename;
        }

        function displayError(error) {
            document.getElementById("output").innerText = error;
        }

        function clearResults() {
            document.getElementById("output").innerText = "";
        }
    </script>
</body>
</html>
