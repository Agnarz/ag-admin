lib.callback.register('ag:getTargets', function()
    local targets = GetPlayers()

    for i, v in ipairs(targets) do
        local target = {
            label = ('(%s) %s'):format(v, GetPlayerName(v)),
            value = v
        }
        targets[i] = target
    end

    return targets
end)

lib.callback.register('ag:getPlayers', function()
    local players = GetPlayers()

    for i, v in ipairs(players) do
        players[i] = {
            source = v,
            label = ('(%s) %s'):format(v, GetPlayerName(v)),
            headshot = lib.callback.await('ag:GetPedheadshotTxdString', source, v)
        }
    end

    return players
end)

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
