local QBCore = exports["qb-core"]:GetCoreObject()
local TriggerClientEvent = TriggerClientEvent
local TriggerEvent = TriggerEvent
local MySQL = MySQL

local tonumber = tonumber
local tostring = tostring
local pairs = pairs

QBCore.Commands.Add("dev", Lang:t("commands.toggle_dev_mode"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:DevMode", src)
end, "admin")

QBCore.Commands.Add("jesus", Lang:t("commands.revive_self"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:ReviveSelf", src)
end, "admin")

QBCore.Commands.Add("armor", Lang:t("commands.give_armor"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:GiveArmor", src)
end, "admin")

QBCore.Commands.Add("stress", Lang:t("commands.remove_stress"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:RemoveStress", src)
end, "admin")

QBCore.Commands.Add("needs", Lang:t("commands.relieve_needs"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:RelieveNeeds", src)
end, "admin")

QBCore.Commands.Add("god", Lang:t("commands.toggle_godmode"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:GodMode", src)
end, "admin")

QBCore.Commands.Add("noclip", Lang:t("commands.toggle_noclip"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:ToggleNoClip", src)
end, "admin")

QBCore.Commands.Add("cloak", Lang:t("commands.toggle_cloak"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:Cloak", src)
end, "admin")

QBCore.Commands.Add("godspeed", Lang:t("commands.toggle_increased_movement_speed"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:IncreasedMovementSpeed", src)
end, "admin")

QBCore.Commands.Add("godstam", Lang:t("commands.toggle_unlimited_stamina"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:UnlimitedStamina", src)
end, "admin")

QBCore.Commands.Add("superjump", Lang:t("commands.toggle_superjump"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:SuperJump", src)
end, "admin")

QBCore.Commands.Add("nightv", Lang:t("commands.toggle_nightvision"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:ToggleNightVision", src)
end, "admin")

QBCore.Commands.Add("thermalv", Lang:t("commands.toggle_thermalvision"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:ToggleThermalVision", src)
end, "admin")

QBCore.Commands.Add("cloth", Lang:t("commands.open_clothing_menu"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:OpenClothingMenu", src)
end, "admin")

QBCore.Commands.Add("pedmodel", Lang:t("commands.set_ped_model"), {{name = "model", help = "Name of the model"}}, false, function(source, args)
    local src = source
    local model = args[1]
    TriggerClientEvent("Admin:Client:SetPedModel", src, model)
end, "admin")

QBCore.Commands.Add("ammo", Lang:t("commands.give_ammo"), {{name = "amount", help = "Amount of bullets, for example: 20"}}, false, function(source, args)
    local src = source
    local amount = tonumber(args[1])
    TriggerClientEvent("Admin:Client:GiveAmmo", src, "current", amount)
end, "admin")

QBCore.Commands.Add("fixwep", Lang:t("commands.repair_weapon"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:RepairWeapon", src)
end, "admin")

QBCore.Commands.Add("car", Lang:t("commands.spawn_vehicle"), {{name = "model", help = "Model name of the vehicle"}, {name = "modded", help = "Spawn Modded (true/false)"}, {name = "deletePrevious", help = "Delete Previous Vehicle (true/false)"}}, false, function(source, args)
    local src = source
    local model = args[1]
    local modded = args[2]
    local deletePrevious = args[3]
    TriggerClientEvent("Admin:Client:SpawnVehicle", src, model, modded, deletePrevious)
end, "admin")

QBCore.Commands.Add("spv", "Spawn Personal Vehicle", {{name = "model", help = "Model name of the vehicle"}, {name = "plate", help = "Vehicle Plate"}, {name = "deletePrevious", help = "Delete Previous Vehicle (true/false)"}}, true, function(source, args)
    local src = source
    local model = args[1]
    local plate = args[2]
    local deletePrevious = args[3]
    TriggerClientEvent("Admin:Client:SpawnPersonalVehicle", src, model, plate, deletePrevious)
end, "admin")

QBCore.Commands.Add("setengine", Lang:t("commands.set_engine_audio"), {{name = "model", help = "Model name of the vehicle"}}, true, function(source, args)
    local src = source
    TriggerClientEvent("Admin:Client:SetEngineAudio", src, args[1])
end, "admin")

QBCore.Commands.Add("mod", Lang:t("commands.mod_vehicle"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:MaxModVehicle", src)
end, "admin")

QBCore.Commands.Add("dv", Lang:t("commands.delete_vehicle"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:DeleteVehicle", src)
end, "admin")

QBCore.Commands.Add("vbuy", Lang:t("commands.buy_vehicle"), {}, false, function(source, args)
    local src = source
    TriggerClientEvent("Admin:Client:BuyVehicle", src)
end, "admin")

QBCore.Commands.Add("repair", Lang:t("commands.repair_vehicle"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:RepairVehicle", src)
end, "admin")

QBCore.Commands.Add("fuel", Lang:t("commands.refuel_vehicle"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:RefuelVehicle", src)
end, "admin")

QBCore.Commands.Add("bennys", Lang:t("commands.bennys"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:OpenBennys", src)
end, "admin")

QBCore.Commands.Add("tp", Lang:t("commands.teleport_main"), {{name = "x", help = "X position"}, {name = "y", help = "Y position"}, {name = "z", help = "Z position"}, {name = "keepVehicle", help = "Keep vehicle or not (true/false)"}}, true, function(source, args)
    local src = source
    local coords = {
        x = tonumber(args[1]),
        y = tonumber(args[2]),
        z = tonumber(args[3])
    }
    local keepVehicle = args[4]
    TriggerClientEvent("Admin:Client:TeleportCoords", src, coords, keepVehicle)
end, "admin")

QBCore.Commands.Add("tpv", Lang:t("commands.warp_to_vehicle"), {}, true, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:WarpToVehicle", src)
end, "admin")

QBCore.Commands.Add("tpl", Lang:t("commands.teleport_location"), {{name = "location", help = "Location name"}, {name = "keepVehicle", help = "Keep vehicle or not (true/false)"}}, false, function(source, args)
    local src = source
    local location = tostring(args[1])
    local keepVehicle = args[2]
    TriggerClientEvent("Admin:Client:TeleportLocation", src, location, keepVehicle)
end, "admin")

QBCore.Commands.Add("tps", Lang:t("commands.teleport_saved_position"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:TeleportSavedPosition", src)
end, "admin")

QBCore.Commands.Add("tpm", Lang:t("commands.teleport_marker"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:TeleportMarker", src)
end, "admin")

QBCore.Commands.Add("savepos", Lang:t("commands.save_position"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:SavePosition", src)
end, "admin")

QBCore.Commands.Add("timecycle", Lang:t("commands.set_timecycle"), {{name = "timecycle", help = "Timecycle name"}, {name = "timecycle strength", help = "Timecycle Strength value"}}, false, function(source, args)
    local src = source
    local timecycle = tostring(args[1])
    local strength = args[2]
    TriggerClientEvent("Admin:Client:SetTimecycle", src, timecycle, strength)
end, "admin")

QBCore.Commands.Add("cleartc", Lang:t("commands.clear_timecycle"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:ClearTimecycle", src)
end, "admin")

QBCore.Commands.Add("spawnobject", Lang:t("commands.spawn_object"), {{name = "object", help = "Object name"}}, true, function(source, args)
    local src = source
    local object = tostring(args[1])
    TriggerClientEvent("Admin:Client:SpawnObject", src, object)
end, "admin")

QBCore.Commands.Add("revive", Lang:t("commands.revive_target"), {{name = "id", help = "Target ID"}}, false, function(source, args)
    local src = source
    local target = args[1]
    TriggerEvent("Admin:Server:ReviveTarget", target)
end, "admin")

QBCore.Commands.Add("revive-r", Lang:t("commands.revive_radius"), {}, false, function(source)
    local src = source
    TriggerEvent("Admin:Server:ReviveRadius")
end, "admin")

QBCore.Commands.Add("kill", Lang:t("commands.kill_target"), {{name = "id", help = "Target ID"}}, false, function(source, args)
    local src = source
    local target = args[1]
    TriggerEvent("Admin:Server:KillTarget", target)
end, "god")

QBCore.Commands.Add("killradius", "Kill Players in radius", {}, false, function(source)
    TriggerEvent("Admin:Server:KillRadius")
end, "god")

QBCore.Commands.Add("freeze", Lang:t("commands.freeze_target"), {{name = "id", help = "Target ID"}}, false, function(source, args)
    local src = source
    local target = args[1]
    TriggerEvent("Admin:Server:FreezeTarget", target)
end, "admin")

QBCore.Commands.Add("bring", "Bring player to you", {{name = "id", help = "Target ID"}}, false, function(source, args)
    local target = args[1]
    TriggerEvent("Admin:Server:BringTarget", target)
end, "admin")

QBCore.Commands.Add("goto", "Teleport to player", {{name = "id", help = "Target ID"}}, false, function(source, args)
    local target = args[1]
    TriggerEvent("Admin:Server:GotoTarget", target)
end, "admin")

QBCore.Commands.Add("gotov", "Go to Target Vehicle", {{name = "id", help = "Target ID"}}, false, function(source, args)
    local src = source
    local target = args[1]
    TriggerEvent("Admin:Server:GotoTargetVehicle", target)
end, "admin")

QBCore.Commands.Add("givecloth", Lang:t("commands.give_clothing_menu"), {{name = "id", help = "Target ID"}}, false, function(target, args)
    local target = args[1]
    TriggerEvent("Admin:Server:GiveClothingMenu", target)
end, "admin")

QBCore.Commands.Add("warn", Lang:t("commands.warn_target"), {{name = "id", help = "Target ID"}, {name = "Reason", help = "Reason"}}, true, function(source, args)
    local targetPlayer = QBCore.Functions.GetPlayer(tonumber(args[1]))
    local senderPlayer = QBCore.Functions.GetPlayer(source)
    table.remove(args, 1)
    local msg = table.concat(args, " ")
    local myName = senderPlayer.PlayerData.name
    local warnId = "WARN-"..math.random(1111, 9999)
    if targetPlayer ~= nil then
		TriggerClientEvent("chat:addMessage", targetPlayer.PlayerData.source, { args = { "SYSTEM", Lang:t("info.warning_chat_message")..GetPlayerName(source).."," .. Lang:t("info.reason") .. ": "..msg }, color = 255, 0, 0 })
		TriggerClientEvent("chat:addMessage", source, { args = { "SYSTEM", Lang:t("info.warning_staff_message")..GetPlayerName(targetPlayer.PlayerData.source)..", for: "..msg }, color = 255, 0, 0 })
        MySQL.Async.insert("INSERT INTO player_warns (senderIdentifier, targetIdentifier, reason, warnId) VALUES (?, ?, ?, ?)", {
            senderPlayer.PlayerData.license,
            targetPlayer.PlayerData.license,
            msg,
            warnId
        })
    else
        QBCore.Functions.Notify(source, Lang:t("error.not_online"), "error")
    end
end, "admin")

QBCore.Commands.Add("kick", Lang:t("commands.kick_target"), {{name = "id", help = "Target ID"}, {name = "reason", help = "Reason"}}, false, function(args)
    local src = source
    local target = args[1]
    local reason = args[2]
    TriggerEvent("Admin:Server:KickTarget", target, reason)
end, "admin")

QBCore.Commands.Add("kickall", Lang:t("commands.kick_all"), {{name = "reason", help = "Reason"}}, false, function(source, args)
    local src = source
    if src > 0 then
        local reason = args[1]
        if QBCore.Functions.HasPermission(src, "god") or IsPlayerAceAllowed(src, "command") then
            if reason and reason ~= "" then
                for k, v in pairs(QBCore.Functions.GetPlayers()) do
                    local Player = QBCore.Functions.GetPlayer(v)
                    if Player then
                        DropPlayer(Player.PlayerData.source, reason)
                    end
                end
            else
                QBCore.Functions.Notify(src, Lang:t("info.no_reason_specified"), "error")
            end
        end
    else
        for k, v in pairs(QBCore.Functions.GetPlayers()) do
            local Player = QBCore.Functions.GetPlayer(v)
            if Player then
                DropPlayer(Player.PlayerData.source, Lang:t("info.server_restart") .. QBCore.Config.Server.discord)
            end
        end
    end
end, "god")

QBCore.Commands.Add("ban", Lang:t("commands.ban_target"), {{name = "id", help = "Target ID"}, {name = "length", help = "Length"}, {name = "reason", help = "Reason"}}, false, function(target, reason, args)
    local target = args[1]
    local length = args[2]
    local reason = args[3]
    TriggerEvent("Admin:Server:BanTarget", target, length, reason)
end, "admin")

QBCore.Commands.Add("dev", Lang:t("commands.toggle_dev_mode"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:DevMode", src)
end, "admin")

QBCore.Commands.Add("peds", Lang:t("commands.toggle_peds"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:DisablePeds", src)
end, "admin")

QBCore.Commands.Add("coords", Lang:t("commands.display_current_coords"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:ToggleCoordinates", src)
end, "admin")

QBCore.Commands.Add("names", Lang:t("commands.display_player_names"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:TogglePlayerNames", src)
end, "admin")

QBCore.Commands.Add("blips", Lang:t("commands.display_player_blips"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:TogglePlayerBlips", src)
end, "admin")

QBCore.Commands.Add("vdev", Lang:t("commands.toggle_vehicle_dev_mode"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:VehicleDevMode", src)
end, "admin")

QBCore.Commands.Add("lazer", Lang:t("commands.toggle_delete_lazer"), {}, false, function(source)
    local src = source
    TriggerClientEvent("Admin:Client:ToggleDeleteLazer", src)
end, "admin")
