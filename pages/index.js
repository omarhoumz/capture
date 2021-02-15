import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  // const enumeratorPromise =
  //   typeof window !== "undefined" && navigator.mediaDevices.enumerateDevices();

  // enumeratorPromise.then((res) => {
  //   console.log(res);
  // });

  if (typeof window !== "undefined") {
    const player = document.getElementById("player");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const captureButton = document.getElementById("capture");

    const constraints = {
      video: true,
    };

    captureButton.addEventListener("click", () => {
      // Draw the video frame to the canvas.
      context.drawImage(player, 0, 0, canvas.width, canvas.height);
    });

    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      player.srcObject = stream;
      player.onloadedmetadata = function (e) {
        player.play();
      };
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <video id='player' />
        <button id='capture'>Capture</button>
        <div style={{ flexGrow: 1 }}>
          <canvas id='canvas' width='320' height='240'></canvas>
        </div>
      </main>
    </div>
  );
}
