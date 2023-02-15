export default {
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `<div class="users-block">

        </div>`;
  },
  css(props) {
    return `<style>
            .users-block{
              width:200px;
              height:500px;
                background:#17212B;
                border: 1px solid white;
            }
        </style>`;
  },
};
