# CineMate

<aside>
💡 A video streaming service

</aside>

- HLS (HTTP Live Streaming)
  HTTP live streaming (HLS) is one of the most widely used video [streaming](https://www.cloudflare.com/learning/performance/what-is-streaming/) protocols. Although it is called HTTP "live" streaming, it is used for both on-demand streaming and [live streaming](https://www.cloudflare.com/learning/video/what-is-live-streaming/). HLS breaks down video files into smaller downloadable HTTP files and delivers them using the [HTTP](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) protocol. [Client](https://www.cloudflare.com/learning/serverless/glossary/client-side-vs-server-side/) devices load these HTTP files and then play them back as video.
  - One advantage of HLS is that all Internet-connected devices support HTTP, making it simpler to implement than streaming protocols that require the use of specialized servers.
  - Another advantage is that an HLS stream can increase or decrease video quality depending on network conditions without interrupting playback.
  - This feature is known as "adaptive bitrate video delivery" or "[adaptive bitrate streaming](https://www.cloudflare.com/learning/video/what-is-adaptive-bitrate-streaming/)," and without it, slow network conditions can stop a video from playing altogether.
- How HLS works?
- What is adaptive bitrate video delivery?
  - HLS stream can increase or decrease video quality depending on network conditions without interrupting playback.
  - This feature is known as "adaptive bitrate video delivery" or "[adaptive bitrate streaming](https://www.cloudflare.com/learning/video/what-is-adaptive-bitrate-streaming/)," and without it, slow network conditions can stop a video from playing altogether.
- Media manifest file and .ts files and Master Media Manifest
  ```jsx
  const bitrates = ["100k", "2400k"];
  bitrates.map((bitrate) => {
    ffmpeg("video.mp4")
      .outputOptions([
        "-profile:v",
        "baseline", // H.264 profile for wider device support
        "-level",
        "3.0", // H.264 level
        "-start_number",
        "0", // Segment start number
        "-hls_time",
        "10", // Segment duration
        "-hls_list_size",
        "0", // Number of segments to keep in playlist (0 means all)
        "-f",
        "hls", // Output format HLS
      ])
      .on("error", (e) => {
        console.log(e);
      })
      .output(`${bitrate}/${bitrate}-${Date.now()}.m3u8`)
      .videoBitrate(bitrate)
      .audioCodec("aac")
      .audioBitrate("128k")
      .run();
  });
  ```
  For each bitrate, a **media manifest and some ts files baseed on the the config given and duration of video.**
  The media manifest **is a .m3u8 file**
  For 28 s video , 3 .ts files are generated and a media manifest is generated.
  **Each media manifest represents a different rendition of video - a unique resolution, bitrate, and codec combination**
  These media manifests are also playlists, but instead of listing other manifests, they list URLs to short segments of video. Most often, these segments are between 2 and 10 seconds long, and packaged in the MPEG-TS format, though fragmented MP4 is supported in newer versions of the HLS spec. The reason these files are segmented (or fragmented) is so that a video player can easily switch between renditions in the middle of playback - for example, if bandwidth gets better or worse.
  ***
  ### Master Media Manifest
  This is a playlist that lists the different sizes and types available for a single video. A typical master manifest will list 3-7 individual renditions - for example, a 480p rendition, a 720p rendition, and a 1080p rendition. The master manifest is passed into an HLS video player, allowing the player to make its own decisions about what rendition gets played.
  The master manifest lists multiple **media manifests**.
  ![Untitled](CineMate%2045b4cc78ac1849e499c4fdd383a3fd53/Untitled.png)

---

### Plans

- Auth integration
  ### Firebase auth

```jsx
Database fields

id
email
name
description
profile picture
```

- User will log with google oauth in firebase auth
- After successful login , a payload will be send to the backend
  ```jsx
  headers = {authtoken} # auth token returned after authentication
  profPic,email = firebase auth response
  body ={email
  name
  about
  profile picture}
  ```
- Backend will check the token and add all the details to the database

- File uploads
  - Client will post metadata of the video to the backend and in return it will give the signed url. The signed url will contain the video name. The client will upload to that signed url.
  ```jsx
  name;
  about;
  tags;
  ```
  - When the video is uploaded to the storage, cloud functions will run and optimise the video to do HLL streaming. The name of master manifest file will be the master-manifest-id
  - The thumbnail will be thumb-id
  - To get status of the video completion we will use firestore as a logger. It will update the completion in real time.
- Watch
  - The master manifest file will be sent with the addition of public url of stroage.
  - By default the all the latest videos will come
  - Filter by category will also come
  - And on top with a large banner the trending video with most likes will come
- Like
  - A **\*\*\*\***Like Model will be present to store the users who liked the video.\*\*
  - When user will request for the video url , the backend will also send a meta data containing whether has liked the video or not.
  - The like count will be maintained by a number with increment and decrement
- Comments
  - A tree like comment section with pointers
- Subscription System

### Resources

- [https://www.enjoyalgorithms.com/blog/design-youtube-system-design-interview-question](https://www.enjoyalgorithms.com/blog/design-youtube-system-design-interview-question)
- [https://www.cloudflare.com/learning/video/what-is-http-live-streaming/#:~:text=One advantage of HLS is,network conditions without interrupting playback](https://www.cloudflare.com/learning/video/what-is-http-live-streaming/#:~:text=One%20advantage%20of%20HLS%20is,network%20conditions%20without%20interrupting%20playback).
- [https://docs.aws.amazon.com/mediatailor/latest/ug/manifest-hls-example.html](https://docs.aws.amazon.com/mediatailor/latest/ug/manifest-hls-example.html)
- [https://developer.apple.com/documentation/http_live_streaming/example_playlists_for_http_live_streaming/creating_a_master_playlist](https://developer.apple.com/documentation/http_live_streaming/example_playlists_for_http_live_streaming/creating_a_master_playlist)
- [https://github.com/zessu/ffmpeg-hls-generator](https://github.com/zessu/ffmpeg-hls-generator)
