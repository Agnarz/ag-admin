local Resource = GetCurrentResourceName()

local godMode = false
local noClip = false
local cloak = false
local superjump = false
local increasedSpeed = false
local infiniteStamina = false
local nightVision = false
local thermalVision = false

RegisterCommand('armour', function()
    SetPedArmour(cache.ped, 100)
end)

RegisterCommand('godmode', function()
    godMode = not godMode
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
    --freecam?
end)

RegisterCommand('cloak', function()
    cloak = not cloak
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
    if thermalVision then
        while thermalVision do
            Wait(0)
            SetSeethrough(true)
        end
        SetSeethrough(false)
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
    end
end)
