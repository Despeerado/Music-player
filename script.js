import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'

// import TimelinePlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js'


const wavesurfer = WaveSurfer.create(
	{
		/** HTML element or CSS selector (required) */
		container: '#waveform',
		/** The height of the waveform in pixels */
		height: 128,
		/** Render each audio channel as a separate waveform */
		splitChannels: false,
		/** Stretch the waveform to the full height */
		normalize: false,
		/** The color of the waveform */
		waveColor: ' #99ddff',
		/** The color of the progress mask */
		progressColor: '#d580ff',
		/** The color of the playpack cursor */
		cursorColor: '#ddd5e9',
		/** The cursor width */
		cursorWidth: 1,
		/** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
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
		minPxPerSec: 1,
		/** Stretch the waveform to fill the container, true by default */
		fillParent: true,
		/** Audio URL */
		url: '/sitar.wav',
		/** Whether to show default audio element controls */
		mediaControls: true,
		/** Play the audio on load */
		autoplay: false,
		/** Pass false to disable clicks on the waveform */
		interact: true,
		/** Allow to drag the cursor to seek to a new position */
		dragToSeek: true,
		/** Hide the scrollbar */
		hideScrollbar: false,
		/** Audio rate */
		audioRate: 1,
		/** Automatically scroll the container to keep the current position in viewport */
		autoScroll: true,
		/** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
		autoCenter: true,

	}

)
// zoom option

wavesurfer.once('decode', () => {
	const slider = document.querySelector('#value-input')

	slider.addEventListener('input', (e) => {
		const minPxPerSec = e.target.valueAsNumber
		wavesurfer.zoom(minPxPerSec)
		console.log(minPxPerSec)
	})

	const input = document.querySelector('#value-input')
	const zoomx = document.querySelector('#value-zoom')
	zoomx.textContent = input.value

	input.addEventListener('input', (e) => {
		zoomx.textContent = e.target.value
	})
})
// range options - show zoom number


const formatTimecode = seconds => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const spanTime = document.querySelector('#cursor-time')

wavesurfer.on('audioprocess', () => {
	const currentTime = wavesurfer.getCurrentTime();
	spanTime.innerHTML = formatTimecode(currentTime)
	// console.log(currentTime);
});