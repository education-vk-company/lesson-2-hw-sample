export default function getPosition (options) {
	return new Promise((res, rej) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(res, rej, options);
		} else {
			rej('Geolocation API not supported');
		}
	})
}