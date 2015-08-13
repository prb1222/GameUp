json.extract! group, :id, :owner_id, :title, :location, :description, :member_name
membership = current_user.group_memberships.find_by(group_id: group.id)
if membership
  json.membership_id membership.id
end
json.owned group.owner_id == current_user.id
