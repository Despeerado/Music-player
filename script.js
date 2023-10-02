import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'

// import TimelinePlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js'


const wavesurfer = WaveSurfer.create(
	{
		/** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
		autoCenter: true,
		/** Play the audio on load */
		autoplay: false,
		/** Automatically scroll the container to keep the current position in viewport */
		autoScroll: true,
		/** HTML element or CSS selector (required) */
		container: '#waveform',
		/** Audio rate */
		audioRate: 1,
		/** The height of the waveform in pixels */
		barWidth: 2,
		/** Spacing between bars in pixels */
		barGap: 1,
		/** Rounded borders for bars */
		barRadius: 2,
		/** A vertical scaling factor for the waveform */
		barHeight: NaN,
		/** Vertical bar alignment **/
		barAlign: '',
		/** Minimum pixels per second of audio (i.e. zoom level) */
		cursorColor: '#ddd5e9',
		/** The cursor width */
		cursorWidth: 1,
		/** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
		dragToSeek: false,
		duration: 0,
		height: 128,
		/** Render each audio channel as a separate waveform */
		fillParent: true,
		/** Audio URL */
		/** Hide the scrollbar */
		hideScrollbar: false,
		interaction: true,
		/** Allow to drag the cursor to seek to a new position */
		splitChannels: false,
		/** Stretch the waveform to the full height */
		minPxPerSec: 1,
		/** Stretch the waveform to fill the container, true by default */
		normalize: false,
		/** The color of the waveform */
		mediaControls: true,
		/** Pass false to disable clicks on the waveform */
		progressColor: '#d580ff',
		/** The color of the playpack cursor */
		url: '/sitar.wav',
		/** Whether to show default audio element controls */
		waveColor: ' #99ddff',
		/** The color of the progress mask */

	}

)
// zoom option

// wavesurfer.once('decode', () => {
// 	const slider = document.querySelector('input[type="range"]')

// 	slider.addEventListener('input', (e) => {
// 		const minPxPerSec = e.target.valueAsNumber
// 		wavesurfer.zoom(minPxPerSec)
// 		console.log(minPxPerSec)
// 	})
// })
// range options - show zoom number

const formatTimecode = seconds => {
	const minutes = Math.floor(seconds / 60);
	// const remainingSeconds = Math.floor(seconds % 60);
	const remainingSeconds = Math.round(seconds % 60);
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const spanTime = document.querySelector('#cursor-time')

wavesurfer.on('timeupdate', () => {
	const currentTime = wavesurfer.getCurrentTime();
	spanTime.innerHTML = formatTimecode(currentTime)
	console.log(currentTime);
});



wavesurfer.on('ready', () => {

	// zoom buttons
	const zoomInButton = document.querySelector('#zoom-in');
	const zoomOutButton = document.querySelector('#zoom-out');
	// text in zoom-level span
	const zoomLevelElement = document.querySelector('#zoom-level');

	let zoomLevel = 100;
	const updateZoomLevelDisplay = () => {
		// zoomLevelElement.textContent = `${zoomLevel}x`;
		zoomLevelElement.textContent = zoomLevel < 10 ? zoomLevel : (zoomLevel / 100);
	}

	zoomInButton.addEventListener('click', () => {
		zoomLevel = Math.min(zoomLevel + 100, 500) || 500;
		wavesurfer.zoom(zoomLevel);
		updateZoomLevelDisplay();
		console.log(zoomLevel);
		console.log(`zoom in ${zoomLevel}`);
	})

	zoomOutButton.addEventListener('click', () => {
		zoomLevel = Math.max(zoomLevel - 100, 100);
		wavesurfer.zoom(zoomLevel);
		updateZoomLevelDisplay();
		console.log(zoomLevel);
		console.log(`zoom out ${zoomLevel}`);
	})

	updateZoomLevelDisplay();

})

