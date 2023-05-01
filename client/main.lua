local QBCore = exports['qb-core']:GetCoreObject()
local PlayerData = QBCore.Functions.GetPlayerData()
local _G = _G
local TriggerEvent = TriggerEvent
local TriggerServerEvent = TriggerServerEvent
local RegisterNetEvent = RegisterNetEvent
local AddEventHandler = AddEventHandler
local RegisterNUICallback = RegisterNUICallback
local RegisterCommand = RegisterCommand
local RegisterKeyMapping = RegisterKeyMapping
local SetNuiFocus = SetNuiFocus
local SetCursorLocation = SetCursorLocation
local SendNUIMessage = SendNUIMessage

RegisterNetEvent("QBCore:Client:OnPlayerLoaded", function()
    PlayerData = QBCore.Functions.GetPlayerData()
end)

RegisterNetEvent("QBCore:Client:OnPlayerUnload", function()
    PlayerData = {}
end)

RegisterNetEvent("QBCore:Player:SetPlayerData", function(val)
    PlayerData = val
    SendNUIMessage({action = "playerData", playerData = PlayerData})
end)

AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    PlayerData = QBCore.Functions.GetPlayerData()
end)

local function ToggleMenu(bool)
    if bool then
        SetNuiFocus(true, true)
        SetCursorLocation(0.9, 0.5)
        SendNUIMessage({action = "open"})
        SendNUIMessage({action = "playerData", playerData = PlayerData})
    else
        SetNuiFocus(false, false)
        SendNUIMessage({action = "close"})
    end
end

RegisterCommand("admin", function() ToggleMenu(true) end)
RegisterKeyMapping("admin", "Open admin menu", "keyboard", Config.OpenMenu)
RegisterNUICallback("close", function(_, cb) cb(1) ToggleMenu(false) end)
RegisterNetEvent("Admin_CL:ToggleMenu", function(bool) ToggleMenu(bool) end)

RegisterNUICallback("NUIHandler", function(data, cb)
    cb(1)
    local eventType = data[1]
    local eventName = data[2]
    local args = data[3]
    if eventType == "function" then
        _G[eventName](args)
        return
    elseif eventType == "client" then
        TriggerEvent(eventName, args)
        return
    elseif eventType == "server" then
        TriggerServerEvent(eventName, args)
        return
    elseif eventType == "command" then
        TriggerServerEvent("QBCore:CallCommand", eventName, args)
        return
    end
end)
