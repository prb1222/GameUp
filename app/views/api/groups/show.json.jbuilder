json.partial! 'api/groups/group', group: @group
json.events do
  json.partial! 'api/events/event', collection: @group.events, as: :event
end
json.members do
  json.partial! 'api/users/user', collection: @group.members, as: :user
end
json.images do
  json.partial! 'api/images/image', collection: @group.images, as: :image
end
json.owner @group.owner.username
