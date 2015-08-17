json.extract! event, :id, :group_id, :title, :description, :date, :location, :organizer_id
attendee = current_user.event_attendees.find_by(event_id: event.id)
if attendee
  json.attendee_id attendee.id
end
json.organizer event.organizer_id == current_user.id
json.comments event.comments unless event.comments.empty?
json.attendees event.attendees unless event.attendees.empty?
