local QBCore = exports["qb-core"]:GetCoreObject()
local RegisterNetEvent = RegisterNetEvent
local AddEventHandler = AddEventHandler
local TriggerEvent = TriggerEvent
local TriggerClientEvent = TriggerClientEvent
local MySQL = MySQL

RegisterNetEvent("Admin:Server:GetPlayersForBlips", function()
    local src = source
    local players = {}
    for k, v in pairs(QBCore.Functions.GetPlayers()) do
        local targetped = GetPlayerPed(v)
        local ped = QBCore.Functions.GetPlayer(v)
        players[#players+1] = {
            name = GetPlayerName(v),
            id = v,
            coords = GetEntityCoords(targetped),
            cid = ped.PlayerData.charinfo.firstname .. " " .. ped.PlayerData.charinfo.lastname,
            citizenid = ped.PlayerData.citizenid,
            sources = GetPlayerPed(ped.PlayerData.source),
            sourceplayer= ped.PlayerData.source
        }
    end
    TriggerClientEvent("Admin:Client:Show", src, players)
end)

RegisterNetEvent("Admin:Server:BuyVehicle", function(mods, vehicle, hash, plate)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local result = MySQL.Sync.fetchAll("SELECT plate FROM player_vehicles WHERE plate = ?", { plate })
    if result[1] == nil then
        MySQL.Async.insert("INSERT INTO player_vehicles (license, citizenid, vehicle, hash, mods, plate, state) VALUES (?, ?, ?, ?, ?, ?, ?)", {
            Player.PlayerData.license,
            Player.PlayerData.citizenid,
            vehicle.model,
            vehicle.hash,
            json.encode(mods),
            plate,
            0
        })
        QBCore.Functions.Notify(src, Lang:t("success.success_vehicle_owner"), "success", 5000)
    else
        QBCore.Functions.Notify(src, Lang:t("error.failed_vehicle_owner"), "error", 3000)
    end
end)

RegisterNetEvent("Admin:Server:DeletePersonalVehicle", function(plate)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    MySQL.query("DELETE FROM player_vehicles WHERE plate = ?", {plate})
    TriggerClientEvent("Admin:Client:UpdatePersonalVehicles", src)
end)

RegisterNetEvent("Admin:Server:ResourceControl", function(data)
    local action = data[1]
    local resource = data[2]
    if action == "stop" then
        StopResource(resource)
    end
    if action == "restart" then
        QBCore.Functions.Notify(source, "Restarting resource".." "..resource, "error")
        StopResource(resource)
        Wait(1000)
        StartResource(resource)
    end
    if action == "start" then
        StartResource(resource)
    end
end)

RegisterNetEvent("Admin:Server:ReviveTarget", function(target)
    local target = target
    TriggerClientEvent("hospital:client:Revive", target)
end)

RegisterNetEvent("Admin:Server:ReviveRadius", function(source)
    local players = QBCore.Functions.GetPlayers()
    local src = source
    local ped = GetPlayerPed(src)
    local pos = GetEntityCoords(ped)
    for k, v in pairs(players) do
        local target = GetPlayerPed(v)
        local targetPos = GetEntityCoords(target)
        local dist = #(pos - targetPos)
        if dist < 15.0 then
            TriggerClientEvent("hospital:client:Revive", v)
        end
    end
end)

RegisterNetEvent("Admin:Server:KillTarget", function(target)
    local target = target
    TriggerClientEvent("hospital:client:KillPlayer", target)
end)

RegisterNetEvent("Admin:Server:KillRadius", function(source)
    local players = QBCore.Functions.GetPlayers()
    local src = source
    local ped = GetPlayerPed(src)
    local pos = GetEntityCoords(ped)
    for k, v in pairs(players) do
        local target = GetPlayerPed(v)
        local targetPos = GetEntityCoords(target)
        local dist = #(pos - targetPos)
        if dist < 15.0 then
            TriggerEvent("Admin:Server:KillTarget", v)
        end
    end
end)

RegisterNetEvent("Admin:Server:SpectateTarget", function(source, targetID)
    local src = source
    local target = GetPlayerPed(targetID)
    local coords = GetEntityCoords(target)
    TriggerClientEvent("Admin:Client:SpectateTarget", src, targetID, coords)
end)

RegisterNetEvent("Admin:Server:FreezeTarget", function(player)
    local target = GetPlayerPed(player)
    if not frozen then
        frozen = true
        FreezeEntityPosition(target, true)
    else
        frozen = false
        FreezeEntityPosition(target, false)
    end
end)

RegisterNetEvent("Admin:Server:BringTarget", function(source, targetID)
    local src = source
    local admin = GetPlayerPed(src)
    local coords = GetEntityCoords(admin)
    local target = GetPlayerPed(targetID)
    SetEntityCoords(target, coords)
end)

RegisterNetEvent("Admin:Server:GotoTarget", function(source, targetID)
    local src = source
    local admin = GetPlayerPed(src)
    local coords = GetEntityCoords(GetPlayerPed(targetID))
    SetEntityCoords(admin, coords)
end)

RegisterNetEvent("Admin:Server:IntoVehicleTarget", function(source, targetID)
    local src = source
    local admin = GetPlayerPed(src)
    -- local coords = GetEntityCoords(GetPlayerPed(target))
    local targetPed = GetPlayerPed(targetID)
    local vehicle = GetVehiclePedIsIn(targetPed,false)
    local seat = -1
    if vehicle ~= 0 then
        for i=0,8,1 do
            if GetPedInVehicleSeat(vehicle,i) == 0 then
                seat = i
                break
            end
        end
        if seat ~= -1 then
            SetPedIntoVehicle(admin,vehicle,seat)
            QBCore.Functions.Notify(src, Lang:t("sucess.entered_vehicle"), "success", 5000)
        else
            QBCore.Functions.Notify(src, Lang:t("error.no_free_seats"), "danger", 5000)
        end
    end
end)

RegisterNetEvent('Admin:Server:OpenTargetInventory', function(target)
    local src = source
    TriggerClientEvent('Admin:Client:OpenTargetInventory', src, target)
end)

RegisterNetEvent('Admin:Server:KickAll', function(source, reason)
    local src = source
    if QBCore.Functions.HasPermission(src, 'admin') or IsPlayerAceAllowed(source, 'command') then
        for k, v in pairs(QBCore.Functions.GetPlayers()) do
            TriggerEvent('qb-log:server:CreateLog', 'bans', 'Player Kicked', 'red', string.format('%s was kicked by %s for %s', GetPlayerName(v), GetPlayerName(src), reason), true)
            DropPlayer(v, reason)
        end
    end
end)

RegisterNetEvent('Admin:Server:BanTarget', function(player, time, reason)
    local src = source
    if QBCore.Functions.HasPermission(src, 'god') or IsPlayerAceAllowed(src, 'command') then
        time = tonumber(time)
        local banTime = tonumber(os.time() + time)
        if banTime > 2147483647 then
            banTime = 2147483647
        end
        local timeTable = os.date('*t', banTime)
        MySQL.insert('INSERT INTO bans (name, license, discord, ip, reason, expire, bannedby) VALUES (?, ?, ?, ?, ?, ?, ?)', {
            GetPlayerName(player),
            QBCore.Functions.GetIdentifier(player, 'license'),
            QBCore.Functions.GetIdentifier(player, 'discord'),
            QBCore.Functions.GetIdentifier(player, 'ip'),
            reason,
            banTime,
            GetPlayerName(src)
        })
        TriggerClientEvent('chat:addMessage', -1, {
            template = "<div class=chat-message server'><strong>ANNOUNCEMENT | {0} has been banned:</strong> {1}</div>",
            args = {GetPlayerName(player), reason}
        })
        TriggerEvent('qb-log:server:CreateLog', 'bans', 'Player Banned', 'red', string.format('%s was banned by %s for %s', GetPlayerName(player), GetPlayerName(src), reason), true)
        if banTime >= 2147483647 then
            DropPlayer(player, Lang:t("info.banned") .. '\n' .. reason .. Lang:t("info.ban_perm") .. QBCore.Config.Server.Discord)
        else
            DropPlayer(player, Lang:t("info.banned") .. '\n' .. reason .. Lang:t("info.ban_expires") .. timeTable['day'] .. '/' .. timeTable['month'] .. '/' .. timeTable['year'] .. ' ' .. timeTable['hour'] .. ':' .. timeTable['min'] .. '\n🔸 Check our Discord for more information: ' .. QBCore.Config.Server.Discord)
        end
    end
end)
