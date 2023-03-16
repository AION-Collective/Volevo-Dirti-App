// This array stores the recorded media data
let chunks = [];

const audioMediaConstraints = {
  audio: true
};

// When the user clicks the "Start
// Recording" button this function
// gets invoked
function startRecording() {
  // Access the camera and microphone
  navigator.mediaDevices
    .getUserMedia(
      audioMediaConstraints
    )
    .then((mediaStream) => {
      // Create a new MediaRecorder instance
      const mediaRecorder = new MediaRecorder(mediaStream);

      //Make the mediaStream global
      window.mediaStream = mediaStream;
      //Make the mediaRecorder global
      window.mediaRecorder = mediaRecorder;

      mediaRecorder.start();

      // Whenever (here when the recorder
      // stops recording) data is available
      // the MediaRecorder emits a "dataavailable"
      // event with the recorded media data.
      mediaRecorder.ondataavailable = (e) => {
        // Push the recorded media data to
        // the chunks array
        chunks.push(e.data);
      };

      // When the MediaRecorder stops
      // recording, it emits "stop"
      // event
      mediaRecorder.onstop = () => {
        /* A Blob is a File like object.
      In fact, the File interface is
      based on Blob. File inherits the
      Blob interface and expands it to
      support the files on the user's
      systemThe Blob constructor takes
      the chunk of media data as the
      first parameter and constructs
      a Blob of the type given as the
      second parameter*/
        const blob = new Blob(chunks, {
          type: "audio/mpeg"
        });
        chunks = [];

        // Create a video or audio element
        // that stores the recorded media
        const recordedMedia = document.createElement(
          "audio"
        );
        recordedMedia.controls = true;

        // You can not directly set the blob as
        // the source of the video or audio element
        // Instead, you need to create a URL for blob
        // using URL.createObjectURL() method.
        const recordedMediaURL = URL.createObjectURL(blob);

        // Now you can use the created URL as the
        // source of the video or audio element
        recordedMedia.src = recordedMediaURL;

        // Create a download button that lets the
        // user download the recorded media
        const downloadButton = document.createElement("a");

        // Set the download attribute to true so that
        // when the user clicks the link the recorded
        // media is automatically gets downloaded.
        downloadButton.download = "Recorded-Media";

        downloadButton.href = recordedMediaURL;
        downloadButton.innerText = "Download";

        downloadButton.onclick = () => {
          /* After download revoke the created URL
        using URL.revokeObjectURL() method to
        avoid possible memory leak. Though,
        the browser automatically revokes the
        created URL when the document is unloaded,
        but still it is good to revoke the created
        URLs */
          URL.revokeObjectURL(recordedMedia);
        };

        document
          .getElementById("aud-recorder")
          .append(recordedMedia, downloadButton);
      };

      document.getElementById("start-aud-recording").disabled = true;
      document.getElementById("start-aud-recording").hidden = true;
      document.getElementById("stop-aud-recording").disabled = false;
      document.getElementById("stop-aud-recording").hidden = false;
    });
}
document.getElementById(stopRecording);
function stopRecording() {
  // Stop the recording
  window.mediaRecorder.stop();

  // Stop all the tracks in the
  // received media stream
  window.mediaStream.getTracks().forEach((track) => {
    track.stop();
  });

  document.getElementById('stop-aud-recording').disabled = true;
  document.getElementById('stop-aud-recording').hidden = true;
  document.getElementById('start-aud-recording').disabled = false;
  document.getElementById("start-aud-recording").hidden = false;
}