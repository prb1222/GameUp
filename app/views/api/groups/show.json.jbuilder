json.extract! @group, :id, :owner_id, :title, :location, :description, :member_name
json.events do
  json.partial! 'api/events/event', collection: @group.events, as: :event
end
json.owned @group.owner_id == current_user.id
json.member @group.members.include?(current_user)
