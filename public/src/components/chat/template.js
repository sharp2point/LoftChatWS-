export default {
  map(scope) {
    return {
      auth: scope.querySelector(".chat-auth"),
      usersBlock: scope.querySelector(".users-block"),
      chatBlock: scope.querySelector(".chat-block"),
      owner: scope.querySelector(".chat-users-owner"),
      menuButton: scope.querySelector(".menu-button"),
      chatUsers: scope.querySelector(".chat-users"),
    };
  },
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `
        <div class="chat"> 
          <button class="menu-button">
            <span class="button-line"></span>
          </button>
          <div class="chat-users">
            <div class="header"></div>
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
            width:98vw;
            height:95vh;
            display: flex;
            flex-direction: row;
            justify-content:flex-start;
            align-items:center;
            background: var(--background-color2);
        }
        .chat-auth{
          position:absolute;
          
          box-shadow: 0 0 10px rgba(73, 83, 153, 0.5);
        }
        .header{
          width:100%;
          height:60px;
        }
        .chat-users{
            width: 263px;
            height:100%;
            padding-inline:1rem;
            border-right:3px solid var(--background-color);
            overflow: hidden;
            overflow-y: scroll;
            background: var(--background-color2);
        }
        .chat-users::-webkit-scrollbar{
          display: none;
        }
        .chat-messages{
          width:95%;
          height:95%;

        }
        .menu-button{
          position:absolute;
          top:1.5rem;
          left:2rem;
          width: 36px;
          height:36px;
          border: none;
          display: flex;
          padding:5px;
          flex-direction: column;
          justify-content:space-around;
          align-items:center;
          background: rgba(23, 33, 43, 1);
          transition: all 0.1s ease-in;
        }
        .menu-button:hover{
          transform: scale(1.05);
          border-radius: 0.2rem;
          box-shadow:0 0 5px var(--blue-color);
        }
        .button-line::after{
          position: absolute;
          transform: translateX(-13px) translateY(9px);
          content:'';
          width:25px;
          height:3px;
          border:none;
          border-radius: 5px;
          background: #6C7982;
        }
        .button-line::before{
          position: absolute;
          transform: translateX(-13px) translateY(-9px);
          content:'';
          width:25px;
          height:3px;
          border:none;
          border-radius: 5px;
          background: #6C7982;
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
        .openUserBlock{
          left:0 !important;
        }
        @media (max-width: 400px){
          .chat{
            width:100vw;
            height:100vh;
          }
          .chat-auth{
            position:absolute;
            top:0;
            left:0;
            transform: translate(0,0);
            box-shadow: none;
          }
          .chat-users{
            position:absolute;
            top:0;
            left:-500px;  
            transition: all 0.1s ease-in;    
          }
          .menu-button{
            top:1rem;
            left:88%;
          }
        }
    </style>`;
  },
};
