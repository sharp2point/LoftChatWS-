export default {
  map(scope) {
    return {
      header: scope.querySelector(".chat-messages-header"),
      counter: scope.querySelector(".users-count"),
      message: scope.querySelector(".post-message"),
      chat: scope.querySelector(".chat-messages-chat"),
      send: scope.querySelector(".post-send"),
      post: scope.querySelector(".post"),
    };
  },
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `<div class="chat-messages-out">
              <header class="chat-messages-header">
                <h1>Чат</h1>
                <span class="users-count">0 участника</span>
              </header>
              <div class="chat-messages-chat"></div>
              <form class="post">
                <input class="post-message" type="text" placeholder="Введите сообщение..."/>
                <button class="post-send">Отправить</button>
              </form>
          </div>
        `;
  },
  css(props) {
    return `<style>  
            .chat-messages-out{
              width:95%;
              height:99%;
              display: flex;
              flex-direction:column;
              justify-content: space-between;
              align-items: flex-start;
              padding-right: 1rem;
            }
            .chat-messages-header{  
              width:95%;
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
              font-style: normal;
              font-weight: 300;
              font-size: 0.8rem;
              line-height: 1rem;
              color: #7F91A4;
            }
            .chat-messages-chat{
              flex-basis: 100%;
              width:95%;
              height:330px;
              background: var(--background-color);
              color: white;
              overflow: none;
              overflow-y:scroll;
            }
            .chat-messages-chat::-webkit-scrollbar{
              display: none;
            }
            .post{
                display:flex;
                gap:1rem;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                background: var(--background-color2);
                height:56px;
                width:95%;
                padding-inline:1rem;
            }
            .post-message{
                border:none;
                width:87%;
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
                border:none;
                background: #5387C1;
                border-radius: 5px;
                transition:all 0.1s ease-in;
            }
            .post-send:hover{
              transform: scale(1.05);
              box-shadow:0 0 2px var(--blue-color), 0 0 6px white;
          }
        </style>`;
  },
};
