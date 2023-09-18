lib.callback.register('ag:getTargets', function()
    local targets = GetPlayers()

    for i, v in ipairs(targets) do
        local target = {
            label = "(" .. v .. ") " .. GetPlayerName(v),
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
            label = "(" .. v .. ") " .. GetPlayerName(v),
            license = GetPlayerIdentifierByType(v, 'license'),
        }
    end

    return players
end)

