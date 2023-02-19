export default {
  map(scope) {
    return {
      header: scope.querySelector(".chat-messages-header"),
      counter: scope.querySelector(".users-count"),
      message: scope.querySelector(".post-message"),
      chat: scope.querySelector(".chat-messages-chat"),
      send: scope.querySelector(".post-send"),
    };
  },
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `
          <header class="chat-messages-header">
            <h1>Чат</h1>
            <span class="users-count">0 участника</span>
          </header>
          <div class="chat-messages-chat"></div>
          <div class="post">
            <input class="post-message" type="text" placeholder="Введите сообщение..."/>
            <button class="post-send">Отправить</button>
          </div>
        `;
  },
  css(props) {
    return `<style>  
            .chat-messages-header{  
              height:56px;
              padding-inline:0.5rem;
              background: var(--background-color2);
            }
            .chat-messages-header h1{
              font-style: normal;
              font-weight: 300;
              font-size: 0.9rem;
              line-height: 1rem;
              color: #FFFFFF;
            }
            .chat-messages-header .users-count{
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 300;
              font-size: 0.8rem;
              line-height: 1rem;
              color: #7F91A4;
            }
            .chat-messages-chat{
              width:100%;
              height:330px;
              background: var(--background-color);
              color: white;
            }
            .post{
                display:flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                background: var(--background-color2);
                height:56px;
                padding-inline:0.5rem;
            }
            .post-message{
                border:none;
                width:80%;
                height:2rem;
                color: white;
                background:var(--background-color2);
                font-size:0.9rem;
                font-weight: 300;
                line-height:1.05rem;
            }
            .post-send{
                width: 112px;
                height: 28px;
                color:white;
                background: #5387C1;
                border-radius: 5px;
            }
        </style>`;
  },
};
