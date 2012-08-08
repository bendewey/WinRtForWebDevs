(function () {
    "use strict";

    var rotationAngle = 0;
    var accelerometer;
    var isStarted;

    WinJS.UI.Pages.define("/slides/Slide17/accelerometer.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            document.getElementById("startAccelerometer").addEventListener("click", startClicked, false);

        }
    });

    function startClicked(e) {
        if (isStarted) {
            // Stop
            isStarted = false;
            document.getElementById("startAccelerometer").innerText = "Start";
            removeAccelerometerListener();
        }
        else {
            // Start
            isStarted = true;
            document.getElementById("startAccelerometer").innerText = "Stop";
            addAccelerometerListener();
        }
    }
   
    function getAccelerometer() {
        if (!accelerometer) {
            try {
                accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
                if (!accelerometer) {
                    WinJS.log("failed to get accelerometer");
                }
            } catch (e) {
                WinJS.log && WinJS.log(e);
            }
        }

    }

    function addAccelerometerListener() {
        // Register for Accelerometer change event
        try {
            getAccelerometer();
            if (!accelerometer) {
                startSimulation();
                return;
            }

            accelerometer.addEventListener("readingchanged", calculateDeviceRotationScenario);
        } catch (e) {
            WinJS.log && WinJS.log(e);
        }
    }

    function removeAccelerometerListener() {
        // Un-Register for Accelerometer change event
        try {
            rotationAngle = 0;
            updateArrowForRotation();

            getAccelerometer();
            if (!accelerometer) {
                return;
            }

            accelerometer.removeEventListener("readingchanged", calculateDeviceRotationScenario);
        } catch (e) {
            WinJS.log && WinJS.log(e);
        }
    }

    function startSimulation() {
        [10, 20, 30, 40, 30, 20, 10, 0, -10, -20, -30, -40]
            .forEach(function (rotation, index) {
                setTimeout(function () {
                    rotationAngle = rotation;
                    updateArrowForRotation();
                }, index * 100);
            });
    }

    function calculateDeviceRotationScenario(eventArgs) {
        try {
            if (settings.isDebugging) {
                debugger;
            }

            var angle = 0;
            var currentAccelerationY = eventArgs.reading.accelerationY;
            var currentAccelerationX = eventArgs.reading.accelerationX;

            if (currentAccelerationX === 0) {
                if (currentAccelerationY <= 0) {
                    angle = 0;
                } else {
                    angle = 180;
                }
            } else if (currentAccelerationY === 0) {
                if (currentAccelerationX > 0) {
                    angle = 90;
                } else {
                    angle = 270;
                }
            } else {
                var div = (Math.abs(currentAccelerationX)) / (Math.abs(currentAccelerationY));
                angle = Math.atan(div);
                // convert from radians to degrees
                angle = angle * 57.295;

                // now adjust for quadrant based on x,y co-ordinates
                // y is -ve up and x is +ve to the right
                if ((currentAccelerationX > 0) && (currentAccelerationY < 0)) {
                    // quad 1
                    // do nothing.. angle is correct

                } else if ((currentAccelerationX > 0) && (currentAccelerationY > 0)) {
                        // quad 2
                    angle = 180 - angle;
                } else if ((currentAccelerationX < 0) && (currentAccelerationY > 0)) {
                        // quad 3
                    angle = 180 + angle;
                } else if ((currentAccelerationX < 0) && (currentAccelerationY < 0)) {
                        // quad 4
                    angle = 360 - angle;
                }
            }

            rotationAngle = angle;
            updateArrowForRotation();
        } catch (e) {
            WinJS.log && WinJS.log(e);
        }
    }
    
    function updateArrowForRotation() {
        // Obtain current rotation taking into account a Landscape first or a Portrait first device
        var screenRotation = 0;

        // Native orientation can only be Landscape or Portrait
        if (Windows.Graphics.Display.DisplayProperties.nativeOrientation === Windows.Graphics.Display.DisplayOrientations.landscape) {
            switch (Windows.Graphics.Display.DisplayProperties.currentOrientation) {
                case Windows.Graphics.Display.DisplayOrientations.landscape:
                    screenRotation = 0;
                    break;
                case Windows.Graphics.Display.DisplayOrientations.portrait:
                    screenRotation = 90;
                    break;
                case Windows.Graphics.Display.DisplayOrientations.landscapeFlipped:
                    screenRotation = 180;
                    break;
                case Windows.Graphics.Display.DisplayOrientations.portraitFlipped:
                    screenRotation = 270;
                    break;
                default:
                    screenRotation = 0;
                    break;
            }
        } else {
            switch (Windows.Graphics.Display.DisplayProperties.currentOrientation) {
                case Windows.Graphics.Display.DisplayOrientations.landscape:
                    screenRotation = 270;
                    break;
                case Windows.Graphics.Display.DisplayOrientations.portrait:
                    screenRotation = 0;
                    break;
                case Windows.Graphics.Display.DisplayOrientations.landscapeFlipped:
                    screenRotation = 90;
                    break;
                case Windows.Graphics.Display.DisplayOrientations.portraitFlipped:
                    screenRotation = 180;
                    break;
                default:
                    screenRotation = 270;
                    break;
            }
        }

        var steeringAngle = rotationAngle - screenRotation;

        // Keep the steering angle positive             
        if (steeringAngle < 0) {
            steeringAngle = 360 + steeringAngle;
        }

        // Update the UI based on steering action
        var wheel;
        wheel = document.getElementById("wheelImage");
        wheel.style.transform = "rotate(-" + steeringAngle + "deg)";
        rotationAngle = steeringAngle;
    }
})();
