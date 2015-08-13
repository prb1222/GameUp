json.partial! 'api/events/event', event: @event
json.group do
  json.partial! 'api/groups/group', group: @event.group
end
json.organizername @event.organizer.username
json.attending_event @event.attendees.include?(current_user)
