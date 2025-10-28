require('@testing-library/jest-dom');

// Mock HTMLCanvasElement.getContext for Chart.js
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
	value: () => {
		// Return a minimal mock context object
		return {
			fillRect: () => {},
			clearRect: () => {},
			getImageData: () => ({ data: [] }),
			putImageData: () => {},
			createImageData: () => [],
			setTransform: () => {},
			drawImage: () => {},
			save: () => {},
			restore: () => {},
			beginPath: () => {},
			moveTo: () => {},
			lineTo: () => {},
			closePath: () => {},
			stroke: () => {},
			translate: () => {},
			scale: () => {},
			rotate: () => {},
			arc: () => {},
			fill: () => {},
			measureText: () => ({ width: 0 }),
			setLineDash: () => {},
			getLineDash: () => [],
			font: '',
			textAlign: '',
			textBaseline: '',
			direction: '',
		};
	},
});
