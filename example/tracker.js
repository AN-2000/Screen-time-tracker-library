let w;

function createTracker(time, title, body) {
  Notification.requestPermission();
    time = time * 60;
  let tracker = JSON.parse(localStorage.getItem("tracker"));
  if (tracker) {
    localStorage.clear();
    if (w) w.terminate();
  }
  tracker = { remainingTime: time, title, body };
  localStorage.setItem("tracker", JSON.stringify(tracker));
  w = new Worker("worker.js");
  w.postMessage({ time, title, body });
  w.onmessage = updateTracker;
}

function updateTracker(e) {
  console.log(e.data);
  let tracker = JSON.parse(localStorage.getItem("tracker"));
  tracker.remainingTime = tracker.remainingTime - 1 ;
  localStorage.setItem("tracker", JSON.stringify(tracker));
  e.data === "clear" ? localStorage.clear() : null;
}

function checkAndStart() {
  let tracker = JSON.parse(localStorage.getItem("tracker"));
  if (!tracker) return;
    w = new Worker("worker.js");
    console.log("Tracker remaining time:",tracker.remainingTime);
  w.postMessage({
    time: tracker.remainingTime,
    title: tracker.title,
    body: tracker.body,
  });
  w.onmessage = updateTracker;
}
