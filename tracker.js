//On reload and page quite on chrome web worker is lost
let w;

//Creates/override tracker
function createTracker(time, title, body) {
  Notification.requestPermission();
    time = time * 60;
  let tracker = JSON.parse(localStorage.getItem("tracker"));
  //check if tracker exists
  if (tracker) {
    //override
    //stop running worker(here worker will only be w as page reload or quit makes worker non-permissable)
    localStorage.clear();
    //if tracker is in local storage but no permissable worker exists as page was reloaded
    //so just clear tracker from storage
    if (w) w.terminate();
  }
  // create tracker
  tracker = { remainingTime: time, title, body };
  // store it
  localStorage.setItem("tracker", JSON.stringify(tracker));
  // and start using a worker
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
