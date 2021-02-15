import React from "react";
import Head from "next/head";
import QrScanner from "qr-scanner";
import styles from "../styles/Home.module.css";
import QRCode from "react-qr-code";

const constraints = {
  video: { width: 320, height: 320 },
};

export default function Home() {
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [haveCode, setHaveCode] = React.useState(null);

  React.useEffect(() => {
    if (permissionGranted) {
      const player = document.getElementById("player");
      // const canvas = document.getElementById("canvas");
      // const context = canvas.getContext("2d");
      // const captureButton = document.getElementById("capture");

      // captureButton.addEventListener("click", () => {
      //   // Draw the video frame to the canvas.
      //   context.drawImage(player, 0, 0, canvas.width, canvas.height);
      // });

      const qrScanner = new QrScanner(player, (result) => setHaveCode(result));

      qrScanner.start();

      // Attach the video stream to the video element and autoplay.
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        player.srcObject = stream;
        player.onloadedmetadata = function (e) {
          player.play();
        };
      });
    }
  }, [permissionGranted]);

  function handleScanRequest(e) {
    setPermissionGranted(
      Boolean(navigator.mediaDevices.getUserMedia(constraints))
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {permissionGranted && !haveCode ? (
          <div
            style={{
              minWidth: constraints.video.width,
              minHeight: constraints.video.height,
            }}
            className={styles.videoFeed}
          >
            <video id='player' />
          </div>
        ) : (
          <div>
            <div>{haveCode}</div>
            <button onClick={handleScanRequest} type='submit'>
              Scann Code
            </button>
          </div>
        )}
        <div>
          <QRCode value='hey' />
        </div>
      </main>
    </div>
  );
}
