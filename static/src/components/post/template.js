export default {
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `
            <div class="post">
                <input class="post-message" type="text" placeholder="Введите сообщение..."/>
                <button class="post-send">Отправить</button>
            </div>
        `;
  },
  css(props) {
    return `<style>
            .post{
                display:flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                background: #17212B;
                padding: 0.9rem;
                height:56px;
            }
            .post-message{
                border:none;
                width:80%;
                height:2rem;
                color: white;
                background:#17212B;
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
