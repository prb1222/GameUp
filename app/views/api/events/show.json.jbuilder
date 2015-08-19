json.partial! 'api/events/event', event: @event
json.organizername @event.organizer.username
json.attending_event @event.attendees.include?(current_user)
json.comments @event.comments unless @event.comments.empty?
json.groupmembername @event.group.member_name.html_safe
json.groupname @event.group.title.html_safe
