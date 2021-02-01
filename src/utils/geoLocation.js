export function getGeoLocation() {
    const getLocation = () => new Promise(
        (resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    const location = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    };
                    resolve(location);
                },
                err => reject(err)
            );
        }
    );
    return getLocation();
}
