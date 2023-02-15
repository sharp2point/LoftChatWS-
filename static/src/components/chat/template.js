export default {
  map(scope) {
    return {
      auth: scope.querySelector(".chat-auth"),
      usersBlock: scope.querySelector(".chat-usersBlock"),
    };
  },
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    //
    return `
        <div class="chat"> 
          <div class="chat-users-block">
            <users-block class="chat-usersBlock"/>
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
            justify-content:flex-start;
            align-items:center;
            background: rgba(23, 33, 43, 1);
        }
        .chat-auth{
          position:absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%);
          box-shadow: 0 0 10px rgba(123, 133, 143, 1);
        }
    </style>`;
  },
};
