fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

name 'ag-admin'
version '0.3.2'
description 'FiveM Admin Menu'
author 'Agnarz'
repository 'https://github.com/Agnarz/ag-admin'

shared_script '@ox_lib/init.lua'

client_scripts {
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
