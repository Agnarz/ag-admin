local nuiReady = false

---Update the menu with new data
---@param action string -- Action to perform
---@param data string | table | number | boolean -- Data to send to the menu
local function updateMenu(action, data)
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

RegisterNetEvent('admin:toggleMenu', function(bool)
    toggleMenu(bool)
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
