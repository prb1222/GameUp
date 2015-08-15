json.partial! 'api/events/event', event: @event
json.organizername @event.organizer.username
json.attending_event @event.attendees.include?(current_user)
json.comments @event.comments unless @event.comments.empty?
