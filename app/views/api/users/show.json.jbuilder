json.partial! 'api/users/user', user: @user
json.groups @user.groups
json.image @user.image if @user.image
json.is_user @user.id == current_user.id
json.genres do
  json.partial! 'api/genres/genre', collection: @user.genres, as: :genre
end
