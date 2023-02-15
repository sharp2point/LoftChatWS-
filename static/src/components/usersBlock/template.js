export default {
  render(props) {
    return `${this.html(props)}${this.css(props)}`;
  },
  html(props) {
    return `<div class="users-block-items">

        </div>`;
  },
  css(props) {
    return `<style>
            .users-block-items{
            }
        </style>`;
  },
};
