const path = require('path')
module.exports = {
  version: "3.2",
  title: "alltalk-tts",
  description: "[Windows NVIDIA ONLY] AllTalk-TTS is a unified UI for E5-TTS, XTTS, ParlerTTS and RVC, based on CoquiTTS, including a finetune mode.",
  icon: "icon.png",
  pre: [{
    title: "espeak-ng",
    description: "Espeak-ng for multiple TTS engines to function.",
    href: "espeak-ng-x86.msi"
  }],
  menu: async (kernel, info) => {
    let installed = info.exists("app/conda_env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
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
            icon: "fa-solid fa-rocket",
            text: "Open TTS Engine",
            href: local.url,
          },{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: "http://127.0.0.1:7851/static/tts_generator/tts_generator.html",
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
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
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
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
