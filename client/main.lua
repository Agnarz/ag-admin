local QBCore = exports["qb-core"]:GetCoreObject()
local PlayerData = QBCore.Functions.GetPlayerData()
local MenuOpen = false

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
local GetCurrentResourceName = GetCurrentResourceName
local Wait = Wait
local CreateThread = CreateThread

local tonumber = tonumber
local stringUpper = string.upper
local stringFormat = string.format
local tableSort = table.sort

local dev = false
local godMode = false
local noClip = false
local invisible = false
local superjump = false
local increasedSpeed = false
local unlimitedStamina = false
local nightVision = false
local thermalVision = false
local disablePeds = false
local showCoords = false
local showNames = false
local showBlips = false
local vehicleDevMode = false
local deleteLazer = false

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

AddEventHandler("onResourceStart", function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    PlayerData = QBCore.Functions.GetPlayerData()
end)

AddEventHandler("onResourceStop", function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    SetNuiFocus(false, false)
end)

local function Draw2DText(content, font, colour, scale, x, y)
    SetTextFont(font)
    SetTextScale(scale, scale)
    SetTextColour(colour[1],colour[2],colour[3], 255)
    SetTextEntry("STRING")
    SetTextDropShadow(0, 0, 0, 0,255)
    SetTextDropShadow()
    SetTextEdge(4, 0, 0, 0, 255)
    SetTextOutline()
    AddTextComponentString(content)
    DrawText(x, y)
end

local function round(input, decimalPlaces)
    return tonumber(stringFormat("%." .. (decimalPlaces or 0) .. "f", input))
end

local function LoadPlayerModel(skin)
    RequestModel(skin)
    while not HasModelLoaded(skin) do
      Wait(0)
    end
end

local function isPedDrivingAVehicle() -- Checks if the player is in a vehicle and if it"s a car, not a plane, helicopter, bicycle or train
	local ped = PlayerPedId()
	vehicle = GetVehiclePedIsIn(ped, false)
	if IsPedInAnyVehicle(ped, false) then
		-- Check if ped is in driver seat
		if GetPedInVehicleSeat(vehicle, -1) == ped then
			local class = GetVehicleClass(vehicle)
			-- We don"t want planes, helicopters, bicycles and trains
			if class ~= 15 and class ~= 16 and class ~=21 and class ~=13 then
				return true
			end
		end
	end
	return false
end

local resourceList = {} -- Gets all the resources and sends them to the UI
for i = 0, GetNumResources(), 1 do
    local resource_name = GetResourceByFindIndex(i)
    if resource_name and GetResourceState(resource_name) == "started" then
        resourceList[#resourceList+1] = {
            label = resource_name,
            value = resource_name,
        }
        tableSort(resourceList, function(a, b)
            return a.label < b.label
        end)
    end
end

local items = {}
for k, v in pairs(QBCore.Shared.Items) do
    items[#items+1] = {
        label = v.label .. " [" .. v.type .. "]",
        value = v.name
    }
    tableSort(items, function(a, b)
        return a.label < b.label
    end)
end

local weapons = {}
for k, v in pairs(QBCore.Shared.Items) do
    if v.type == "weapon" then
        weapons[#weapons+1] = {label = v.label, value = v.name}
    end
    tableSort(weapons, function(a, b)
        return a.label < b.label
    end)
end

local jobs = {}
for k, v in pairs(QBCore.Shared.Jobs) do
    jobs[#jobs+1] = {
        label = v.label,
        value = k,
        grades = v.grades
    }
    tableSort(jobs, function(a, b)
        return a.label < b.label
    end)
end

function UpdateJobGrades(job) -- Sends the job grades to the UI for the selected job
    if job == nil then
        SendNUIMessage({action = "SetJobGrades", jobGrades = {}})
        return
    end
    local jobGrades = {}
    for k, v in pairs(QBCore.Shared.Jobs[job].grades) do
        jobGrades[#jobGrades+1] = {
            label = k .. " - " .. v.name,
            value = k
        }
        tableSort(jobGrades, function(a, b)
            return a.value < b.value
        end)
    end
    SendNUIMessage({action = "SetJobGrades", jobGrades = jobGrades})
end

local gangs = {}
for k, v in pairs(QBCore.Shared.Gangs) do
    gangs[#gangs+1] = {
        label = v.label,
        value = k,
        grades = v.grades
    }
    tableSort(gangs, function(a, b)
        return a.label < b.label
    end)
end

function UpdateGangGrades(gang) -- Sends the gang grades to the UI for the selected gang
    if gang == nil then
        SendNUIMessage({action = "SetGangGrades", gangGrades = {}})
        return
    end
    local gangGrades = {}
    for k, v in pairs(QBCore.Shared.Gangs[gang].grades) do
        gangGrades[#gangGrades+1] = {
            label = k .. " - " .. v.name,
            value = k
        }
        tableSort(gangGrades, function(a, b)
            return a.value < b.value
        end)
    end
    SendNUIMessage({action = "SetGangGrades", gangGrades = gangGrades})
end

local vehicles = {}
for k, v in pairs(QBCore.Shared.Vehicles) do
    vehicles[#vehicles+1] = {
        label = stringUpper(v.model.." ["..v.category.."]"),
        value = v.model
    }
    tableSort(vehicles, function(a, b)
        return a.label < b.label
    end)
end

local teleports = {}
for k, v in pairs(Config.Locations) do
    teleports[#teleports+1] = {label = k, value = k}
    tableSort(teleports, function(a, b)
        return a.label < b.label
    end)
end

function RefreshData(data) -- Refreshes the data in the UI
    if data == nil then return end
    if data == "commands" then
        QBCore.Functions.TriggerCallback("GetOnlinePlayers", function(result)
            targets = result
        end)
        QBCore.Functions.TriggerCallback("Admin:GetPersonalVehicles", function(result)
            personalVehicles = result
        end)
        Wait(250)
        SendNUIMessage({
            action = "update:options",
            targets = targets,
            playerData = PlayerData,
            items = items,
            jobs = jobs,
            gangs = gangs,
            weapons = weapons,
            vehicles = vehicles,
            personalVehicles = personalVehicles,
            teleports = teleports,
            resources = resourceList
        })
        return
    elseif data == "player" then
        SendNUIMessage({action = "update:player", playerData = PlayerData})
        return
    elseif data == "players" then
        QBCore.Functions.TriggerCallback("GetOnlinePlayers", function(result)
            SendNUIMessage({action = "update:players", players = result})
        end)
        return
    elseif data == "personalVehicles" then
        QBCore.Functions.TriggerCallback("Admin:GetPersonalVehicles", function(result)
            SendNUIMessage({action = "update:personalVehicles", personalVehicles = result})
        end)
        return
    elseif data == "bans" then
        QBCore.Functions.TriggerCallback("GetBannedPlayers", function(result)
            SendNUIMessage({action = "update:bans", bans = result})
        end)
        return
    end
end

local function ToggleMenu(bool)
    if bool then
        MenuOpen = true
        SetNuiFocus(true, true)
        SetCursorLocation(0.9, 0.5)
        SendNUIMessage({action = "open"})
        RefreshData("commands")
    else
        MenuOpen = false
        SetNuiFocus(false, false)
        SendNUIMessage({action = "close"})
    end
end

RegisterCommand("admin", function() ToggleMenu(true) end)
RegisterKeyMapping("admin", "Open admin menu", "keyboard", Config.OpenMenu)
RegisterNUICallback("close", function(_, cb) cb(1) ToggleMenu(false) end)
RegisterNetEvent("Admin:Client:ToggleMenu", function(bool) ToggleMenu(bool) end)

-- Events
RegisterNetEvent("Admin:Client:ReviveSelf", function()
    local ped = PlayerPedId()
    TriggerEvent("hospital:client:Revive", ped)
end)

RegisterNetEvent("Admin:Client:GiveArmor", function()
    local ped = PlayerPedId()
    SetPedArmour(ped, 100)
end)

RegisterNetEvent("Admin:Client:RemoveStress", function()
    TriggerServerEvent("hud:server:RelieveStress", 100)
    QBCore.Functions.Notify(Lang:t("info.remove_stress"))
end)

RegisterNetEvent("Admin:Client:RelieveNeeds", function()
    TriggerServerEvent("QBCore:Server:SetMetaData", "hunger", 100)
    TriggerServerEvent("QBCore:Server:SetMetaData", "thirst", 100)
    QBCore.Functions.Notify(Lang:t("info.relieve_needs"))
end)

RegisterNetEvent("Admin:Client:GodMode", function()
    godMode = not godMode
    local ped = PlayerPedId()
    local player = PlayerId()
    if godMode then
        while godMode do
            Wait(0)
            SetPlayerInvincible(player, true)
        end
        SetPlayerInvincible(player, false)
    end
end)

RegisterNetEvent("Admin:Client:ToggleNoClip", function()
    noClip = not noClip -- triggered in noclip.lua
end)

RegisterNetEvent("Admin:Client:Cloak", function()
    local ped = PlayerPedId()
    if not invisible then
        Wait(0)
        invisible = true
        SetEntityVisible(ped, false, 0)
    else
        invisible = false
        SetEntityVisible(ped, true, 0)
    end
end)

RegisterNetEvent("Admin:Client:UnlimitedStamina", function()
    local player = PlayerId()
    unlimitedStamina = not unlimitedStamina
    if unlimitedStamina then
        CreateThread(function()
            while unlimitedStamina do
                RestorePlayerStamina(player, 1.0)
                Wait(0)
            end
        end)
    else
        unlimitedStamina = false
    end
end)

RegisterNetEvent("Admin:Client:IncreasedMovementSpeed", function()
    local player = PlayerId()
    increasedSpeed = not increasedSpeed
    if increasedSpeed then
        while increasedSpeed do
            Wait(0)
            SetRunSprintMultiplierForPlayer(player, 1.49)
            SetSwimMultiplierForPlayer(player, 1.49)
        end
        SetRunSprintMultiplierForPlayer(player, 1.0)
        SetSwimMultiplierForPlayer(player, 1.0)
    end
end)

RegisterNetEvent("Admin:Client:SuperJump", function()
    superjump = not superjump
    if superjump then
        CreateThread(function()
            while superjump do
                Wait(0)
                SetSuperJumpThisFrame(PlayerId())
            end
        end)
    else
        superjump = false
    end
end)

RegisterNetEvent("Admin:Client:ToggleNightVision", function()
    nightVision = not nightVision
    if nightVision then
        while nightVision do
            Wait(0)
            SetNightvision(true)
        end
        SetNightvision(false)
    end
end)

RegisterNetEvent("Admin:Client:ToggleThermalVision", function()
    thermalVision = not thermalVision
    if thermalVision then
        while thermalVision do
            Wait(0)
            SetSeethrough(true)
        end
        SetSeethrough(false)
    end
end)

RegisterNetEvent('Admin:Client:OpenClothingMenu', function()
    local ped = PlayerPedId()
    ToggleMenu(false)
    TriggerEvent('qb-clothing:client:openMenu', ped)
end)

RegisterNetEvent('Admin:Client:SetPedModel', function(skin)
    local ped = source
    local model = GetHashKey(skin)
    SetEntityInvincible(ped, true)
    if IsModelInCdimage(model) and IsModelValid(model) then
        LoadPlayerModel(model)
        SetPlayerModel(PlayerId(), model)
        if isPedAllowedRandom(skin) then
            SetPedRandomComponentVariation(ped, true)
        end
		SetModelAsNoLongerNeeded(model)
	end
	SetEntityInvincible(ped, false)
end)

RegisterNetEvent("Admin:Client:GiveAmmo", function(weapon, ammo)
    local ped = PlayerPedId()
    if weapon ~= "current" then
        local weapon = weapon:upper()
        SetPedAmmo(ped, GetHashKey(weapon), ammo)
        QBCore.Functions.Notify(Lang:t("info.ammo_for_weapon", {value = ammo, weapon = QBCore.Shared.Weapons[weapon]["label"]}))
    else
        local weapon = GetSelectedPedWeapon(ped)
        if weapon ~= nil then
            SetPedAmmo(ped, weapon, ammo)
            QBCore.Functions.Notify(Lang:t("info.ammo_for_weapon", {value = ammo, weapon = QBCore.Shared.Weapons[weapon]["label"]}))
        else
            QBCore.Functions.Notify(Lang:t("error.no_weapon"), "error")
        end
    end
end)

RegisterNetEvent("Admin:Client:RepairWeapon", function(amount)
    local amount = 100
    TriggerEvent("weapons:client:SetWeaponQuality", amount)
end)

RegisterNetEvent("Admin:Client:SpawnVehicle", function(vehicle, modded, deletePrevious)
    local ped = PlayerPedId()
    local hash = GetHashKey(vehicle)
    local veh = GetVehiclePedIsUsing(ped)
    if not IsModelInCdimage(hash) then return end
    RequestModel(hash)
    while not HasModelLoaded(hash) do
        Wait(0)
    end
    if deletePrevious == true or 'true' then
        DeleteVehicle(veh)
    end
    local vehicle = CreateVehicle(hash, GetEntityCoords(ped), GetEntityHeading(ped), true, false)
    TaskWarpPedIntoVehicle(ped, vehicle, -1)
    SetVehicleModKit(vehicle, 0)
    Wait(250)
    if modded == true or 'true' then
        TriggerEvent("Admin:Client:MaxModVehicle")
    end
    exports["LegacyFuel"]:SetFuel(vehicle, 100.0)
    SetModelAsNoLongerNeeded(hash)
    SetPlayersLastVehicle(vehicle)
    TriggerEvent("vehiclekeys:client:SetOwner", QBCore.Functions.GetPlate(vehicle))
end)

RegisterNetEvent("Admin:Client:SpawnPersonalVehicle", function(vehicle, plate, deletePrevious)
    QBCore.Functions.TriggerCallback("qb-garage:server:GetVehicleProperties", function(properties, plate)
       props = properties
    end, plate)
    Wait(50)
    local ped = PlayerPedId()
    local hash = GetHashKey(vehicle)
    local veh = GetVehiclePedIsUsing(ped)
    if not IsModelInCdimage(hash) then return end
    RequestModel(hash)
    while not HasModelLoaded(hash) do
        Wait(0)
    end
    if deletePrevious == true then
        DeleteVehicle(veh)
    end
    local vehicle = CreateVehicle(hash, GetEntityCoords(ped), GetEntityHeading(ped), true, false)
    TaskWarpPedIntoVehicle(ped, vehicle, -1)
    SetVehicleModKit(vehicle, 0)
    Wait(50)
    QBCore.Functions.SetVehicleProperties(vehicle, props)
    SetVehicleNumberPlateText(vehicle, plate)
    exports["LegacyFuel"]:SetFuel(vehicle, 100.0)
    SetModelAsNoLongerNeeded(hash)
    TriggerEvent("vehiclekeys:client:SetOwner", QBCore.Functions.GetPlate(vehicle))
end)

RegisterNetEvent("Admin:Client:WarpToVehicle", function()
    local ped = PlayerPedId()
    local vehicle = GetVehiclePedIsIn(ped, true)
    TaskWarpPedIntoVehicle(ped, vehicle, -1)
end)

RegisterNetEvent("Admin:Client:DeleteVehicle", function()
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped, true)
    if veh ~= 0 then
        SetEntityAsMissionEntity(veh, true, true)
        DeleteVehicle(veh)
    else
        local pcoords = GetEntityCoords(ped)
        local vehicles = GetGamePool("CVehicle")
        for k, v in pairs(vehicles) do
            if #(pcoords - GetEntityCoords(v)) <= 5.0 then
                SetEntityAsMissionEntity(v, true, true)
                DeleteVehicle(v)
            end
        end
    end
    vehicleDevMode = false
end)

RegisterNetEvent("Admin:Client:SetEngineAudio", function(eng)
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped)
    if isPedDrivingAVehicle() then
		ForceVehicleEngineAudio(veh, eng)
        QBCore.Functions.Notify(Lang:t("info.engine_audio_changed"))
	else
		QBCore.Functions.Notify(Lang:t("error.inside_veh_req"), "error")
	end
end)

RegisterNetEvent("Admin:Client:MaxModVehicle", function()
    local ped = PlayerPedId()
    local vehicle = GetVehiclePedIsIn(ped, false)
    QBCore.Functions.GetVehicleProperties(vehicle)
    local props = {
        modFrame = 1,
        modTurbo = true,
        modXenon = true,
        --wheelColor = 0,
        --modFrontWheels = 20,
        --modBackWheels = 24,
        wheels = 0,
        windowTint = 1
    }
    if isPedDrivingAVehicle() then
        QBCore.Functions.SetVehicleProperties(vehicle, props)
        local performanceMods = { 4, 11, 12, 13, 15, 16, 23 }
        customWheels = customWheels or false
        local max
        for _, modType in ipairs(performanceMods) do
            max = GetNumVehicleMods(vehicle, modType) - 1
            SetVehicleMod(vehicle, modType, max, customWheels)
        end
		QBCore.Functions.Notify(Lang:t("info.modded_veh"))
	else
		QBCore.Functions.Notify(Lang:t("error.inside_veh_mod_req"), "error")
	end
end)

RegisterNetEvent("Admin:Client:BuyVehicle", function()
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped)
    if veh ~= nil and veh ~= 0 then
        local plate = QBCore.Functions.GetPlate(veh)
        local props = QBCore.Functions.GetVehicleProperties(veh)
        local hash = props.model
        local vehname = GetDisplayNameFromVehicleModel(hash):lower()
        if QBCore.Shared.Vehicles[vehname] ~= nil and next(QBCore.Shared.Vehicles[vehname]) ~= nil then
            TriggerServerEvent("Admin:Server:BuyVehicle", props, QBCore.Shared.Vehicles[vehname], GetHashKey(veh), plate)
            Wait(50)
            RefreshData("personalVehicles")
        else
            QBCore.Functions.Notify(Lang:t("error.no_store_vehicle_garage"), "error")
        end
    else
        QBCore.Functions.Notify(Lang:t("error.inside_veh_buy_req"), "error")
    end
end)

RegisterNetEvent("Admin:Client:DeletePersonalVehicle", function(plate)
    TriggerServerEvent("Admin:Server:DeletePersonalVehicle", plate)
    Wait(50)
    RefreshData("personalVehicles")
end)

RegisterNetEvent("Admin:Client:RepairVehicle", function()
    if isPedDrivingAVehicle() then
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped)
		SetVehicleDirtLevel(vehicle)
		SetVehicleUndriveable(vehicle, false)
		WashDecalsFromVehicle(vehicle, 1.0)
		SetVehicleFixed(vehicle)
		SetVehicleEngineOn(vehicle, true, false)
        exports["LegacyFuel"]:SetFuel(vehicle, 100.0)
        QBCore.Functions.Notify(Lang:t("info.repaired_veh"))
		return
	else
		QBCore.Functions.Notify(Lang:t("error.inside_veh_repair_req"), "error")
	end
end)

RegisterNetEvent("Admin:Client:RefuelVehicle", function()
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped)
    if isPedDrivingAVehicle() then
        exports["LegacyFuel"]:SetFuel(veh, 100.0)
		QBCore.Functions.Notify(Lang:t("info.refueled_veh"))
	else
		QBCore.Functions.Notify(Lang:t("error.inside_veh_refuel_req"), "error")
	end
end)

RegisterNetEvent("Admin:Client:OpenBennys", function()
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped)
    if isPedDrivingAVehicle() then
        TriggerEvent("qb-customs:client:EnterCustoms", {
            coords = GetEntityCoords(ped),
            heading = GetEntityHeading(ped),
            categories = {
                repair = true,
                mods = true,
                armor = true,
                respray = true,
                liveries = true,
                wheels = true,
                tint = true,
                plate = true,
                extras = true,
                neons = true,
                xenons = true,
                horn = true,
                turbo = true,
                cosmetics = true,
            }
        })
        ToggleMenu(false)
	else
		QBCore.Functions.Notify(Lang:t("error.inside_veh_req"), "error")
	end
end)

RegisterNetEvent("Admin:Client:TeleportLocation", function(location, keepVehicle)
    local ped = PlayerPedId()
    local loc = Config.Locations[location]
    local coords = loc.coords
    if loc ~= nil then
        if keepVehicle == false or loc.type == "inside" then
            SetEntityCoords(ped, coords.x, coords.y, coords.z)
        else
            if keepVehicle == true then
                SetPedCoordsKeepVehicle(ped, coords.x, coords.y, coords.z)
            end
        end
    else
        QBCore.Functions.Notify(Lang:t("error.teleport_invalid_location"), "error")
    end
end)

RegisterNetEvent("Admin:Client:TeleportCoords", function(coords, keepVehicle)
    local ped = PlayerPedId()
    if keepVehicle then
        SetPedCoordsKeepVehicle(
            ped, tonumber(coords.x), tonumber(coords.y), tonumber(coords.z)
        )
    else
        SetEntityCoords(ped, tonumber(coords.x), tonumber(coords.y), tonumber(coords.z))
        if IsPedInAnyVehicle(ped, true) then
            TriggerEvent("Admin:Client:DeleteVehicle")
        end
    end
    if coords.h ~= nil then
        SetEntityHeading(ped, tonumber(coords.h))
    end
end)

RegisterNetEvent("Admin:Client:TeleportMarker", function()
    local ped = PlayerPedId()
    local blip = GetFirstBlipInfoId(8)
    if DoesBlipExist(blip) then
        local blipCoords = GetBlipCoords(blip)
        for height = 1, 1000 do
            SetPedCoordsKeepVehicle(ped, blipCoords.x, blipCoords.y, height + 0.0)
            local foundGround, zPos = GetGroundZFor_3dCoord(blipCoords.x, blipCoords.y, height + 0.0)
            if foundGround then
                SetPedCoordsKeepVehicle(ped, blipCoords.x, blipCoords.y, height + 0.0)
                break
            end
            Wait(0)
        end
    end
end)

RegisterNetEvent("Admin:Client:SetTimecycle", function(timecycle, strength)
    SetTimecycleModifier(timecycle)
    SetTimecycleModifierStrength(tonumber(strength))
end)

RegisterNetEvent("Admin:Client:SetTimecycleStrength", function(strength)
    SetTimecycleModifierStrength(tonumber(strength))
end)

RegisterNetEvent("Admin:Client:ClearTimecycle", function()
    ClearTimecycleModifier()
    SetTimecycleModifierStrength(0)
    ClearExtraTimecycleModifier()
end)

RegisterNetEvent("Admin:Client:SpectateTarget", function(targetID, coords)
    local src = PlayerPedId()
    local targetplayer = GetPlayerFromServerId(targetID)
    local target = GetPlayerPed(targetplayer)
    if not isSpectating then
        isSpectating = true
        SetEntityVisible(src, false) -- Set invisible
        SetEntityInvincible(src, true) -- set godmode
        lastSpectateCoord = GetEntityCoords(src) -- save my last coords
        SetEntityCoords(src, coords) -- Teleport To Player
        NetworkSetInSpectatorMode(true, target) -- Enter Spectate Mode
    else
        isSpectating = false
        NetworkSetInSpectatorMode(false, target) -- Remove From Spectate Mode
        SetEntityCoords(src, lastSpectateCoord) -- Return Me To My Coords
        SetEntityVisible(src, true) -- Remove invisible
        SetEntityInvincible(src, false) -- Remove godmode
        lastSpectateCoord = nil -- Reset Last Saved Coords
    end
end)

RegisterNetEvent("Admin:Client:OpenTargetInventory", function(target)
    TriggerServerEvent("inventory:server:OpenInventory", "otherplayer", target)
end)

RegisterNetEvent("Admin:Client:DevMode", function()
    local player = PlayerId()
    local ped = PlayerPedId()
    dev = not dev
    TriggerEvent("qb-admin:client:ToggleDevmode")
    if dev then
        godMode = true
        unlimitedStamina = true
        CreateThread(function()
            while dev do
                RestorePlayerStamina(player, 1.0)
                Wait(0)
            end
        end)
        while dev do
            Wait(0)
            SetPlayerInvincible(player, true)
        end
        SetPlayerInvincible(player, false)
        godMode = false
        unlimitedStamina = false
    end
end)

RegisterNetEvent("Admin:Client:DisablePeds", function()
    disablePeds = not disablePeds
    if disablePeds then
        QBCore.Functions.Notify(Lang:t("error.peds_disabled"), "error")
        CreateThread(function()
            while disablePeds do
                SetVehicleDensityMultiplierThisFrame(0.0)
                SetPedDensityMultiplierThisFrame(0.0)
                SetRandomVehicleDensityMultiplierThisFrame(0.0)
                SetParkedVehicleDensityMultiplierThisFrame(0.0)
                SetScenarioPedDensityMultiplierThisFrame(0.0, 0.0)
                SetAmbientVehicleRangeMultiplierThisFrame(0)
                Wait(0)
            end
        end)
    else
        disablePeds = false
        QBCore.Functions.Notify(Lang:t("info.peds_enabled"))
    end
end)

RegisterNetEvent("Admin:Client:ToggleCoordinates", function()
    local x = 0.4
    local y = 0.025
    showCoords = not showCoords
    CreateThread(function()
        while showCoords do
            local coords = GetEntityCoords(PlayerPedId())
            local heading = GetEntityHeading(PlayerPedId())
            local c = {}
            c.x = round(coords.x, 2)
            c.y = round(coords.y, 2)
            c.z = round(coords.z, 2)
            heading = round(heading, 2)
            Wait(0)
            Draw2DText(stringFormat("~w~"..Lang:t("info.ped_coords") .. "~b~ vector4(~w~%s~b~, ~w~%s~b~, ~w~%s~b~, ~w~%s~b~)", c.x, c.y, c.z, heading), 4, {66, 182, 245}, 0.4, x + 0.0, y + 0.0)
        end
    end)
end)

RegisterNetEvent("Admin:Client:TogglePlayerBlips", function()
    showBlips = not showBlips -- triggered in blipnames.lua
end)

RegisterNetEvent("Admin:Client:TogglePlayerNames", function()
    showNames = not showNames -- triggered in blipnames.lua
end)

RegisterNetEvent("Admin:Client:VehicleDevMode", function()
    if isPedDrivingAVehicle() then
        local x = 0.4
        local y = 0.888
        vehicleDevMode = not vehicleDevMode
        CreateThread(function()
            while vehicleDevMode do
                local ped = PlayerPedId()
                Wait(0)
                if IsPedInAnyVehicle(ped, false) then
                    local vehicle = GetVehiclePedIsIn(ped, false)
                    local netID = VehToNet(vehicle)
                    local hash = GetEntityModel(vehicle)
                    local modelName = GetLabelText(GetDisplayNameFromVehicleModel(hash))
                    local eHealth = GetVehicleEngineHealth(vehicle)
                    local bHealth = GetVehicleBodyHealth(vehicle)
                    Draw2DText(Lang:t("info.vehicle_dev_data"), 4, {66, 182, 245}, 0.4, x + 0.0, y + 0.0)
                    Draw2DText(stringFormat(Lang:t("info.ent_id") .. "~b~%s~s~ | " .. Lang:t("info.net_id") .. "~b~%s~s~", vehicle, netID), 4, {255, 255, 255}, 0.4, x + 0.0, y + 0.025)
                    Draw2DText(stringFormat(Lang:t("info.model") .. "~b~%s~s~ | " .. Lang:t("info.hash") .. "~b~%s~s~", modelName, hash), 4, {255, 255, 255}, 0.4, x + 0.0, y + 0.050)
                    Draw2DText(stringFormat(Lang:t("info.eng_health") .. "~b~%s~s~ | " .. Lang:t("info.body_health") .. "~b~%s~s~", round(eHealth, 2), round(bHealth, 2)), 4, {255, 255, 255}, 0.4, x + 0.0, y + 0.075)
                else
                    vehicleDevMode = false
                end
            end
        end)
	else
		QBCore.Functions.Notify(Lang:t("error.inside_veh_req"), "error")
	end
end)

RegisterNetEvent("Admin:Client:ToggleDeleteLazer", function()
    deleteLazer = not deleteLazer -- triggered in deletelazer.lua
end)

local utilities = {}
local function updateUtilities(data)
    local shouldUpdate = false
    for k, v in pairs(data) do
        if utilities[k] ~= v then
            shouldUpdate = true
            break
        end
    end
    utilities = data
    if shouldUpdate then
        SendNUIMessage({
            action = 'utilities',
            dev = data[1],
            godMode = data[2],
            noClip = data[3],
            invisible = data[4],
            superjump = data[5],
            increasedSpeed = data[6],
            unlimitedStamina = data[7],
            nightVision = data[8],
            thermalVision = data[9],
            disablePeds = data[10],
            showCoords = data[11],
            showNames = data[12],
            showBlips = data[13],
            vehicleDevMode = data[14],
            deleteLazer = data[15]
        })
    end
end

CreateThread(function()
    while true do
        Wait(500)
        if MenuOpen then
            updateUtilities({
                dev,
                godMode,
                noClip,
                invisible,
                superjump,
                increasedSpeed,
                unlimitedStamina,
                nightVision,
                thermalVision,
                disablePeds,
                showCoords,
                showNames,
                showBlips,
                vehicleDevMode,
                deleteLazer
            })
        end
    end
end)

RegisterNUICallback("NUIHandler", function(data, cb)
    cb(1)
    local eventType = data[1]
    local eventName = data[2]
    local args = data[3]
    print("NUIHandler: ", eventType, eventName, args)
    if type(args) == "table" then
        for k, v in pairs(args) do
            print(k, v)
        end
    end
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
