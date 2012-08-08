(function () {
    "use strict";
    var output;

    WinJS.UI.Pages.define("/slides/Slide24/contactPicker.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            output = document.getElementById("contact-output");

            document.getElementById("pickContacts").addEventListener("click", pickContactsClicked, false);

        }
    });

    function pickContactsClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        // Create the picker
        var picker = new Windows.ApplicationModel.Contacts.ContactPicker();
        picker.commitButtonText = "Select";

        // Open the picker for the user to select a contact
        picker.pickSingleContactAsync().done(function (contact) {
            if (contact !== null) {
                // Create UI to display the contact information for the selected contact
                var contactElement = document.createElement("div");
                contactElement.className = "contact";

                // Display the thumbnail
                //var thumbnail = document.createElement("img");
                //thumbnail.className = "thumbnail";
                //contactElement.appendChild(thumbnail);
                //contact.getThumbnailAsync().done(function (file) {

                //    if (file) {

                //        var photoBlobUrl = URL.createObjectURL(file);
                //        thumbnail.src = photoBlobUrl;

                //    } else {
                //        WinJS.log && WinJS.log("No photo captured.", "sample", "status");
                //    }
                //}, function (err) {
                //    WinJS.log && WinJS.log(err, "sample", "error");
                //});

                // Display the name
                contactElement.appendChild(createTextElement("h3", contact.name));

                // Add the different types of contact data
                appendFields("Emails:", contact.emails, contactElement);
                appendFields("Phone Numbers:", contact.phoneNumbers, contactElement);
                appendFields("Addresses:", contact.locations, contactElement);

                // Add the contact element to the page
                output.innerHTML = "";
                output.appendChild(contactElement);
            } else {
                // The picker was dismissed without selecting a contact
                output.innerHTML = "No contact was selected";
            }
        });
    }


    function appendFields(title, fields, container) {
        // Creates UI for a list of contact fields of the same type, e.g. emails or phones
        fields.forEach(function (field) {
            if (field.value) {
                // Append the title once we have a non-empty contact field
                if (title) {
                    container.appendChild(createTextElement("h4", title));
                    title = "";
                }

                // Display the category next to the field value
                switch (field.category) {
                    case Windows.ApplicationModel.Contacts.ContactFieldCategory.home:
                        container.appendChild(createTextElement("div", field.value + " (home)"));
                        break;
                    case Windows.ApplicationModel.Contacts.ContactFieldCategory.work:
                        container.appendChild(createTextElement("div", field.value + " (work)"));
                        break;
                    case Windows.ApplicationModel.Contacts.ContactFieldCategory.mobile:
                        container.appendChild(createTextElement("div", field.value + " (mobile)"));
                        break;
                    case Windows.ApplicationModel.Contacts.ContactFieldCategory.other:
                        container.appendChild(createTextElement("div", field.value + " (other)"));
                        break;
                    case Windows.ApplicationModel.Contacts.ContactFieldCategory.none:
                    default:
                        container.appendChild(createTextElement("div", field.value));
                        break;
                }
            }
        });
    }

    function createTextElement(tag, text) {
        var element = document.createElement(tag);
        element.className = "singleLineText";
        element.innerText = text;
        return element;
    }

})();
