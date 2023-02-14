export default {
  map(scope) {
    return {
      auth: scope.querySelector(".chat-auth"),
    };
  },
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `
        <div class="chat">
            <loftchat-auth class="chat-auth"/>
        </div>
    `;
  },
  css(props) {
    return `<style>
        .chat{
            width:100vw;
            height:100vh;
            display: flex;
            justify-content:center;
            align-items:center;
            background: rgba(23, 33, 43, 1);
        }
        .chat-auth{
            box-shadow: 0 0 10px rgba(123, 133, 143, 1);
        }
    </style>`;
  },
};
