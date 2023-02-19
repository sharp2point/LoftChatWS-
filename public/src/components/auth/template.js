export default {
  map(scope) {
    return {
      form: scope.querySelector(".auth-form"),
      submit: scope.querySelector(".submit"),
    };
  },
  render(props) {
    return `${this.css(props)}${this.html(props)}`;
  },
  html(props) {
    return `<div class="auth">
                <div class="auth-icon"></div>
                <header>
                    <h1>Авторизация</h1>
                    <span>Введите пожалуйста свой ник для дальнейшей авторизации</span>
                </header>
                <form class="auth-form">                
                    <input class="auth-form__nik" name="nik" type="text" placeholder="Введите свой ник">
                    <button class="submit">войти</button>
                </form>
            </div>`;
  },
  css(props) {
    return `<style>    
        .auth{
            display:flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 452px;
            height: 450px;
            background: var(--background-color2);            
            padding:1.5rem;
            color: white;
            box-shadow: 0 0 0.5rem var(--blue-color);
            border-radius:0.6rem;
        }
        .auth-icon{
            width: 139px;
            height: 139px;
            border-radius: 50%;
            background: center / 70% no-repeat url("./img/auth_icon.svg") #232F3D;
        }
        .auth header{
            display:flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width:70%;
            height: 150px;
        }
        .auth header h1{
            font-size:2rem;
            font-weight:500;
            line-height:2.5rem;
        }
        .auth header span{
            text-align: center;
            font-size:1rem;
            font-weight: 400;
            line-height:1.25rem;
            color:#7F91A4;
        }
        .auth-form{
            margin-top: 2rem;
            width: 80%;
            height: 100px;
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
        .auth-form__nik{
            font-weight: 300;
            font-size: 1rem;
            line-height: 1.2rem;
            width: 100%;
            padding:0.25rem;
            border: none;
            border-bottom:1px solid #465461;
            background:#17212B; 
            color: white;
        }
        .auth-form__nik:focus{
            background:#17212B; 
        }

        .auth-form__nik::placeholder{            
            color: #858F98;
        }
        .auth-form .submit{
            font-size:1rem;
            font-weight: 500;

            width: 132px;
            padding: 0.6rem;
            color: white;
            border: none;
            background:#5188C1;
            border-radius: 5px;
            transition: all 0.25s ease-in-out;
        }
        .auth-form .submit:hover{
            transform: scale(1.05);
        }
        @media (max-width: 400px){
            .auth{
              width:100vw;
              height:100vh;
              box-shadow: none;
              border-radius:0;
            }
          }
    </style>`;
  },
};
