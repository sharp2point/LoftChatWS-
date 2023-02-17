export default {
  map(scope) {
    return {
      avatar: scope.querySelector(".owner-avatar"),
      name: scope.querySelector(".message-owner"),
      text: scope.querySelector(".post-text"),
      time: scope.querySelector(".post-time"),
    };
  },
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `
        <div class="message">
            <header class="message-owner"></header>
            <div class="message-content">
                <img class="owner-avatar" src=""/>
                <div class="post">
                    <div class="post-text"></div>
                    <span class="post-time"></span>
                </div>
            </div>
        </div>
    `;
  },
  css(props) {
    return `<style>
    .message{
        width:90%;
        padding:0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-item: flex-start;
        gap: 0.5rem;
    }
    .message-owner{
        font-style: normal;
        font-weight: 500;
        font-size: 0.8rem;
        line-height: 1rem;
        color: var(--blue-color);
        margin-left: 40px;
    }
    .message-content{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-item: flex-start;
    }
    .owner-avatar{
        width:33px;
        height:33px;
        object-fit:content;
        border-radius:50%;
        margin-right:0.5rem;
    }
    .message-content .post{
        padding: 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.4rem;        
        background: var(--background-message);
        font-style: normal;
        font-weight: 300;
        font-size: 0.9rem;
        line-height: 1rem;
    }
    .post-text{        
        color: white;
        margin-right: 1rem;
    }
    .post-time{
        color: var(--time-color);
        align-self: flex-end;
    }
    </style>`;
  },
};
