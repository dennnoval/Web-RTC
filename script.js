const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()
const displayMediaOptions = {
	video: {
		cursor: "always"
	},
	audio: false
};

async function startCapture() {
	if (logElem !== null)
		logElem.innerHTML = "";
	try {
		videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		dumpOptionsInfo();
	} catch (err) {
		if (videoElem != null)
			console.error(`Error: ${err}`);
	}
}

function stopCapture() {
	let tracks = videoElem.srcObject.getTracks();

	tracks.forEach(track => track.stop());
	videoElem.srcObject = null;
}

function dumpOptionsInfo() {
	const videoTrack = videoElem.srcObject.getVideoTracks()[0];

	console.info("Track settings: ");
	console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
	console.info("Track constraints: ");
	console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

if (logElem !== null) {
	console.log = msg => logElem.innerHTML += `${msg}<br>`;
	console.error = msg => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
	console.warn = msg => logElem.innerHTML += `<span class="warn">${msg}</span><br>`;
	console.info = msg => logElem.innerHTML += `<span class="info">${msg}</span><br>`;
}
