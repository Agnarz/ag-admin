local Resource = GetCurrentResourceName()

local godMode = false
local noClip = false
local cloak = false
local superjump = false
local increasedSpeed = false
local infiniteStamina = false
local nightVision = false
local thermalVision = false
local customWheels = false

local function indexOf(t, v)
    for i = 1, #t do
        if t[i].value == v then
            return t[i]
        end
    end
    return nil
end

local function round(num, numDecimalPlaces)
    local mult = 10 ^ (numDecimalPlaces or 0)
    return math.floor(num * mult + 0.5) / mult
end

RegisterCommand('armour', function()
    SetPedArmour(cache.ped, 100)
end)

RegisterCommand('godmode', function()
    godMode = not godMode
    updateMenu('setActive:godmode', godMode)
    if godMode then
        while godMode do
            SetPlayerInvincible(cache.playerId, true)
            Wait(0)
        end
        SetPlayerInvincible(cache.playerId, false)
    end
end)

RegisterCommand('noclip', function()
    noClip = not noClip
    updateMenu('setActive:noclip', noClip)
    --freecam?
end)

RegisterCommand('cloak', function()
    cloak = not cloak
    updateMenu('setActive:cloak', cloak)
    if cloak then
        Wait(0)
        cloak = true
        SetEntityVisible(cache.ped, false, 0)
    else
        cloak = false
        SetEntityVisible(cache.ped, true, 0)
    end
end)

RegisterCommand('godstam', function()
    infiniteStamina = not infiniteStamina
    updateMenu('setActive:godstam', infiniteStamina)
    if infiniteStamina then
        CreateThread(function()
            while infiniteStamina do
                RestorePlayerStamina(cache.playerId, 1.0)
                Wait(0)
            end
        end)
    else
        infiniteStamina = false
    end
end)

RegisterCommand('godspeed', function()
    increasedSpeed = not increasedSpeed
    updateMenu('setActive:godspeed', increasedSpeed)
    if increasedSpeed then
        while increasedSpeed do
            Wait(0)
            SetRunSprintMultiplierForPlayer(cache.playerId, 1.49)
            SetSwimMultiplierForPlayer(cache.playerId, 1.49)
        end
        SetRunSprintMultiplierForPlayer(cache.playerId, 1.0)
        SetSwimMultiplierForPlayer(cache.playerId, 1.0)
    end
end)

RegisterCommand('superjump', function()
    superjump = not superjump
    updateMenu('setActive:superjump', superjump)
    if superjump then
        CreateThread(function()
            while superjump do
                Wait(0)
                SetSuperJumpThisFrame(cache.playerId)
            end
        end)
    else
        superjump = false
    end
end)

RegisterCommand('nightv', function()
    nightVision = not nightVision
    updateMenu('setActive:nightv', nightVision)
    if nightVision then
        while nightVision do
            Wait(0)
            SetNightvision(true)
        end
        SetNightvision(false)
    end
end)

RegisterCommand('thermalv', function()
    thermalVision = not thermalVision
    updateMenu('setActive:thermalv', thermalVision)
    if thermalVision then
        while thermalVision do
            Wait(0)
            SetSeethrough(true)
        end
        SetSeethrough(false)
    end
end)

RegisterNetEvent('ag:setPedModel', function(model)
    local health = GetEntityHealth(cache.ped)
    local armour = GetPedArmour(cache.ped)
    lib.requestModel(model)

    SetPlayerModel(cache.playerId, model)
    SetPedComponentVariation(cache.ped, 0, 0, 0, 2)
    SetEntityMaxHealth(cache.ped, 200)
    SetPlayerMaxArmour(cache.playerId, 100)

    Wait(100)

    SetEntityHealth(cache.ped, health)
    SetPedArmour(cache.ped, armour)
end)

RegisterCommand('mod', function()
    local vehicle = GetVehiclePedIsIn(cache.ped, false)
    local props = {
        modFrame = 1,
        modTurbo = true,
        modXenon = true,
        wheelColor = 0,
        modFrontWheels = 20,
        wheels = 11,
        windowTint = 1
    }
    lib.setVehicleProperties(vehicle, props)
    local performanceMods = { 4, 11, 12, 13, 15, 16 }
    customWheels = customWheels or false
    if DoesEntityExist(vehicle) and IsEntityAVehicle(vehicle) then
        SetVehicleModKit(vehicle, 0)
        local max
        for _, modType in ipairs(performanceMods) do
            max = GetNumVehicleMods(vehicle, tonumber(modType)) - 1
            SetVehicleMod(vehicle, modType, max, customWheels)
        end
    end
end)

RegisterCommand('engineaudio', function(_, args)
    local veh = GetVehiclePedIsIn(cache.ped, false)
    if veh == 0 then return end
    local model = args[1]
    if model == 'reset' then
        model = veh
    end
    if model then
        ForceVehicleEngineAudio(veh, model)
    end
end)

RegisterCommand('tpc', function(_, args)
    local x = tonumber(args[1])
    local y = tonumber(args[2])
    local z = tonumber(args[3])
    local keepVehicle = args[4] == 'true' and true or false
    if x and y and z then
        if keepVehicle == false then
            SetEntityCoords(cache.ped, x, y, z)
        else
            SetPedCoordsKeepVehicle(cache.ped, x, y, z)
        end
    else
        error('Invalid coordinates provided')
    end
end)

RegisterCommand('tpl', function(_, args)
    local loc = indexOf(teleports, args[1])
    local keepVehicle = args[2] == 'true' and true or false
    if loc ~= nil then
        local coords = loc.coords
        if keepVehicle == false or loc.type == 'inside' then
            SetEntityCoords(cache.ped, coords.x, coords.y, coords.z)
        else
            SetPedCoordsKeepVehicle(cache.ped, coords.x, coords.y, coords.z)
        end
    else
        error('Location not found')
    end
end)

RegisterCommand('tpv', function()
    local veh = GetVehiclePedIsIn(cache.ped, true)
    if veh == 0 then return end
    TaskWarpPedIntoVehicle(cache.ped, veh, -1)
end)

RegisterCommand('timecycle', function(_, args)
    local timecycle = args[1]
    local strength = args[2]
    if timecycle ~= 'clear' then
        SetTimecycleModifier(timecycle)
        SetTimecycleModifierStrength(tonumber(strength))
    else
        SetTimecycleModifier('default')
    end
end)

RegisterCommand('copycoords', function (_, args)
    if args[1] == 'vec3' then
        lib.setClipboard(('%s %s %s'):format(
            round(GetEntityCoords(cache.ped).x, 3),
            round(GetEntityCoords(cache.ped).y, 3),
            round(GetEntityCoords(cache.ped).z, 3)
        ))
    elseif args[1] == 'vec4' then
        lib.setClipboard(('%s %s %s %s'):format(
            round(GetEntityCoords(cache.ped).x, 3),
            round(GetEntityCoords(cache.ped).y, 3),
            round(GetEntityCoords(cache.ped).z, 3),
            round(GetEntityHeading(cache.ped), 3)
        ))
    end
end)

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == Resource then
        SetPlayerInvincible(cache.playerId, false)
        SetRunSprintMultiplierForPlayer(cache.playerId, 1.0)
        SetSwimMultiplierForPlayer(cache.playerId, 1.0)
        SetEntityVisible(cache.ped, true, true)
        SetNightvision(false)
        SetSeethrough(false)
        SetTimecycleModifier('default')
    end
end)
