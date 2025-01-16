module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone -b alltalkbeta https://github.com/erew123/alltalk_tts app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
      conda: {
        path: "conda_env",
        python: "python=3.11.9"
        },
        path: "app",
        message: [
          "conda install -y -c conda-forge git",
          "conda install -y conda-forge::ffmpeg=*=*gpl*",
          "conda install -y -c conda-forge 'ffmpeg=*=h*_*' --no-deps"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          conda: "conda_env",
          path: "app",
        }
      }
    },
    {
      method: "shell.run",
      params: {
        conda: "conda_env",
        path: "app",
        message: [
          "uv pip install faiss-cpu",
          "uv pip install -r ./system/requirements/requirements_standalone.txt",
          "uv pip install -U gradio==4.32.2",
          "uv pip install https://github.com/erew123/alltalk_tts/releases/download/DeepSpeed-14.0/deepspeed-0.14.0+ce78a63-cp311-cp311-win_amd64.whl",
          "uv pip install -r ./system/requirements/requirements_parler.txt"
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
