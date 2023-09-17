lib.addCommand('admin', {
    help = 'Open Admin Menu',
    restricted = 'group.admin'
}, function(source)
    TriggerClientEvent('admin:toggleMenu', source, true)
end)
