'use strict';
const Bounce = require('bounce.js')

class NodrizaChatBot {
  constructor () {
    this.loop = null
    this.position = 'bottom-right'
    this.showChat = false
    this.headerTextColor = 'inherit'
    this.textNode = null
    this.loopInterval = null
    this.animationName = 'skew'
    this.fatButtonId = 'nf-chatbot--button'
    this.fatButtonSize = 50
    this.fatButtonPosition = 25
    this.iframe = document.createElement('iframe')
    this.iframeContainer = document.createElement('DIV')
    this.headerContainer = document.createElement('DIV')
    this.fatButton = document.createElement('DIV')
    this.imageIcon = document.createElement('IMG')
    this.defaultIcon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeHLP0r4IMtsvmhAG4k_dD8IN4ccXSGPSy6p3Mmc5e-kOBdZRq'

    this.headerContainer.innerHTML = 'Hola'
    this.headerContainer.style.height = '40px'
    this.headerContainer.style.lineHeight = '40px'
    this.headerContainer.style.position = 'relative'
    this.headerContainer.style.padding ='0 20px'
    this.headerContainer.style.background = '#8c8787'
    this.headerContainer.style.fontWeight = 'bold'

    this.iframe.style.width = '100%'
    this.iframe.style.height = 'calc(100% - 40px)'
    this.iframe.style.border = 'none'

    this.iframeContainer.style.width = '350px'
    this.iframeContainer.style.height = '520px'
    this.iframeContainer.style.display = 'none'
    this.iframeContainer.style.position = 'absolute'
    this.iframeContainer.style.left = '-300px'
    this.iframeContainer.style.top = '-540px'
    this.iframeContainer.style.boxShadow = '5px 5px 10px 3px #e2e2e2'
    this.iframeContainer.style.border = '1px solid #e2e2e2'
    this.iframeContainer.style.background = '#ffffff'

    this.imageIcon.src = this.defaultIcon
    this.imageIcon.style.borderRadius = '50%'
    this.imageIcon.style.display = 'block'
    this.imageIcon.style.margin = 'auto'
    this.imageIcon.style.width = this.fatButtonSize + 'px'
    this.imageIcon.style.height = this.fatButtonSize + 'px'
    this.imageIcon.onclick = this.popupHandler.bind(this)

    this.fatButton.id = this.fatButtonId
    this.fatButton.style.display = 'inline-block'
    this.fatButton.style.zIndex = '1'
    this.fatButton.style.position = 'absolute'
    this.fatButton.style.cursor = 'pointer'
    this.fatButton.style.right = this.fatButtonPosition + 'px'
    this.fatButton.style.bottom = this.fatButtonPosition + 'px'
  }
  getSvgClose(color) {
    return `<svg onclick="window.NodrizaChatBot.popupHandler()" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="${color}" style="position: absolute; top: 50%; transform: translateY(-50%); right: 20px;">
    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
    <path d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"></path>
    </svg>`
  }
  setAnimationName (animationName) {
    this.animationName = animationName
  }
  setPosition (position = 'bottom-right') {
    this.position = position
    this.fatButton.style.top = 'auto'
    this.fatButton.style.left = 'auto'
    this.fatButton.style.right = 'auto'
    this.fatButton.style.bottom = 'auto'
    if (/top/i.test(position)) this.fatButton.style.top = this.fatButtonPosition + 'px'
    if (/bottom/i.test(position)) this.fatButton.style.bottom = this.fatButtonPosition + 'px'
    if (/left/i.test(position)) this.fatButton.style.left = this.fatButtonPosition + 'px'
    if (/right/i.test(position)) this.fatButton.style.right = this.fatButtonPosition + 'px'
    this.reset()
  }
  stopLoop () {
    clearInterval(this.loopInterval)
  }
  startLoop (loopInterval) {
    this.stopLoop()
    this.loop = loopInterval
    this.loopInterval = setInterval(() => this.animate(this.animationName), this.loop)
  }
  popupHandler () {
    this.showChat = !this.showChat
    if (this.showChat && window.innerWidth < 768) {
      this.iframeContainer.style.top = '0'
      this.iframeContainer.style.left = '0'
      this.iframeContainer.style.width = '100vw'
      this.iframeContainer.style.height = '100vh'
      this.iframeContainer.style.position = 'fixed'
      this.fatButton.style.top = '0'
      this.fatButton.style.left = '0'
    } else {
      this.setPosition(this.position)
      this.iframeContainer.style.width = '350px'
      this.iframeContainer.style.height = '520px'
      this.iframeContainer.style.position = 'absolute'
      this.iframeContainer.style.left = '-300px'
      this.iframeContainer.style.top = '-540px'
    }
    this.iframeContainer.style.display = this.showChat ? 'inherit' : 'none'
    if (this.showChat && this.loop) this.stopLoop()
    if (!this.showChat && this.loop) this.startLoop(this.loop)
    this.reset()
  }
  existFatButton () {
    return document.querySelector('#' +  this.fatButtonId) ? true : false
  }
  setIframe (src) {
    this.iframe.src = src
    this.reset()
  }
  setIcon (icon) {
    this.imageIcon.src = icon
    this.reset()
  }
  setZIndex (zIndex) {
    this.fatButton.style.zIndex = zIndex
    this.reset()
  }
  setDisplayText (displayText) {
    this.textNode = document.createTextNode(displayText)
    this.reset()
  }
  setChatbotName (name) {
    this.headerContainer.innerHTML = name + this.getSvgClose(this.headerTextColor)
    this.reset()
  }
  setChatbotColor (background, color) {
    if (color) {
      this.headerTextColor = color
      this.headerContainer.style.color = color
    }
    this.headerContainer.style.background = background
    this.reset()
  }
  clearDisplayText () {
    this.textNode = null
    this.reset()
  }
  reset (config = {}) {
    this.remove()
    this.start(config)
  }
  remove () {
    while (this.fatButton.firstChild) this.fatButton.removeChild(this.fatButton.firstChild)
    this.existFatButton() && document.body.removeChild(this.fatButton)
  }
  start (config = {}) {
    let { displayText, animationName, icon, position, chatbot, headerText, headerBackground, headerTextColor, loop, zIndex } = config
    icon && this.setIcon(icon)
    position && this.setPosition(position)
    chatbot && this.setIframe(chatbot)
    animationName && this.setAnimationName(animationName)
    displayText && this.setDisplayText(displayText)
    headerBackground && this.setChatbotColor(headerBackground, headerTextColor)
    headerText && this.setChatbotName(headerText)
    zIndex && this.setZIndex(zIndex)
    this.iframeContainer.appendChild(this.headerContainer)
    this.iframeContainer.appendChild(this.iframe)
    this.iframeContainer && this.fatButton.appendChild(this.iframeContainer)
    this.fatButton.appendChild(this.imageIcon)
    this.textNode && this.fatButton.appendChild(this.textNode)
    document.body.appendChild(this.fatButton)
    this.animate(animationName)
    if (isFinite(loop)) this.startLoop(loop)
  }
  animate (animation) {
    const bounce = new Bounce()
    if (animation && animation !== 'hide') this.setAnimationName(animation)
    if (animation === 'hide') bounce.scale({ from: { x: 1, y: 1 }, to: { x: 0, y: 0 } })
    if (this.animationName === 'rotate') bounce.rotate({ from: 0, to: 360 })
    if (this.animationName === 'translate') bounce.translate({ from: { x: -100, y: 0 }, to: { x: 0, y: 0 } })
    if (this.animationName === 'skew') bounce.translate({ from: { x: -20, y: 0 }, to: { x: 0, y: 0 } })
    if (this.animationName === 'scale' || this.animationName === 'default') bounce.scale({ from: { x: 0.5, y: 0.5 }, to: { x: 1, y: 1 } })
    bounce.applyTo(this.fatButton)
  }
  hide () {
    this.animate('hide')
  }
  show () {
    this.animate('default')
  }
}
window.NodrizaChatBot = new NodrizaChatBot()
