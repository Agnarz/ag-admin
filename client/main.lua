local resource = GetCurrentResourceName()
local nuiReady = false
isMenuOpen = false
local _registerCommand = RegisterCommand

---@param commandName string
---@param callback fun(source, args, raw)
---@param restricted boolean?
function RegisterCommand(commandName, callback, restricted)
	_registerCommand(commandName, function(source, args, raw)
		if not restricted or lib.callback.await('ox_lib:checkPlayerAce', 100, ('command.%s'):format(commandName)) then
			callback(source, args, raw)
		end
	end)
end

---Load a json file from the shared directory and return the data as a table.
---The file must be in the format of a `.json` file and must be in the `shared` directory.
---@param directory string
---@return table
local function loadJSON(directory)
    local dir = ('shared/%s.json'):format(directory)
    local file = json.decode(LoadResourceFile(resource, dir))
    return file
end

local commands = loadJSON('commands')
local quickactions = loadJSON('quickactions')
local vehicles = loadJSON('vehicles')
local weapons = loadJSON('weapons')
teleports = loadJSON('teleports')
local pedmodels = loadJSON('pedmodels')
local timecycles = loadJSON('timecycles')
local weather = loadJSON('weather')
local items = loadJSON('items')
local jobs = loadJSON('jobs')
local gangs = loadJSON('gangs')

---Update the menu with new data
---@param action string -- Action to perform
---@param data string | table | number | boolean | nil -- Data to send to the menu
function updateMenu(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

---Toggle the menu
---@param bool boolean
local function toggleMenu(bool)
    if not nuiReady then return end
    SetNuiFocus(bool, bool)
    updateMenu('toggleMenu', bool)
    isMenuOpen = bool
    if bool == true then
        updateMenu('updateOptions', {
            key = 'Targets',
            options = lib.callback.await('ag:getTargets', 100)
        })
        updateMenu('setPlayers', lib.callback.await('ag:getPlayers', 100))
    end
end

RegisterCommand('admin', function() toggleMenu(true) end)
RegisterKeyMapping('admin', 'Open Admin Menu', 'keyboard', 'U')
RegisterNetEvent('admin:toggleMenu', toggleMenu)
RegisterNuiCallback('closeMenu', function(_, cb)
    cb(1)
    toggleMenu(false)
end)



local favorites = {}

local function loadFavorites()
    local savedFavorites = GetResourceKvpString('favorites')
    if not savedFavorites then return end
    favorites = json.decode(savedFavorites)
end

loadFavorites()

RegisterNuiCallback('favorite', function(data, cb)
    cb(1)
    SetResourceKvp('favorites', json.encode(data))
end)

RegisterCommand('commands-r', function()
    if lib.alertDialog({
        header = 'Admin Menu',
        content = 'Are you sure you want to reload the commands?',
        cancel = true
    }) == 'confirm' then
        DeleteResourceKvp('favorites')
        updateMenu('resetCommands')
    end
end)

RegisterNuiCallback('GetOptions', function(_, cb)
    cb({
        vehicles = vehicles,
        weapons = weapons,
        teleports = teleports,
        pedmodels = pedmodels,
        timecycles = timecycles,
        weather = weather,
        items = items,
        jobs = jobs,
        gangs = gangs
    })
end)

RegisterNuiCallback('init', function(_, cb)
    cb({
        commands = commands,
        favorites = favorites,
        quickactions = quickactions,
    })
    nuiReady = true
end)

RegisterNuiCallback('triggerCommand', function(data, cb)
    cb(1)
    if lib.callback.await('ox_lib:checkPlayerAce', 250, 'command') then
        ExecuteCommand(data)
    else
        lib.notify({
            type = 'error',
            title = 'Admin',
            description = 'You do not have permission to use this command.'
        })
    end
end)

lib.callback.register('ag:GetPedheadshotTxdString', function(player)
    local ped = GetPlayerPed(GetPlayerFromServerId(player))
    local headshot = RegisterPedheadshot(ped)

    while not IsPedheadshotReady(headshot) do
        Wait(0)
    end

    local txd = GetPedheadshotTxdString(headshot)

    UnregisterPedheadshot(headshot)
    return txd
end)
