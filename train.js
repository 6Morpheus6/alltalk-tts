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
          "python finetune.py --inbrowser False",
        ],
        on: [
          {
          "event": "/http:\/\/\\S+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
