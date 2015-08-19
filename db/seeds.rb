# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
bowser = User.create(username: "bowser", password: "bowser", location: "Mushroom Kingdom")

users = [];
10.times do
  users << User.create!(username: Faker::Internet.user_name,
                       password: Faker::Internet.password(6),
                       location: "Mushroom kingdom");
end

bowser_army = bowser.owned_groups.create!(title: "BOWSER'S ARMY",
                     description: "It's the koopa king's army!",
                     location: "Mushroom Kingdom",
                     member_name: "koopas",
                     profile_id: 1,
                     jumbo_id: 1)

GroupMembership.create!(user_id: 1, group_id: 1)

Image.create!(imageable_type: "Thing", imageable_id: 1, image_url: "http://res.cloudinary.com/dj7rafx1m/image/upload/v1440006093/gqszmwaqb97woi5r7zvj.png")
Image.create!(imageable_type: "Group", imageable_id: 1, image_url: "http://res.cloudinary.com/dj7rafx1m/image/upload/v1439975662/pjisx6ueuskryzcycumc.jpg")

bowser_army.events.create!(title: "Kidnap Peach",
                          location: "Peach's castle",
                          description: "Stealth raid to take Princess Peach from her castle.",
                          date: Time.now,
                          organizer_id: 1)

EventAttendee.create!(user_id: 1, event_id: 1);
