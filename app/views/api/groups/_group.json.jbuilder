json.extract! group, :id, :owner_id, :title, :location, :description, :member_name
membership = current_user.group_memberships.find_by(group_id: group.id)
if membership
  json.membership membership, :id, :user_id
end
json.jumbo_pic group.jumbo_pic if group.jumbo_pic
json.profile_pic group.profile_pic if group.profile_pic
json.owned group.owner_id == current_user.id
