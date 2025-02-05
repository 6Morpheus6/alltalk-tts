const path = require('path')
module.exports = {
  version: "3.3",
  title: "AllTalk-TTS v2",
  description: "[NVIDIA ONLY] AllTalk-TTS is a unified UI for E5-TTS, XTTS, Vite TTS, Piper TTS, Parler TTS and RVC, based on CoquiTTS, including a finetune mode.",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let installed = info.exists("app/conda_env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      train: info.running("train.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open TTS Engine",
            href: local.url,
          },{
            icon: "fa-solid fa-bolt",
            text: "TTS Generator (bulk)",
            href: "http://127.0.0.1:7851/static/tts_generator/tts_generator.html",
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }, {
          icon: "fa-solid fa-book",
          text: "Docs & Support",
          href: "https://github.com/erew123/alltalk_tts/wiki#-quick-start-user-guide---getting-started-101",
          popout: true
        }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else if (running.train) {
        let local = info.local("train.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Finetune UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "train.js",
          }, {
          icon: "fa-solid fa-book",
          text: "Docs & Support",
          href: "https://github.com/erew123/alltalk_tts/wiki#-quick-start-user-guide---getting-started-101",
          popout: true
        }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "train.js",
          }]
        }
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Resetting",
          href: "reset.js",
        }]
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-dumbbell",
          text: "Train",
          href: "train.js",
        }, {
          icon: "fa-solid fa-book",
          text: "Docs & Support",
          href: "https://github.com/erew123/alltalk_tts/wiki#-quick-start-user-guide---getting-started-101",
          popout: true
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
