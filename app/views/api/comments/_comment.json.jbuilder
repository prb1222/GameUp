json.extract! comment, :id, :event_id, :user_id, :body, :created_at
json.user do
  json.username comment.user.username
end
