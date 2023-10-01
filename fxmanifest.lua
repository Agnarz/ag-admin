fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

name 'ag-admin'
version '0.4.6'
description 'FiveM Admin Menu'
author 'Agnarz'
repository 'https://github.com/Agnarz/ag-admin'

shared_script '@ox_lib/init.lua'

client_scripts {
    'client/freecam/utils.lua',
    'client/freecam/config.lua',
    'client/freecam/camera.lua',
    'client/freecam/main.lua',
    'client/main.lua',
    'client/commands.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua'
}

ui_page 'web/build/index.html'

files {
    'web/build/index.html',
    'web/build/**/*',
    'shared/*.json'
}
