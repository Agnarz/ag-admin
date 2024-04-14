Framework = nil

if GetResourceState("qb-core") == "started" then
  Framework = "qb"
end

---Formats a number into a string with commas for thousands and a decimal point for the last three digits.
---@param number any
---@return string
function FormatMoney(number)
  local _, _, minus, int, fraction = tostring(number):find("([-]?)(%d+)([.]?%d*)")
  int = int:reverse():gsub("(%d%d%d)", "%1,")
  return minus .. int:reverse():gsub("^,", "") .. fraction
end

---@param number any
---@return string
function FormatPhoneNumber(number)
  local phoneString = tostring(number)
  local formattedNumber = phoneString:gsub("(%d%d%d)(%d%d%d)(%d%d%d%d)", "(%1) %2-%3")
  return formattedNumber
end
