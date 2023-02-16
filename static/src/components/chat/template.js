export default {
  map(scope) {
    return {
      auth: scope.querySelector(".chat-auth"),
      usersBlock: scope.querySelector(".users-block"),
      chatBlock: scope.querySelector(".chat-block"),
      owner: scope.querySelector(".chat-users-owner"),
    };
  },
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `
        <div class="chat"> 
          <div class="chat-users">
            <header class="chat-users-menu menu">
              <button class="menu-button">
                <span class="button-line"></span>
                <span class="button-line"></span>
                <span class="button-line"></span>
              </button>
            </header>
            <div class="chat-users-owner"></div>
            <users-block class="users-block"/>
          </div>
          <div class="chat-messages">
            <chat-block class="chat-block"/>
          </div>
          <chat-auth class="chat-auth"/>
        </div>
    `;
  },
  css(props) {
    return `<style>
        .chat{
            width:810px;
            height:452px;
            display: flex;
            flex-direction: row;
            justify-content:flex-start;
            align-items:center;
            background: var(--background-color2);
        }
        .chat-auth{
          position:absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-47%);
          box-shadow: 0 0 10px rgba(73, 83, 153, 0.5);
        }
        .chat-users{
            width: 263px;
            height:100%;
            padding-inline:1rem;
            border-right:3px solid var(--background-color);
            overflow: hidden;
            overflow-y: scroll;
        }
        .chat-users::-webkit-scrollbar{
          display: none;
        }
        .chat-messages{
          display: flex;
          flex-direction:column;
          justify-content: space-between;
          align-items:stretch;
          width:584px;
          height:100%;
        }

        .chat-user-menu{
          margin-top:1rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width:100%;
          height: 56px;
        }
        .menu-button{
          width: 36px;
          height:36px;
          border: none;
          display: flex;
          padding:5px;
          flex-direction: column;
          justify-content:space-around;
          align-items:center;
          background: rgba(23, 33, 43, 1);
        }
        .button-line{
          width:100%;
          height:3px;
          border:none;
          border-radius: 5px;
          background: #6C7982;
        }
        .users-block{
          width:100%;
          height:100%;
        }
    </style>`;
  },
};
