export default {
  map(scope) {
    return {
      auth: scope.querySelector(".chat-auth"),
      usersBlock: scope.querySelector(".users-block"),
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
            <header class="chat-users__menu menu">
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
            <header class="chat-messages-header"></header>
            <div class="chat-messages-chat"></div>
            <chat-post class="chat-messages-post"/>
          </div>
          <chat-auth class="chat-auth"/>
        </div>
    `;
  },
  css(props) {
    return `<style>
        .chat{
            width:100vw;
            height:100vh;
            display: flex;
            flex-direction: row;
            justify-content:flex-start;
            align-items:center;
            background: rgba(23, 33, 43, 1);
        }
        .chat-auth{
          position:absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-47%);
          box-shadow: 0 0 10px rgba(73, 83, 153, 0.5);
        }
        .chat-messages{
          width: 78%;
          height:100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        .chat-messages-header{
          width:100%;
          height:56px;
          margin-bottom:0.5rem;
          background: #17212B;
        }
        .chat-messages-chat{
          width:100%;
          height: 100%;
          background: #0E1621;
        }
        .chat-messages-post{
          width:100%;
          margin-top:0.5rem;
        }
        .chat-users{
            width: 20%;
            height:100%;
            border-right:3px solid #0E1621;
            overflow: hidden;
            overflow-y: scroll;
        }
        .chat-users::-webkit-scrollbar{
          display: none;
        }
        .chat-users__menu{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width:100%;
          height: 56px;
        }
        .menu-button{
          width: 36px;
          height:36px;          
          margin-left: 1rem;
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
        .chat-users__block{
          width: 100%;
          height:100%;
          padding:0.5rem;
          overflow: hidden;
          overflow-y: scroll;
        }
        .chat-users__block::-webkit-scrollbar{
          display: none;
        }
        .users-block{
          width:100%;
          height:100%;

        }
    </style>`;
  },
};
