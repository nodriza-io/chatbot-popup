# chatbot-popup

## Usage
Copy data from your Nodriza account 

## Example
```html
<script src="cdn.jsdelivr.net/gh/nodriza-io/chatbot-popup@master/dist/chatbot.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", event => {
    window.NodrizaChatBot.start({
      chatbot: 'https://nubox.nodriza.io/bots/proposalbot/Nubox-Proposal-Bot',
      headerText: 'Nubox Bot',
      headerTextColor: '#ffffff',
      headerBackground: '#122543',
      animationName: 'scale', // rotate, translate, skew, scale
      displayText: 'Hola, soy Bot',
      // loop: 5000, // milliseconds
      // icon: 'https://img.icons8.com/color/260/bot.png',
      // position: 'bottom-right'
    })
  })
</script>
```

## Mobile
![alt text](https://github.com/nodriza-io/chatbot-popup/blob/master/images/Screen%20Shot%202019-05-02%20at%203.27.56%20PM.png?raw=trueg "")
![alt text](https://github.com/nodriza-io/chatbot-popup/blob/master/images/Screen%20Shot%202019-05-02%20at%203.28.10%20PM.png?raw=true "")

## Desktop
![alt text](https://github.com/nodriza-io/chatbot-popup/blob/master/images/Screen%20Shot%202019-05-02%20at%203.28.21%20PM.png?raw=true "")
