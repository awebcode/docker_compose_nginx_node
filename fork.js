const { parentPort,workerData} = require("worker_threads");
function someLongRunningTask(data) {
  console.log("Worker received message:", data);
  parentPort.postMessage("Processing completed in worker!"+workerData.THREAD);
}
parentPort.on("message", (data) => {
  someLongRunningTask(data);
})
