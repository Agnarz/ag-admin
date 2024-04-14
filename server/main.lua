if Framework == 'qb' then
    local QBCore = exports['qb-core']:GetCoreObject()

    lib.callback.register('ag:getTargets', function()
        local targets = {}

        for i, v in ipairs(GetPlayers()) do
            local player = QBCore.Functions.GetPlayer(tonumber(v)).PlayerData
            targets[i] = {
                label = ('(%s) %s | %s'):format(v, GetPlayerName(v), player.citizenid),
                value = v
            }
        end

        return targets
    end)

    lib.callback.register('ag:getPlayers', function()
        local players = {}

        for i, v in ipairs(GetPlayers()) do
            local player = QBCore.Functions.GetPlayer(tonumber(v)).PlayerData
            players[i] = {
                source = v,
                label = ('(%s) %s | %s'):format(v, GetPlayerName(v), player.citizenid),
                headshot = lib.callback.await('ag:GetPedheadshotTxdString', source, v),
                framework = {
                    firstname = player.charinfo.firstname,
                    lastname = player.charinfo.lastname,
                    job = player.job.label,
                    jobGrade = ('%s (%s)'):format(player.job.grade.name, player.job.grade.level),
                    gang = player.gang.label,
                    gangGrade = ('%s (%s)'):format(player.gang.grade.name, player.gang.grade.level),
                    cash ='$'..FormatMoney(player.money.cash),
                    bank = '$'..FormatMoney(player.money.bank),

                }
            }
        end

        return players
    end)

    RegisterNetEvent("admin:server:RemoveStress", function(source)
        local Player = QBCore.Functions.GetPlayer(source)
        if Player then
            Player.Functions.SetMetaData("stress", 0)
        end
    end)

    RegisterNetEvent("admin:server:RelieveNeeds", function(source)
        local Player = QBCore.Functions.GetPlayer(source)
        if Player then
            Player.Functions.SetMetaData("hunger", 100)
            Player.Functions.SetMetaData("thirst", 100)
        end
    end)
else -- Fallback to default functions
    lib.callback.register('ag:getTargets', function()
        local targets = {}

        for i, v in ipairs(GetPlayers()) do
            local target = {
                label = ('(%s) %s'):format(v, GetPlayerName(v)),
                value = v
            }
            targets[i] = target
        end

        return targets
    end)

    lib.callback.register('ag:getPlayers', function()
        local players = {}

        for i, v in ipairs(GetPlayers()) do
            players[i] = {
                source = v,
                label = ('(%s) %s'):format(v, GetPlayerName(v)),
                headshot = lib.callback.await('ag:GetPedheadshotTxdString', source, v)
            }
        end

        return players
    end)
end

lib.addCommand('pedmodel', {
    help = 'Change target ped model',
    params = {
        {name = 'model', help = 'The model to change to', type = 'string'},
        {name = 'target', help = 'Target player (not requied)', type = 'number', optional = true},
    },
    restricted = 'group.admin'
}, function(source, args)
    if args.target == nil then
        args.target = source
    end

    TriggerClientEvent('ag:setPedModel', args.target, args.model)
end)

lib.addCommand('giveweapon', {
    help = 'Give a weapon to a player',
    params = {
        {name = 'weapon', help = 'The weapon to give', type = 'string'},
        {name = 'ammo', help = 'The amount of ammo to give', type = 'number', optional = true},
        {name = 'target', help = 'Target player (not requied)', type = 'number', optional = true},
    },
    restricted = 'group.admin'
}, function(source, args)
    if args.target == nil then
        args.target = source
    end
    GiveWeaponToPed(GetPlayerPed(args.target), args.weapon, args.ammo or 1000, false, false)
    SetCurrentPedWeapon(GetPlayerPed(args.target), args.weapon, true)
end)
