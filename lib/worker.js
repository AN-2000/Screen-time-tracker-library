//2
//s is elapsed seconds from the tracker started in the worker
let s = 0;
this.onmessage = function (e) {
  //if worker recieve message which contains time,title and body start the timer using set interval

  if (e.data.title && e.data.body && e.data.time) {
    //totalS is total tracker time that is in current tracker object
    let totalS = e.data.time;
    //make interval of 1 seconds and at each interval 
    let interval = setInterval(function () {
      //after 1 second increment s
      s++;
      //send message back to main thread to update local storage tracker
      postMessage(s + " " + totalS)
      //check if required time is passed
      if (s == totalS) {
        //if yes clear inteval
        clearInterval(interval);
        //show notification
        new Notification(e.data.title, { body: e.data.body });
        //send clear message to delete tracker from localstorage
          postMessage("clear")
      }
    }, 1000);
  }
};
