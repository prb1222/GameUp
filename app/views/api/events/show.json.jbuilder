json.extract! @event, :id, :group_id, :title, :description, :location, :date
json.group do
  json.partial! 'api/groups/group', group: @event.group
end
json.organizername @event.organizer.username
