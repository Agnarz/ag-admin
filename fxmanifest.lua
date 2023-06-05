fx_version "cerulean"
game "gta5"

description "ag-admin"
version "1.0.0"

shared_scripts {
  "@qb-core/shared/locale.lua",
  "locales/en.lua",
  "config.lua",
}

client_scripts {
  "client/main.lua",
  "client/noclip.lua",
  "client/blipnames.lua",
  "client/objectspawner.lua",
  "client/deletelazer.lua"
}

server_scripts {
  "@oxmysql/lib/MySQL.lua",
  "server/main.lua",
  "server/callbacks.lua",
  "server/commands.lua"
}
lua54 "yes"

ui_page "ui/index.html"
files {
  "ui/index.html",
  "ui/styles.css",
  "ui/data.js",
  "ui/app.js"
}
