local resource = GetCurrentResourceName()
local nuiReady = false

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
local vehicles = loadJSON('vehicles')
local weapons = loadJSON('weapons')
local pedmodels = loadJSON('pedmodels')
local teleports = loadJSON('teleports')
local timecycles = loadJSON('timecycles')
local weather = loadJSON('weather')

---Update the menu with new data
---@param action string -- Action to perform
---@param data string | table | number | boolean -- Data to send to the menu
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
    if bool == true then
        updateMenu('setTargets', lib.callback.await('ag:getTargets', 100))
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

RegisterNuiCallback('init', function(_, cb)
    cb(1)
    if lib.callback.await('ox_lib:checkPlayerAce', false, 'command') then
        nuiReady = true
        updateMenu('setCommands', commands)
        Wait(250)
        updateMenu('setOptions', {
            vehicles = vehicles,
            weapons = weapons,
            pedmodels = pedmodels,
            teleports = teleports,
            timecycles = timecycles,
            weather = weather
        })
    end
end)

RegisterNUICallback('triggerCommand', function(data, cb)
    cb(1)
    if lib.callback.await('ox_lib:checkPlayerAce', 250, 'command') then
        ExecuteCommand(data)
    else
        lib.notify({
            type = 'error',
            title = 'Admin',
            desription = 'You do not have permission to use this command.'
        })
    end
end)
