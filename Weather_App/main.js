window.addEventListener('load', () => {

    let long;
    let lat;
    let tempDesc = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    const degreeSection = document.querySelector('.degree-section');
    const degreeSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e5147d575d0378c7d509b52b3b894feb/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;

                    // set DOM elements from the API
                    tempDegree.textContent = temperature;
                    tempDesc.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // formula for celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    // set icon
                    setIcons(icon, document.querySelector('.icon'));
                    // change temperature on click
                    degreeSection.addEventListener('click', () => {
                        if (degreeSpan.textContent === "F") {
                            degreeSpan.textContent = "C";
                            tempDegree.textContent = Math.floor(celsius);
                        } else {
                            degreeSpan.textContent = "F";
                            tempDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});