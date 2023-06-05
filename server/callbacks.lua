local QBCore = exports['qb-core']:GetCoreObject()
local MySQL = MySQL

local tostring = tostring
local pairs = pairs
local tableSort = table.sort

local function FormatMoney(number)
    local _, _, minus, int, fraction = tostring(number):find('([-]?)(%d+)([.]?%d*)')
    int = int:reverse():gsub("(%d%d%d)", "%1,")
    return minus .. int:reverse():gsub("^,", "") .. fraction
end

local function FormatPhoneNumber(number)
    local phoneString = tostring(number)
    local formattedNumber = phoneString:gsub("(%d%d%d)(%d%d%d)(%d%d%d%d)", "(%1) %2-%3")
    return formattedNumber
end

-- Callbacks --
QBCore.Functions.CreateCallback('GetOnlinePlayers', function(source, cb)
    local OnlinePlayers = {}
    for k, v in pairs(QBCore.Functions.GetPlayers()) do
        local player = QBCore.Functions.GetPlayer(v)
        OnlinePlayers[#OnlinePlayers+1] = {
            label = '('..player.PlayerData.source..') '..'['..player.PlayerData.name..'] '..player.PlayerData.charinfo.firstname..' | '..player.PlayerData.citizenid,
            value = v,
            source = v,
            citizenid = player.PlayerData.citizenid,
            id = player.PlayerData.id,
            account = player.PlayerData.name,
            license = player.PlayerData.license,
            charinfo = player.PlayerData.charinfo,
            phonenumber = FormatPhoneNumber(player.PlayerData.charinfo.phone),
            metadata  = player.PlayerData.metadata,
            job  = player.PlayerData.job,
            gang  = player.PlayerData.gang,
            money  = player.PlayerData.money,
            cash = '$'.. FormatMoney(player.PlayerData.money.cash),
            bank = '$'.. FormatMoney(player.PlayerData.money.bank),
            isdead = player.PlayerData.metadata["isdead"],
        }
    end
    cb(OnlinePlayers)
end)

QBCore.Functions.CreateCallback('Admin:GetPersonalVehicles', function(source, cb)
    local Player = QBCore.Functions.GetPlayer(source)
    local Vehicles = {}
    MySQL.query('SELECT * FROM player_vehicles WHERE citizenid = ?', {Player.PlayerData.citizenid}, function(result)
        for _, v in pairs(result) do
            local VehicleData = QBCore.Shared.Vehicles[v.vehicle]
            Vehicles[#Vehicles+1] = {
                label = VehicleData["name"] .. " | " .. v.plate,
                brand = VehicleData["brand"],
                model = VehicleData["model"],
                plate = v.plate,
                fuel = v.fuel,
                engine = v.engine,
                body = v.body
            }
        end
        tableSort(Vehicles, function(a, b)
            return a.label < b.label
        end)
        cb(Vehicles)
    end)
end)