let s = 0;
this.onmessage = function (e) {
  if (e.data.title && e.data.body && e.data.time) {
    let totalS = e.data.time ;
    let interval = setInterval(function () {
        s++;
        postMessage(s+" "+totalS)
      if (s == totalS) {
        clearInterval(interval);
          new Notification(e.data.title, { body: e.data.body });
          postMessage("clear")
      }
    }, 1000);
  }
};
