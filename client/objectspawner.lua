local ResourceName = GetCurrentResourceName()
local RegisterNetEvent = RegisterNetEvent
local AddEventHandler = AddEventHandler
local CreateThread = CreateThread
local Wait = Wait
local tableInsert = table.insert

local previewObject = nil -- variable to store the preview object
local spawnedObjects = {} -- table to store all spawned objects

-- function to preview the object before spawning it
function PreviewObject(hash)
    local model = GetHashKey(hash)
    if not IsModelInCdimage(model) then return end
    local ped = PlayerPedId()
    local heading = GetEntityHeading(ped)
    RequestModel(model)
    while not HasModelLoaded(model) do
        Wait(0)
    end
    local objectCoords = GetEntityCoords(ped)
    local object = CreateObject(model, objectCoords.x, objectCoords.y, objectCoords.z, true, false)
    SetEntityHeading(object, heading)
    PlaceObjectOnGroundProperly(object)
    SetEntityCollision(object, false, false)
    SetEntityAlpha(object, 150, false)
    SetModelAsNoLongerNeeded(previewObject)
    previewObject = object
end
RegisterNetEvent("Admin:Client:SpawnObject")
AddEventHandler("Admin:Client:SpawnObject", PreviewObject)

-- function to delete the preview object
function DeletePreviewObject()
    if previewObject ~= nil then
        DeleteEntity(previewObject)
        previewObject = nil
    end
end

-- function to spawn the object and add it to the spawnedObjects table
function PlaceObject()
    SetEntityAlpha(previewObject, 255, false)
    SetEntityCollision(previewObject, true, true)
    tableInsert(spawnedObjects, previewObject)
    previewObject = nil
end

-- function to delete all spawned objects
function DeleteAllSpawned()
    for k, v in pairs(spawnedObjects) do
        DeleteEntity(v)
    end
    spawnedObjects = {}
end

-- function to move the object based on player coords & heading
local function moveObject()
    local ped = PlayerPedId()
    local objectCoords = GetOffsetFromEntityInWorldCoords(ped, 0.0, 2.0, -1.0)
    local heading = GetEntityHeading(previewObject)
    SetEntityCoords(previewObject, objectCoords.x, objectCoords.y, objectCoords.z)
    SetEntityHeading(previewObject, heading)
end

-- function to rotate the object left and right
local function rotateObject(direction)
    local heading = GetEntityHeading(previewObject)
    if direction == "left" then
        heading = heading + 5.0
    elseif direction == "right" then
        heading = heading - 5.0
    end
    SetEntityHeading(previewObject, heading)
end

-- thread to handle the object spawning and controls
CreateThread(function()
    while true do
        if previewObject ~= nil then
            Wait(0)
            moveObject()
            PlaceObjectOnGroundProperly(previewObject)
        else
            Wait(1000)
        end

        -- if key pressed E spawn it
        if IsControlJustPressed(0, 38) then -- E
            if previewObject ~= nil then
                PlaceObject()
                DeletePreviewObject()
            end
        end

        -- if key pressed Q delete it
        if IsControlJustPressed(0, 44) then -- Q
            DeletePreviewObject()
        end

        -- if key pressed num 4 rotate left
        if IsControlJustPressed(0, 108) then -- num 4
            rotateObject("left")
        end

        -- if key pressed num 6 rotate right
        if IsControlJustPressed(0, 110) then -- num 6
            rotateObject("right")
        end

    end
end)

-- event to delete the preview object when the resource stops
AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == ResourceName then
        DeleteEntity(previewObject)
    end
end)
