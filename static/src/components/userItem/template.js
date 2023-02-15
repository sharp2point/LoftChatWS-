export default {
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    const img = props.avatar || "./img/default.png";

    return `
    <div class="item">
        <img  class="item-avatar" src="${img}"/>
        <div class="item-data">
            <span class="item-data-name">${props.name}</span>
            <span class="item-data-hello">${props.hello}</span>
        </div>    
    </div>
    `;
  },
  css(props) {
    return `<style>
        .item{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding:0.25rem;
            border-radius: 0.25rem;
            background: transparent
        }
        .item-avatar{
            width:46px;
            height:46px;
            border-radius:50%;
            object-fit: content;
            margin-right: 0.55rem;
        }
        .item-data{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            font-weight: 500;
            font-size: 0.8rem;
            line-height: 1.rem;
        }
        .item-data-name{
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.2rem;
            color:rgba(83, 135, 193, 1);
        }
        .item-data-hello{
            font-weight: 300;
            font-size: 0.8rem;
            line-height: 1rem;
            color: rgba(127, 145, 164, 1);
        }
        </style>`;
  },
};
