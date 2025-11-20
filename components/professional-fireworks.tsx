"use client"

import { useEffect, useRef } from "react"

interface ProfessionalFireworksProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfessionalFireworks({ isOpen, onClose }: ProfessionalFireworksProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    // Load external libraries and fireworks script
    const loadFireworks = async () => {
      // Create container for the full fireworks app
      const container = containerRef.current
      if (!container) return

      // Clear previous content
      container.innerHTML = ""

      // Create SVG spritesheet
      const svgSprite = document.createElement("div")
      svgSprite.style.height = "0"
      svgSprite.style.width = "0"
      svgSprite.style.position = "absolute"
      svgSprite.style.visibility = "hidden"
      svgSprite.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-play" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="white"/>
          </symbol>
          <symbol id="icon-pause" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white"/>
          </symbol>
          <symbol id="icon-close" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/>
          </symbol>
          <symbol id="icon-settings" viewBox="0 0 24 24">
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="white"/>
          </symbol>
          <symbol id="icon-sound-on" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="white"/>
          </symbol>
          <symbol id="icon-sound-off" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="white"/>
          </symbol>
        </svg>
      `
      container.appendChild(svgSprite)

      const appDiv = document.createElement("div")
      appDiv.className = "container"
      appDiv.style.height = "100%"
      appDiv.style.display = "flex"
      appDiv.style.justifyContent = "center"
      appDiv.style.alignItems = "center"

      // Loading indicator
      const loading = document.createElement("div")
      loading.className = "loading-init"
      loading.innerHTML = `
        <div class="loading-init__header">Loading</div>
        <div class="loading-init__status">Assembling Shells</div>
      `
      appDiv.appendChild(loading)

      // Stage container
      const stageContainer = document.createElement("div")
      stageContainer.className = "stage-container remove"
      stageContainer.style.height = "100%"
      stageContainer.style.width = "100%"

      // Canvas container
      const canvasContainer = document.createElement("div")
      canvasContainer.className = "canvas-container"
      canvasContainer.style.position = "relative"
      canvasContainer.style.width = "100%"
      canvasContainer.style.height = "100%"

      const trailsCanvas = document.createElement("canvas")
      trailsCanvas.id = "trails-canvas"
      trailsCanvas.style.position = "absolute"

      const mainCanvas = document.createElement("canvas")
      mainCanvas.id = "main-canvas"
      mainCanvas.style.position = "absolute"

      canvasContainer.appendChild(trailsCanvas)
      canvasContainer.appendChild(mainCanvas)
      stageContainer.appendChild(canvasContainer)

      // Controls
      const controls = document.createElement("div")
      controls.className = "controls"
      controls.innerHTML = `
        <div class="btn pause-btn" style="position: absolute; top: 0; left: 0; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0.16; transition: opacity 0.3s;">
          <svg fill="white" width="24" height="24"><use href="#icon-pause" xlinkHref="#icon-pause"></use></svg>
        </div>
        <div class="btn sound-btn" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0.16; transition: opacity 0.3s;">
          <svg fill="white" width="24" height="24"><use href="#icon-sound-off" xlinkHref="#icon-sound-off"></use></svg>
        </div>
        <div class="btn settings-btn" style="position: absolute; top: 0; right: 0; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0.16; transition: opacity 0.3s;">
          <svg fill="white" width="24" height="24"><use href="#icon-settings" xlinkHref="#icon-settings"></use></svg>
        </div>
      `
      stageContainer.appendChild(controls)

      // Close button overlay
      const closeBtn = document.createElement("button")
      closeBtn.innerHTML = "Đóng"
      closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 100;
        background: rgba(255, 100, 100, 0.8);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background 0.3s;
      `
      closeBtn.onmouseover = () => (closeBtn.style.background = "rgba(200, 50, 50, 0.9)")
      closeBtn.onmouseout = () => (closeBtn.style.background = "rgba(255, 100, 100, 0.8)")
      closeBtn.onclick = onClose
      stageContainer.appendChild(closeBtn)

      // Help modal and menu (minimal)
      const helpModal = document.createElement("div")
      helpModal.className = "help-modal"
      helpModal.style.display = "none"
      stageContainer.appendChild(helpModal)

      const menu = document.createElement("div")
      menu.className = "menu hide"
      menu.style.display = "none"
      stageContainer.appendChild(menu)

      appDiv.appendChild(stageContainer)
      container.appendChild(appDiv)

      // Add styles
      const style = document.createElement("style")
      style.textContent = `
        * {
          position: relative;
          box-sizing: border-box;
        }
        html, body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        body {
          overflow: hidden;
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Russo One', arial, sans-serif;
          line-height: 1.25;
          letter-spacing: 0.06em;
          background-color: #000;
        }
        .container {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loading-init {
          width: 100%;
          align-self: center;
          text-align: center;
          text-transform: uppercase;
        }
        .loading-init__header {
          font-size: 2.2em;
        }
        .loading-init__status {
          margin-top: 1em;
          font-size: 0.8em;
          opacity: 0.75;
        }
        .stage-container {
          overflow: hidden;
          box-sizing: initial;
          border: 1px solid #222;
          margin: -1px;
          width: 100%;
          height: 100%;
        }
        .canvas-container {
          width: 100%;
          height: 100%;
          transition: filter 0.3s;
        }
        .canvas-container canvas {
          position: absolute;
          mix-blend-mode: lighten;
          transform: translateZ(0);
        }
        .controls {
          position: absolute;
          top: 0;
          width: 100%;
          padding-bottom: 50px;
          display: flex;
          justify-content: space-between;
        }
        .btn {
          opacity: 0.16;
          width: 50px;
          height: 50px;
          display: flex;
          user-select: none;
          cursor: default;
          transition: opacity 0.3s;
        }
        .btn:hover {
          opacity: 0.32;
        }
        .hide {
          opacity: 0;
          visibility: hidden;
        }
        .remove {
          display: none !important;
        }
      `
      container.appendChild(style)

      // Load the full fireworks script from public folder
      const script = document.createElement("script")
      script.src = "/fireworks-full.js"
      script.async = true
      script.onload = () => {
        console.log("[v0] Fireworks script loaded successfully")
      }
      script.onerror = () => {
        console.error("[v0] Failed to load fireworks script")
      }
      container.appendChild(script)
    }

    loadFireworks()
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  )
}
