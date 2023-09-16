fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

name 'ag-admin'
version '0.0.0'
description 'FiveM Admin Menu'
author 'Agnarz'
repository 'https://github.com/Agnarz/ag-admin'

shared_scripts {
  	'@ox_lib/init.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
}
