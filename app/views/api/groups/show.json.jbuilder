json.partial! 'api/groups/group', group: @group
json.events do
  json.partial! 'api/events/event', collection: @group.events, as: :event
end
json.owned @group.owner_id == current_user.id
