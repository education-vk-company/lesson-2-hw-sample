export default ((self) => {
	const ports = [];
	self.addEventListener('connect', (event) => {
		const port = event.source;
		ports.push(port);
		port.addEventListener('message', (event) => {
			if (event.data === 'disconnect') {
				ports.splice(ports.indexOf(event.target), 1);
			} else {
				ports.filter(port => port !== event.target).forEach((port) => {
					port.postMessage(event.data);
				});
			}
		});
		port.start();
	});
});