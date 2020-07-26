const videoElem = document.getElementById("video")
const logElem = document.getElementById("log")
const startElem = document.getElementById("start")
const stopElem = document.getElementById("stop")

function gotMedia(stream) {
	var peer1 = new SimplePeer({initiator: true, stream: true})
	var peer2 = new SimplePeer()

	peer1.on("signal", (data) => {
		peer2.signal(data)
	})

	peer2.on("signal", (data) => {
		peer1.signal(data)
	})

	peer2.on("stream", (stream) => {
		if ("srcObject" in video) {
			video.srcObject = stream
		} else {
			video.src = window.URL.createObjectURL(stream)
		}
	})
}


// Options for getDisplayMedia()
const displayMediaOptions = {
	video: true,
	audio: false
}

async function startCapture() {
	await navigator.mediaDevices.getUserMedia(displayMediaOptions)
		.then(gotMedia)
		.catch((err) => {
			console.error(`Error: ${err}`)
		})
}

function stopCapture() {}

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