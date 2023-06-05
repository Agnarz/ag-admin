local Translations = {
  error = {
      ["inside_veh_req"] = "You must be in a vehicle!",
      ["failed_vehicle_owner"] = "This vehicle is already yours..",
      ["no_store_vehicle_garage"] = "You cant store this vehicle in your garage..",
      ["inside_veh_mod_req"] = "You must be in a vehicle to Mod it!",
      ["inside_veh_buy_req"] = "You must be in a vehicle to Buy it!",
      ["inside_veh_repair_req"] = "You must be in a vehicle to Repair it!",
      ["inside_veh_refuel_req"] = "You must be in a vehicle to Refuel it!",
      ["no_weapon"] = "You dont have a weapon in your hands..",
      ["teleport_invalid_location"] = "Invalid location!",
      ["invalid_ped_model"] = "Invalid ped model!",
      ["peds_disabled"] = "Peds disabled!",
      ["blips_deactivated"] = "Blips deactivated!",
      ["names_deactivated"] = "Names deactivated!",
  },
  success = {
      ["success_vehicle_owner"] = "The vehicle is now yours!",
      ["noclip_enabled"] = "No-clip enabled",
      ["noclip_disabled"] = "No-clip disabled",
  },
  info = {
      ["remove_stress"] = "Stress removed!",
      ["relieve_needs"] = "Thirst and Hunger relieved!",
      ["modded_veh"] = "Vehicle modded!",
      ["engine_audio_changed"] = "Engine Audio changed!",
      ["repaired_veh"] = "Vehicle repaired!",
      ["refueled_veh"] = "Vehicle refueled!",
      ["repaired_weapon"] = "Weapon repaired!",
      ["ammo_for_weapon"] = "+%{value} Ammo for the %{weapon}",
      ["peds_enabled"] = "Peds enabled!",
      ["ped_coords"] = "Ped Coordinates:",
      ["blips_activated"] = "Blips activated!",
      ["names_activated"] = "Names activated!",
      ["props_cleared"] = "Props cleared!",
      -- Veh Dev mode
      ["vehicle_dev_data"] = "Vehicle Developer Data:",
      ["ent_id"] = "Entity ID:",
      ["net_id"] = "Net ID:",
      ["model"] = "Model",
      ["hash"] = "Hash",
      ["eng_health"] = "Engine Health:",
      ["body_health"] = "Body Health:",
      --Delete Lazer
      ["obj"] = "Obj",

      ["delete_player_warning"] = "Delete Players Warnings (Admin Only)",
      ["warning_chat_message"] = "^8WARNING ^7 You have been warned by ",
      ["warning_staff_message"] = "^8WARNING ^7 You have warned ",
      ["reason"] = "",
      ["delete_object_info"] = "If you want to delete the object click on ~g~E",
      ["banned"] = "You have been banned:",
      ["ban_expires"] = "\n\nBan expires: ",


  },
  commands = {
      ["revive_self"] = "Revive self (Admin Only)",
      ["give_armor"] = "Give self armor (Admin Only)",
      ["remove_stress"] = "Remove all stress (Admin Only)",
      ["relieve_needs"] = "Relieve needs (Admin Only)",
      ["toggle_godmode"] = "Toggle GodMode (Admin Only)",
      ["toggle_noclip"] = "Toggle NoClip (Admin Only)",
      ["toggle_cloak"] = "Toggle Cloak (Admin Only)",
      ["toggle_increased_movement_speed"] = "Increase your run speed (Admin Only)",
      ["toggle_unlimited_stamina"] = "Increase your stamina (Admin Only)",
      ["toggle_superjump"] = "Toggle Superjump (Admin Only)",
      ["toggle_nightvision"] = "Toggle Night Vision (Admin Only)",
      ["toggle_thermalvision"] = "Toggle Thermal Vision (Admin Only)",
      ["open_clothing_menu"] = "Open Clothing Menu (Admin Only)",
      ["set_ped_model"] = "Change Ped Model (Admin Only)",

      ["give_ammo"] = "Give ammo to your current weapon (Admin Only)",
      ["repair_weapon"] = "Repair your current weapon (Admin Only)",

      ["spawn_vehicle"] = "Spawn Vehicle (Admin Only)",
      ["set_engine_audio"] = "Change your engine audio (Admin Only)",
      ["mod_vehicle"] = "Mod Vehicle with max performance upgrades (Admin Only)",
      ["delete_vehicle"] = "Delete Vehicle (Admin Only)",
      ["buy_vehicle"] = "Save your current vehicle to garage (Admin Only)",
      ["repair_vehicle"] = "Repair Vehicle (Admin Only)",
      ["refuel_vehicle"] = "Refuel Vehicle (Admin Only)",
      ["warp_to_vehicle"] = "Warp to last vehicle (Admin Only)",
      ["open_bennys"] = "Open Bennys Menu (Admin Only)",



      ["teleport_location"] = "Teleport to location (Admin Only)",
      ["teleport_main"] = "Teleport to coords (Admin Only)",
      ["teleport_marker"] = "Teleport to marker (Admin Only)",

      ["set_timecycle"] = "Set Timecycle (Admin Only)",
      ["clear_timecycle"] = "Clear Timecycle (Admin Only)",
      ["spawn_object"] = "Spawn Object (Admin Only)",
      ["revive_target"] = "Revive target player (Admin Only)",
      ["kill_target"] = "Kill target player (Admin Only)",
      ["freeze_target"] = "Freeze target player (Admin Only)",
      ["give_clothing_menu"] = "Give clothing menu to target player (Admin Only)",

      ["warn_target"] = "Warn target player (God Only)",
      ["check_player_warning"] = "Check Player Warnings (Admin Only)",

      ["kick_target"] = "Kick target player (Admin Only)",
      ["kick_all"] = "Kick all players (God Only)",

      ["toggle_dev_mode"] = "Toggle Dev Mode (Admin Only)",
      ["toggle_peds"] = "Toggle AI (Admin Only)",
      ["display_current_coords"] = "Display current coords (Admin Only)",
      ["display_player_names"] = "Display player names over head (Admin Only)",
      ["display_player_blips"] = "Display blips for players (Admin Only)",
      ["toggle_vehicle_dev_mode"] = "Toggle Vehicle Dev Mode (Admin Only)",
      ["toggle_delete_lazer"] = "Toggle Delete Lazer (Admin Only)",
      ["set_vehicle_plate"] = "Set Vehicle Plate (Admin Only)",
      ["revive_radius"] = "Revive players in radius (Admin Only)",
      ["ban_target"] = " Ban target player (Admin Only)",
  }
}

Lang = Locale:new({
  phrases = Translations,
  warnOnMissing = true
})