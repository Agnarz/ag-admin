const { ref } = Vue;

const app = Vue.createApp({
  data: function () {
    return {
      tabs: [
        {name: "commands", icon: "fas fa-hat-wizard"},
        {name: "online", icon: "fas fa-users"},
        {name: "bans", icon: "fas fa-gavel"},
      ],
      tab: "commands",
    };
  },
  setup() {
    return {

    };
  },
  mounted() {
    this.listener = window.addEventListener("message", (event) => {
      if (event.data.action === "open") {this.ToggleMenu(true);}
      if (event.data.action === "close") {this.ToggleMenu(false);}
    });
    Config = {};
  },
  destroyed() {
    window.removeEventListener("message", this.listener);
  },
  computed: {},
  watch: {},
  methods: {
    ToggleMenu: function(bool) {
      if (bool) {
        $("#AdminUI").fadeIn(150);
      } else {
        $("#AdminUI").fadeOut(550);
      };
    },
    SwitchTab(tab) {this.tab = tab;},
    nuiHandler: function(data) {
      axios.post("https://ag-admin/NUIHandler",
        JSON.stringify(data)
      );
    }
  },
});
app.use(Quasar, { config: {} });
app.mount("#AdminUI");

function closeMenu() {
  axios.post("https://ag-admin/close");
}

document.onkeyup = function (data) {
  if (data.key == "Escape") {
    closeMenu();
  }
};
