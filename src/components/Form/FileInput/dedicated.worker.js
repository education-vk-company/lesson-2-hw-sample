self.addEventListener('message', (event) => {
	const data = event.data;
	const pixels = data.pixels;
	for ( let i = 0; i < pixels.data.length; i += 4 ) {
		let average = (
			pixels.data[i] +
			pixels.data[i + 1] +
			pixels.data[i + 2]
		) / 3;

		pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = average;
	}
	self.postMessage({pixels, file: data.file});
});