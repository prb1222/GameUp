# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
bowser = User.create(username: "bowser", password: "bowser", location: "Mushroom Kingdom")

users = [];
10.times do |i|
  users << User.create(username: Faker::Internet.user_name,
                       password: Faker::Internet.password(6))
end

bowser_army = bowser.groups.create(title: "BOWSER'S ARMY",
                     description: "It's the koopa king's army!",
                     location: "Mushroom Kingdom",
                     member_name: "koopas",
                     owner_id: 1,
                     profile_id: 1)

GroupMembership.create(user_id: 1, group_id: 1) # Ask about association data and how to seed it

Image.create(imageable_type: "Group", imageable_id: 1, image_url: "http://res.cloudinary.com/dj7rafx1m/image/upload/v1439854666/default-image.png.png")
# bowser_army.events.create(title: "Kidnap Peach",
#                           location: "Peach's castle",
#                           description: "Stealth raid to take Princess Peach from her castle.",
#                           group_id: 1)
