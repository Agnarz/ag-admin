local resource = GetCurrentResourceName()
local nuiReady = false

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
end

RegisterNetEvent('admin:toggleMenu', toggleMenu)

RegisterNUICallback('closeMenu', function(_, cb)
    cb(1)
    toggleMenu(false)
end)

RegisterNuiCallback('init', function(_, cb)
    cb(1)
    if lib.callback.await('ox_lib:checkPlayerAce', 250, 'command') then
        nuiReady = true
        updateMenu('setCommands', commands)
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

-- Work around for admin command being registered on the server.
lib.addKeybind({
    name = 'openadmin',
    description = 'Open Admin Menu',
    defaultKey = 'U',
    onPressed = function()
        if lib.callback.await('ox_lib:checkPlayerAce', 100, 'command.admin') then
            ExecuteCommand('admin')
        end
    end
})
