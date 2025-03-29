module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone -b alltalkbeta https://github.com/6Morpheus6/alltalk_tts app"
        ]
      }
    },
    {
      when: "{{which('apt')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "apt install libaio-dev espeak-ng"
      },
        next: "all"
    },
    {
      when: "{{which('yum')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "yum install libaio-devel espeak-ng"
      },
        next: "all"
    },
    {
      when: "{{which('brew')}}",
      method: "shell.run",
      params: {
        message: "brew install espeak-ng"
      },
        next: "all"
    },
    {
      when: "{{which('winget')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "winget install --id=eSpeak-NG.eSpeak-NG -e --silent --accept-source-agreements --accept-package-agreements"
      }
    },
    {
      id: "all",
      method: "shell.run",
      params: {
      conda: {
        path: "conda_env",
        python: "python=3.11.9"
        },
        path: "app",
        message: [
          "conda install -y -c conda-forge git-lfs",
          "conda install -y conda-forge::ffmpeg=*=*gpl*"
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        conda: "conda_env",
        path: "app",
        message: [
          "conda install -y -c conda-forge 'ffmpeg=*=h*_*' --no-deps",
          "mkdir .\\models\\xtts",
          "uv pip install https://github.com/erew123/alltalk_tts/releases/download/DeepSpeed-14.0/deepspeed-0.14.0+ce78a63-cp311-cp311-win_amd64.whl"
        ]
      },
        next: "torch"
    },
    {
      when: "{{platform === 'linux'}}",
      method: "shell.run",
      params: {
        conda: "conda_env",
        path: "app",
        message: [
          "conda install -y -c conda-forge ffmpeg",
          "conda install -y -c conda-forge cxx-compiler",
          "conda install -y -c conda-forge gcc",
          "mkdir -p ./models/xtts",
          "uv pip install deepspeed"
        ]
      },
        next: "torch"
    },
    {
      when: "{{platform === 'darwin'}}",
      method: "shell.run",
      params: {
        conda: "conda_env",
        path: "app",
        message: [
          "conda install -y -c conda-forge gcc",
          "mkdir -p ./models/xtts"
        ]
      }
    },
    {
      id: "torch",
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          conda: "conda_env",
          path: "app"
        }
      }
    },
    {
      method: "shell.run",
      params: {
        env: {
          "GIT_LFS_SKIP_SMUDGE": "1"
        },
        conda: "conda_env",
        path: "app",
        message: [
          "uv pip install faiss-cpu",
          "uv pip install -r ./system/requirements/requirements_standalone.txt",
          "uv pip install -U gradio==4.32.2 fastapi==0.112.2 pydantic==2.10.6",
          "uv pip install -r ./system/requirements/requirements_parler.txt"
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app/models/xtts",
        "_": [ "coqui/XTTS-v2" ],
        "exclude": '"*.wav" "samples" "*.md" "*.txt"',
        "local-dir": "xttsv2_2.0.3",
      }
    },
    {
      method: "notify",
      params: {
        html: "Installation finished! Click the 'start' tab to get started."
      }
    }
  ]
}
