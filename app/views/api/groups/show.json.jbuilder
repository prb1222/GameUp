json.partial! 'api/groups/group', group: @group
unless @group.events.empty?
  json.events do
    json.partial! 'api/events/event', collection: @group.events, as: :event
  end
end
json.members do
  json.partial! 'api/users/user', collection: @group.members, as: :user
end
unless @group.images.empty?
  json.images do
    json.partial! 'api/images/image', collection: @group.images, as: :image
  end
end
json.owner @group.owner.username
