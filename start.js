module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        conda: "conda_env",
        env: { },
        path: "app",
        message: [
          "python script.py",
        ],
        on: [
          {
          "event": "/http:\\/\\/127\\.0\\.0\\.1:\\d+\\?__theme=[a-zA-Z0-9]+/",
          "done": true
        }]
      }
    },
    {
      // This step sets the local variable 'url'.
      // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        url: "{{input.event[0]}}"
      }
    }
  ]
}
