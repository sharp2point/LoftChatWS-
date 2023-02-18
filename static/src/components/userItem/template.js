export default {
  map(scope) {
    return {
      avatar: scope.querySelector(".item-avatar"),
      hello: scope.querySelector(".item-data-hello"),
      dialog: scope.querySelector(".item-dialog"),
      dialogSaveButton: scope.querySelector(".cancel-button"),
      dialogCancelButton: scope.querySelector(".save-button"),
      dialogAvatar: scope.querySelector(".item-dialog-avatar"),
      dialogForm: scope.querySelector(".dialog-form"),
      dialogFile: scope.querySelector(".dialog-form-file"),
    };
  },
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
    <div class="item-dialog">
        <form class="dialog-form"  method="post" enctype="multipart/form-data"  action="http://localhost:8000/api/avatar">
            <input type="file" class="dialog-form-file" name="avatar" accept="image/*"/>
        </form>
        <img  class="item-dialog-avatar" src="${img}"/>
        <span class="item-dialog-text">Область для профильной фотографии</span>
        <div class="item-dialog-actions">
            <button class="item-dialog-button cancel-button">ОТМЕНА</button>
            <button class="item-dialog-button save-button ">СОХРАНИТЬ</button>
        </div>
    </div>
    `;
  },
  css(props) {
    return `<style>
        .dialog-form{
            display:none;
        }
        .item-dialog{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            display: flex;
            flex-direction:column;
            justify-content: flex-start;
            align-items: center;
            width:364px;
            height:452px;
            background: var(--background-color2);
            z-index:100;
            box-shadow: 0 0 0.5rem var(--blue-color);
            border-radius:0.6rem;
            gap:1rem;
        }
        .item-dialog-avatar{
            width: 284px;
            height:308px;
            object-fit:content; 
            margin-top: 30px;        
        }
        .item-dialog-text{
            font-style: normal;
            font-weight: 300;
            font-size: 0.9rem;
            line-height: 1rem;
            text-align: center;
            color:var(--time-color);
        }
        .item-dialog-actions{
            width:90%;
            display: flex;
            flex-direction:row;
            justify-content: flex-end;
            align-items: center;
        }
        .item-dialog-button{
            width:110px;
            height:36px;
            border: none;
            background: transparent;
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 17px;
            text-align: center;
            color: var(--blue-color);
        }
        .item-dialog-button:hover{
            background: #1D2A3A;
            border-radius: 2px;
        }
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
            cursor: pointer;
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
