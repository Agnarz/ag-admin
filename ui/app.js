const app = Vue.createApp({
  data: function () {
    return {
      commands: this.getCommands(),
      cmdFilter: "allCmd",
      tabs: [
        {name: "commands", icon: "fas fa-hat-wizard"},
        {name: "players", icon: "fas fa-users"},
        {name: "bans", icon: "fas fa-gavel"}
      ],
      tab: "commands",
      playerFilter: "allPlayers",
      dev: false,
      godMode: false,
      noClip: false,
      invisible: false,
      superjump: false,
      increasedSpeed: false,
      unlimitedStamina: false,
      nightVision: false,
      thermalVision: false,
      spawnModded: true,
      keepVehicle: true,
      disablePeds: false,
      showCoords: false,
      showNames: false,
      showBlips: false,
      vehicleDevMode: false,
      deleteLazer: false,
      qaColor: "#fffffff1",
      devColor: "#fffffff1",
      pedColor: "#fffffff1",
      coordsColor: "#fffffff1",
      namesColor: "#fffffff1",
      blipsColor: "#fffffff1",
      vDevColor: "#fffffff1",
      lazerColor: "#fffffff1",
    };
  },
  setup() {
    const players = ref(Players);
    const targets = ref(Players);
    const pedModels = ref(PedModels);
    const jobs = ref(Jobs);
    const jobGrades = ref(JobGrades);
    const gangs = ref(Gangs);
    const gangGrades = ref(GangGrades);
    const items = ref(Items);
    const weapons = ref(Weapons);
    const vehicles = ref(Vehicles);
    const personalVehicles = ref(PersonalVehicles);
    const engines = ref(Vehicles);
    const teleports = ref(Teleports);
    const timecycles = ref(Timecycles);
    const conditions = ref(Conditions);
    const resources = ref(Resources);
    return {
      props: {
        frameName: {type: String, default: "Admin"},
        dev: {type: Boolean, default: false},
        godMode: {type: Boolean, default: false},
        noClip: {type: Boolean, default: false},
      },
      framework: { plugins: ["LocalStorage", "SessionStorage"] },
      playerData: ref(undefined),
      players,
      player: ref(undefined),
      targets,
      target: ref(undefined),
      commands: ref(undefined),
      search: ref({
        commands: undefined,
        players: undefined,
      }),
      pedModels,
      pedModel: ref(undefined),
      jobs,
      job: ref(undefined),
      jobGrades,
      jobGrade: ref(undefined),
      gangs,
      gang: ref(undefined),
      gangGrades,
      gangGrade: ref(undefined),
      items,
      item: ref(undefined),
      itemAmount: ref(1),
      moneyTypes: ref(["Cash", "Bank", "Crypto"]),
      moneyType: ref("Cash"),
      moneyAmount: ref(undefined),
      weapons,
      weapon: ref(undefined),
      ammoAmount: ref("100"),
      savedPosition: ref({x: undefined, y: undefined, z: undefined}),
      keepVehicle: ref(true),
      spawnModded: ref(true),
      deleteLast: ref(true),
      vehicles,
      vehicle: ref(undefined),
      engines,
      engine: ref(undefined),
      personalVehicles,
      personalVehicle: ref(undefined),
      teleports,
      teleport: ref(undefined),
      coords: ref({x: null, y: null, z: null}),
      object: ref("prop_bin_09a"),
      timecycles,
      timecycle: ref({name: "MP_job_end_night", strength: 0.3}),
      weather: ref({rainLevel: 0.1, snowLevel: 0.1}),
      conditions,
      condition: ref(undefined),
      time: ref({hour: undefined, minute: undefined}),
      resources,
      resource: ref(undefined),
      resourceAction: ref("restart"),
      kickReason: ref(undefined),
      kickAllReason: ref(undefined),
      warnReason: ref(undefined),
      banReason: ref(undefined),
      banLength: ref(undefined),
      Filters: function (val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          pedModels.value = PedModels.filter((v) => v.toLowerCase().indexOf(needle) > -1);
          timecycles.value = Timecycles.filter((v) => v.toLowerCase().indexOf(needle) > -1);
        });
      }
    };
  },
  watch: {
    spawnModded(newValue, oldValue) {localStorage.setItem("spawnModded", JSON.stringify(newValue));},
    deleteLast(newValue, oldValue) {localStorage.setItem("deleteLast", JSON.stringify(newValue));},
    keepVehicle(newValue, oldValue) {localStorage.setItem("keepVehicle", JSON.stringify(newValue));},
  },
  mounted() {
    this.spawnModded = JSON.parse(localStorage.getItem("spawnModded"));
    this.deleteLast = JSON.parse(localStorage.getItem("deleteLast"));
    this.keepVehicle = JSON.parse(localStorage.getItem("keepVehicle"));
    this.listener = window.addEventListener("message", (event) => {
      if (event.data.action === "open") {this.ToggleMenu(true);};
      if (event.data.action === "close") {this.ToggleMenu(false);};

      if (event.data.action === "playerData") {
        this.playerData = event.data.playerData;
      };

      if (event.data.action === "players") {
        Players = event.data.players;
        this.players = event.data.players;
      };

      if (event.data.action === "commandOptions") {
        Targets = event.data.targets;
        this.targets = event.data.targets;

        Jobs = event.data.jobs;
        this.jobs = event.data.jobs;

        Gangs = event.data.gangs;
        this.gangs = event.data.gangs;

        Items = event.data.items;
        this.items = event.data.items;

        Weapons = event.data.weapons;
        this.weapons = event.data.weapons;

        Vehicles = event.data.vehicles;
        this.vehicles = event.data.vehicles;

        Engines = event.data.vehicles;
        this.engines = event.data.vehicles;

        PersonalVehicles = event.data.personalVehicles;
        this.personalVehicles = event.data.personalVehicles.map((v) => {
          return {
            label: v.model,
            model: v.model,
            plate: v.plate
          };
        });

        Teleports = event.data.teleports;
        this.teleports = event.data.teleports;

        Resources = event.data.resources;
        this.resources = event.data.resources;
      };

      if (event.data.action === "utilities") {
        this.playerData = event.data.playerData;
        this.dev = event.data.dev;
        this.godMode = event.data.godMode;
        this.noClip = event.data.noClip;
        this.invisible = event.data.invisible;
        this.superjump = event.data.superjump;
        this.increasedSpeed = event.data.increasedSpeed;
        this.unlimitedStamina = event.data.unlimitedStamina;
        this.nightVision = event.data.nightVision;
        this.thermalVision = event.data.thermalVision;
        this.disablePeds = event.data.disablePeds;
        this.showCoords = event.data.showCoords;
        this.showNames = event.data.showNames;
        this.showBlips = event.data.showBlips;
        this.vehicleDevMode = event.data.vehicleDevMode;
        this.deleteLazer = event.data.deleteLazer;

        if (event.data.dev === true) {
          this.dev = true;
          this.devColor = "#f40552";
        } else {
          this.dev = false;
          this.devColor = "#fffffff1";
        };

        if (event.data.disablePeds === true) {
          this.disablePeds = true;
          this.pedColor = "#f40552";
        } else {
          this.disablePeds = false;
          this.pedColor = "#fffffff1";
        };

        if (event.data.showCoords === true) {
          this.showCoords = true;
          this.coordsColor = "#f40552";
        } else {
          this.showCoords = false;
          this.coordsColor = "#fffffff1";
        };

        if (event.data.showNames === true) {
          this.showNames = true;
          this.namesColor = "#f40552";
        } else {
          this.showNames = false;
          this.namesColor = "#fffffff1";
        };

        if (event.data.showBlips === true) {
          this.showBlips = true;
          this.blipsColor = "#f40552";
        } else {
          this.showBlips = false;
          this.blipsColor = "#fffffff1";
        };

        if (event.data.vehicleDevMode === true) {
          this.vehicleDevMode = true;
          this.vDevColor = "#f40552";
        } else {
          this.vehicleDevMode = false;
          this.vDevColor = "#fffffff1";
        };

        if (event.data.deleteLazer === true) {
          this.deleteLazer = true;
          this.lazerColor = "#f40552";
        } else {
          this.deleteLazer = false;
          this.lazerColor = "#fffffff1";
        };
      };

      if (event.data.action === "personalVehicles") {
        PersonalVehicles = event.data.personalVehicles;
        this.personalVehicles = event.data.personalVehicles;
      };

      if (event.data.action === "SetJobGrades") {
        this.jobGrades = event.data.jobGrades;
        this.jobGrade = "";
      };

      if (event.data.action === "SetGangGrades") {
        this.gangGrades = event.data.gangGrades;
        this.gangGrade = "";
      };
    });
    Config = {};
  },
  destroyed() {
    window.removeEventListener("message", this.listener);
  },
  computed: {
    target: {
      get() { const rs = this.targets.filter((v) => v.label === this.target.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) {this.target.value = v.value;}
    },
    item: {
      get() { const rs = this.items.filter((v) => v.label === this.item.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) {this.item.value = v.value;}
    },
    job: {
      get() { const rs = this.jobs.filter((v) => v.label === this.job.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) {this.job.value = v.value;}
    },
    jobGrade: {
      get() { const rs = this.jobGrades.filter((v) => v.label === this.jobGrade.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) {this.jobGrade.value = v.value;}
    },
    gang: {
      get() { const rs = this.gangs.filter((v) => v.label === this.gang.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) {this.gang.value = v.value;}
    },
    gangGrade: {
      get() { const rs = this.gangGrades.filter((v) => v.label === this.gangGrade.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) {this.gangGrade.value = v.value;}
    },
    weapon: {
      get() { const rs = this.weapons.filter((v) => v.label === this.weapon.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) { this.weapon.value = v.value; }
    },
    vehicle: {
      get() { const rs = this.vehicles.filter((v) => v.label === this.vehicle.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) {this.vehicle.value = v.value;}
    },
    personalVehicle: {
      get() { const rs = this.personalVehicles.filter((v) => v.label === this.personalVehicle.label); return rs.length === 1 ? rs[0] : rs; },
      set(v) { this.personalVehicle = v.value; }
    },
    engine: {
      get() { const rs = this.engines.filter((v) => v.label === this.engine.label); return rs.length === 1 ? rs[0] : rs;},
      set(v) { this.engine.value = v.value; }
    },
    teleport: {
      get() { const rs = this.teleports.filter((v) => v.label === this.teleport.label); return rs.length === 1 ? rs[0] : rs;},
      set(v) { this.teleport.value = v.value; }
    },
    resource: {
      get() { const rs = this.resources.filter((v) => v.label === this.resource.label); return rs.length === 1 ? rs[0] : rs;},
      set(v) { this.resource.value = v.value; }
    },

    commandList: function() {
      this.commands.sort((a, b) => { return a.id - b.id; });
      if (this.search.commands) {
        this.commands.sort((a, b) => { return a.id - b.id; });
        return this[this.cmdFilter].filter((item) => {
          return Object.keys(item).some((key) => {
            return String(item[key])
            .toLowerCase()
            .includes(this.search.commands.toLowerCase());
          });
        });
      } else {
        return this[this.cmdFilter].sort((a, b) => { return b.fav - a.fav; });
      }
    },
    allCmd() {return this.commands},
    playerCmd() {return this.commands.filter((v) => v.filter == 'player')},
    vehicleCmd() {return this.commands.filter((v) => v.filter == 'vehicle')},
    utilityCmd() {return this.commands.filter((v) => v.filter == 'utility')},
    userCmd() {return this.commands.filter((v) => v.filter == 'user')},
    serverCmd() {return this.commands.filter((v) => v.filter == 'server')},

    playersList: function() {
      this.players.sort((a, b) => { return a.source - b.source; });
      if (this.search.players) {
        this.players.sort((a, b) => { return a.source - b.source; });
        return this[this.playerFilter].filter((player) => {
          return Object.keys(player).some((key) => {
            return String(player[key]).toLowerCase().includes(this.search.players.toLowerCase());
          });
        });
      } else {
        return this[this.playerFilter].sort((a, b) => { return a.source - b.source; });
      }
    },
    allPlayers: function() {return this.players;},
    policePlayers: function() {return this.players.filter((v) => v.job.name == "police");},
    emsPlayers: function() {return this.players.filter((v) => v.job.name == "ems");},
    mechanicPlayers: function() {return this.players.filter((v) => v.job.name == "mechanic");},
  },
  methods: {
    ToggleMenu: function(bool) {
      if (bool) {
        $("#AdminUI").fadeIn(150);
      } else {
        $("#AdminUI").fadeOut(550);
      };
    },
    SwitchTab: function(tab) {
      this.tab = tab;
      if (tab == "players") {
        this.nuiHandler(["function", "RefreshData", tab]);
      }
    },
    SetCommandFilter: function(filter) {
      this.cmdFilter = filter;
    },
    SetPlayerFilter: function(filter) {
      this.playerFilter = filter;
    },
    nuiHandler: function(data) {
      axios.post("https://ag-admin/NUIHandler",
        JSON.stringify(data)
      );
      if (data[1] == "Admin:Client:DeletePersonalVehicle") {
        this.personalVehicle = undefined;
      }
    },

    favCommand: function() {
      localStorage.setItem("commands", JSON.stringify(this.commands));
      this.commands.sort((a, b) => { return b.fav - a.fav; });
    },
    getCommands() {
      this.commands = JSON.parse(localStorage.getItem("commands"));
      if (this.commands == undefined) { this.commands = command; }
      return this.commands;
    },
    resetCommands() {
      localStorage.clear()
      localStorage.setItem("commands", JSON.stringify(command));
      this.getCommands()
      return this.commands;
    },

    filterTargets(val, update) {
      if (val === "") { update(() => { this.targets = Targets; }); return; }
      update(() => {
        const needle = val.toLowerCase();
        this.targets = Targets.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setTarget(val) {this.target.value = val;},

    filterItems(val, update) {
      if (val === "") { update(() => { this.items = Items; }); return; }
      update(() => {
        const needle = val.toLowerCase();
        this.items = Items.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setItem(val) {this.item.value = val;},

    filterJobs(val, update) {
      if (val === "") { update(() => { this.jobs = Jobs; }); return; }
      update(() => {
        const needle = val.toLowerCase();
        this.jobs = Jobs.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setJob(val) {this.job.value = val;},

    filterWeapons(val, update) {
      if (val === "") { update(() => { this.weapons = Weapons; }); return; }
      update(() => {
        const needle = val.toLowerCase();
        this.weapons = Weapons.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setWeapon(val) {this.weapon.value = val;},

    filterVehicles(val, update) {
      if (val === "") { update(() => { this.vehicles = Vehicles; }); return; }
      update(() => {
        const needle = val.toLowerCase();
        this.vehicles = Vehicles.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setVehicle(val) {this.vehicle.value = val;},

    filterPersonalVehicles(val, update) {
      if (val === "") { update(() => { this.personalVehicles = PersonalVehicles; }); return; }
      update(() => {
        const needle = val.toLowerCase();
        this.personalVehicles = PersonalVehicles.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setPersonalVehicle(val) {this.personalVehicle.value = val;},

    filterEngines(val, update) {
      if (val === "") { update(() => { this.engines = Vehicles; }); return; }
      update(() => {const needle = val.toLowerCase();
        this.engines = Vehicles.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setEngine(val) {this.engine.value = val;},

    filterTeleports(val, update) {
      if (val === "") { update(() => { this.teleports = Teleports; }); return; }
      update(() => {
        const needle = val.toLowerCase();
        this.teleports = Teleports.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setTeleport(val) {this.teleport.value = val.value;},

    filterResources(val, update) {
      if (val === "") { update(() => { this.resources = Resources; }); return; }
      update(() => {
        const needle = val.toLowerCase();
        this.resources = Resources.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
    setResource(val) {this.resource.value = val;},
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
