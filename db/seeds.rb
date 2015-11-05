# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

GROUP_JUMBO_IMAGES = %w(https://res.cloudinary.com/dj7rafx1m/image/upload/v1440187286/TicketToRide_gossc2.jpg
                          https://res.cloudinary.com/dj7rafx1m/image/upload/v1440187287/store-board-games_full_ijwqqd.png
                          https://res.cloudinary.com/dj7rafx1m/image/upload/v1440187285/pic1461051_md_fxt8ne.jpg
                          https://res.cloudinary.com/dj7rafx1m/image/upload/v1440187289/boardgame_mly5va.jpg
                          https://res.cloudinary.com/dj7rafx1m/image/upload/v1440187286/2014-08-17_19.10.05_z78wc5.jpg
                          https://res.cloudinary.com/dj7rafx1m/image/upload/v1440187286/letihxwigvss3svch8sa_tostd2.png
                          https://res.cloudinary.com/dj7rafx1m/image/upload/v1440187285/18f8lwueguno0jpg_lubnzp.jpg
                          https://res.cloudinary.com/dj7rafx1m/image/upload/v1440187560/vintage-board-game_wqocvx.jpg)

GROUP_PROFILE_IMAGES = %w(https://res.cloudinary.com/dj7rafx1m/image/upload/v1440188090/weird-board-games-from-the-past-6b_iktlip.jpg
                        https://res.cloudinary.com/dj7rafx1m/image/upload/v1440188089/adult-board-games_mptou4.jpg
                        https://res.cloudinary.com/dj7rafx1m/image/upload/v1440188090/600_433579988_lst8vz.jpg
                        https://res.cloudinary.com/dj7rafx1m/image/upload/v1440188089/BoardGames_jifyyx.jpg
                        https://res.cloudinary.com/dj7rafx1m/image/upload/v1440188090/51b84e46-e586-4b72-a25c-2bf7703b5b66-620x372_eovwr3.jpg
                        https://res.cloudinary.com/dj7rafx1m/image/upload/v1440188090/board-games_brzv1w.jpg
                        https://res.cloudinary.com/dj7rafx1m/image/upload/v1440188089/Big-Foot-Vintage-Toy-Archive_afnh9s.jpg
                        https://res.cloudinary.com/dj7rafx1m/image/upload/v1440188362/Funny_Pictures_105511_iifddr.jpg)

BOARD_GAMES = ['Settlers of Catan', 'Chess', 'Candyland', 'Monopoly', 'Cards Against Humanity', 'Twilight Struggle', 'Dominion',
                'Terra Mystica', 'Warhammer 40k', 'Warhammer Fantasy', 'Magic: The Gathering', 'Carcasonne', 'Dungeons and Dragons',
                'Tales of Arabian Nights', 'King of Tokyo', 'Avalon', 'Mafia', 'The Resistance', 'Battlestar: Galactica', '7 Wonders',
                'Pandemic', 'Race for the Galaxy', 'Twilight Imperium', 'Android: Netrunner', 'Arkham Horror', 'Uno', 'Poker',
                'Checkers']

CITIES = ['San Francisco', "New York City", "Philadelphia", "San Diego", "San Jose", "Miami", "Portland", "Olympia", "Washington D.C.","Lose Angeles",
          'Jacksonville', "Orlando", "Helena", "Eugene", "Lincoln", "Savanah","Augusta", "Boston", "Santa Barbera", "Santa Cruz", "Sacramento",
          "Las Vegas", "Houston", "Austin", "Dallas", "Oklahoma City", "Tuscon", "Phoenix", "Santa Fe", "Pierre", "Boise", "Freeze", "Denver",
          "Boulder", "Baton Rouge", "New Orleans", "Frankfurt", "Indianapolis", "Lansing", "Detroit", "Chicago", "Montepelier", "San Antonio",
          "Columbus", "Fort Worth", "Charlotte", "El Paso", "Seattle", "Washington", "Memphis", "Nashville", "Baltimore", "Annapolis", "Louisville",
          "Milwaukee", "Albuquerque", "Fresno", "Sacramento","Long Beach", "Kansas City", "Omaha", "Atlanta", "Raleigh", "Oakland", "Minneapolis",
          "Cleveland", "Tulsa", "Wichita", "Arlington", "Bakersfield", "Tampa", "Aurora", "Honolulu", "Anaheim", "Santa Ana", "Corpus Christi",
          "Riverside", "St. Louis", "Lexington", "Pittsburgh", "Stockton", "Anchorage", "Cincinatti", "Saint Paul", "Greensboro", "Toledo",
          "Newark", "Plano", "Henderson", "Jersey City", "Chula Vista", "Buffalo", "Fort Wayne", "Chandler", "St. Petersburg", "Durham", "Irvine",
          "Madison", "Norfolk", "Lubbock", "Gilbert", "Reno", "Hialeah", "Richmond"]

LOCAL_CITIES = ['San Jose', "San Francisco", "Fresno", "Sacramento", "Long Beach", "Oakland", "Fresno", "Fremont", "Bakersfield", "Santa Ana",
                "Riverside", "Chula Vista", "Stockton", "San Bernadino", "Modesto", "Oxnard", "Fontana"]

GENRE_LIST = ["Strategy", "City-building", "Cooperative", "Card", "Survival", "Competitive", "Dice",
              "Real-time", "Find-the-traitor", "Sports", "Post-apocalyptic", "Puzzle"]

def generate_group_description
  sleep 3
  picker = rand(8)
  attrs = {}
  game = BOARD_GAMES.sample
  location = Geocoder.search(LOCAL_CITIES.sample).first
  attrs[:city] = location.city
  attrs[:state] = location.state_code

  case picker
  when 0
    attrs[:title] = "#{game} Enthusiasts"
    attrs[:description] = "We are afficionados of the game of #{game}. We appreciate players who have a few years experience, and are seeking to take their #{game} game to the next level. We meet regularly on Tuesdays and Thursdays."
    attrs[:member_name] = "Enthused #{game} Players"
  when 1
    attrs[:title] = "Local #{game} Players"
    attrs[:description] = "We are a group local to #{attrs[:city]}, and we are seeking players in our area! We have carpool services available for people who want to participate. We are always seeking newcomers, so feel free to join us any weekend for games and fun times!"
    attrs[:member_name] = "#{game} Players of #{attrs[:city]}"
  when 2
    attrs[:title] = "Elite #{game} Group"
    attrs[:description] = "Are you a hardcore #{game} player? Looking to take your #{game} playing to a whole new level? Current friends holding you back with their mediocre skills? Join us and become a master of #{game}. Experienced, hardcore members only. Please submit an application for approval."
    attrs[:member_name] = "Elite, Turbo, X-TREME #{game} Players"
  when 3
    attrs[:title] = "Lair of the #{game} Players"
    attrs[:description] = "The air in front of your shimmers and shifts to reveal a magnificent crystal castle. Before you the towering pinnacles and massive front gate of the #{game} Citadel awe your feeble imagination. The sunlight refracts and shines in colors beyond mortal comprehension. You desire to gain entrance, but you know not how. Perhaps a simple knock will do?"
    attrs[:member_name] = "Arcane Warlocks of #{game}"
  when 4
    attrs[:title] = "#{game} Theory-crafting Group"
    attrs[:description] = "Interested in the guts and bones of the gameplay? Do you min-max in games where it doesn't even matter? (Who are we kidding, it always matters) Then come join your fellow theory crafters every Sunday and Wednesday! We are located in #{attrs[:city]}, and we are open to all players seeking to learn more about competitive strategies in #{game}."
    attrs[:member_name] = "#{game} Theory Crafters"
  when 5
    attrs[:title] = "#{game} Dungeon"
    attrs[:description] = "A cold wind rises. The hair on your back prickles as your torchlight reveals a dark cavern. Beware, adventurer! You have stumbled upon the dark refuge of the #{game} players. What will your next move be? Will you shy away from haunting call of treasure lurking within? Or will you join our secretive cabal in our twisted machinations... Call Steve to arrange for parking."
    attrs[:member_name] = "Snarks and Grumpkins"
  when 6
    attrs[:title] = "Advanced #{game} Experts"
    attrs[:description] = "We are seeking local players in the #{attrs[:city]} area for advanced #{game} playing. We prefer members with at least a few years experience playing #{game}. We compete regularly in local #{game} tournaments, and we are always seeking to take our game to the next level."
    attrs[:member_name] = "#{game} Experts"
  when 7
    attrs[:title] = "Casual #{game} Division"
    attrs[:description] = "Welcome to our group page! Thanks for visiting! We are a group of #{game} players located in #{attrs[:city]}. We are open to members of all skill levels, with a bit of a preference for newcomers. Don't feel shy in coming by! We feel #{game} should be a fun a experience, and one to be shared by all. We meet every third Thursday of every two months. Bring your own booze!"
    attrs[:member_name] = "#{game} Enjoyers"
  end

  return attrs
end

def generate_event_description(group, user)
  sleep 3
  picker = rand(8)
  attrs = {}
  location = Geocoder.search("#{group.latitude},#{group.longitude}").first
  attrs[:city] = group.city
  attrs[:state] = group.state
  attrs[:address] = location.street_address
  attrs[:date] = Faker::Time.between(Time.now + 1.day, rand(1..60).days.from_now, :all)
  time_string = attrs[:date].strftime('%m/%d/%y')
  attrs[:organizer_id] = user.id

  case picker
  when 0
    attrs[:title] = "Fun night out!"
    attrs[:description] = "We are taking a night out on the town with other members of the group. No board games, just booze and good times! Join us on #{time_string} for some good times at the local pub/alcohol dispensing location."
  when 1
    attrs[:title] = "Game night!"
    attrs[:description] = "Come in for a nice chill gaming session with other local #{group.member_name}. We are bringing the food and other goodies, so just bring yourself. Feel free to invite other friends or bring other board games!"
  when 2
    attrs[:title] = "Strategy discussion"
    attrs[:description] = "We are having a formal sit down event where we will be discussing upcoming strategies to tackle the upcoming SUPER AWESOME LOCAL TOURNEY. All group members are welcome to come, even if you will not be competing. Food and drink will be provided."
  when 3
    attrs[:title] = "Theory-crafting Session"
    attrs[:description] = "We will be busting out the spreadsheets in order to come up with some new stats and strategies for our group. Join us on #{time_string} to get in on all of the actuarial fun!"
  when 4
    attrs[:title] = "Newbie Intro Session"
    attrs[:description] = "New session for intro to intermediate players. Play will go slowly and all questions are welcome to explain the rules. Invite as many people who are interested as possible! We will be going over the rules in addition to some basic strategies."
  when 5
    attrs[:title] = "Local Tournament"
    attrs[:description] = "We will be featuring a local group tournament. All members of the group are welcome to apply. Simply sign up to the event and comment with your intention to compete or spectate."
  when 6
    attrs[:title] = "New Game Night!"
    attrs[:description] = "One of our members just acquired a new game, and we are looking for a group of 6-7 people to join us for a night of testing and exploring. Food and drinks will be provided."
  when 7
    attrs[:title] = "Roleplaying Night"
    attrs[:description] = "Avast, ye scurvy dogs! Y'all be invited to our pirate coven for a night of ale, wenches, and skullduggery. The wine and mutton will be flowing freely. Twenty dubloons to whoever snags the tavern keeps daughter!"
  end

  attrs
end


def generate_genre_description(genre_name)
  attrs = {name: genre_name}

  case genre_name
  when "Strategy"
    attrs[:color] = "255, 0, 71"
    attrs[:fa_icon] = "map-o"
  when "City-building"
    attrs[:color] = "255, 131, 0"
    attrs[:fa_icon] = "bank"
  when "Cooperative"
    attrs[:color] = "255, 255, 102"
    attrs[:fa_icon] = "users"
  when "Card"
    attrs[:color] = "173, 255, 47"
    attrs[:fa_icon] = "square-o"
  when "Survival"
    attrs[:color] = "34, 139, 34"
    attrs[:fa_icon] = "tree"
  when "Competitive"
    attrs[:color] = "127, 255, 212"
    attrs[:fa_icon] = "fighter-jet"
  when "Dice"
    attrs[:color] = "32, 178, 170"
    attrs[:fa_icon] = "cube"
  when "Real-time"
    attrs[:color] = "65, 105, 225"
    attrs[:fa_icon] = "clock-o"
  when "Find-the-traitor"
    attrs[:color] = "106, 90, 205"
    attrs[:fa_icon] = "user-secret"
  when "Sports"
    attrs[:color] = "147, 112, 219"
    attrs[:fa_icon] = "soccer-o"
  when "Post-apocalyptic"
    attrs[:color] = "208, 32, 144"
    attrs[:fa_icon] = "rocket"
  when "Puzzle"
    attrs[:color] = "255, 20, 147"
    attrs[:fa_icon] = "puzzle-piece"
  end

  attrs
end

GENRE_LIST.each do |genre_name|
  Genre.create(generate_genre_description(genre_name))
end

bowser = User.create!(username: "bowser", password: "bowser", location: "San Francisco", bio: "I'm the biggest baddest koopa around! Likes: shells, lava, castles, princesses. Dislikes: plumbers, head injuries, mushrooms.")

bowser.image.update(image_url: Image.bowser_url)

bowser_army = bowser.owned_groups.create!(title: "BOWSER'S ARMY",
                     description: "It's the koopa king's army! We are here to stand for the rights of oppressed koopas and goombas everywhere. The decadent, bourgeois monarchy and its illegitimate leader must be overthrown, and the downtrodden working class will bring prosperity and happiness for all.",
                     city: "San Francisco",
                     state: "CA",
                     member_name: "Koopas",
                     profile_id: 2,
                     jumbo_id: 2)

Image.create!(imageable_type: "Group", imageable_id: 1, image_url: "https://res.cloudinary.com/dj7rafx1m/image/upload/v1440001871/egnuvdh2n0k8aso3bgd0.jpg")

GroupMembership.create!(user_id: 1, group_id: 1)

bowser_army.events.create!(title: "Kidnap Peach",
                          address: "1061 Market Street",
                          city: "San Francisco",
                          state: "CA",
                          description: "Stealth raid to take Princess Peach from her castle.",
                          date: Time.now + 1.day,
                          organizer_id: 1)

EventAttendee.create!(user_id: 1, event_id: 1);


100.times do
  user = User.create!(username: Faker::Internet.user_name,
                       password: Faker::Internet.password(6),
                       location: LOCAL_CITIES.sample,
                       bio: Faker::Lorem.paragraph(4, true, 3));

  user.image.update(image_url: "http://placecorgi.com/#{rand(200..500)}/#{rand(200..500)}")
  if rand(2) > 0
    new_group = user.owned_groups.create!(generate_group_description)
    GroupMembership.create!(user_id: user.id, group_id: new_group.id)
    jumbo_image = Image.create!(imageable_id: new_group.id, imageable_type: "Group", image_url: GROUP_JUMBO_IMAGES.sample)
    profile_image = Image.create!(imageable_id: new_group.id, imageable_type: "Group", image_url: GROUP_PROFILE_IMAGES.sample)
    new_group.update!(jumbo_id: jumbo_image.id, profile_id: profile_image.id)
  end
end

users = User.all
groups = Group.all


100.times do
  group = groups.sample
  user = users.sample
  while group.members.include?(user)
    group = groups.sample
  end
  GroupMembership.create!(user_id: user.id, group_id: group.id)
end

200.times do
  group = groups.sample
  user = group.members.sample
  event = group.events.create!(generate_event_description(group, user))

  EventAttendee.create!(user_id: user.id, event_id: event.id)
end

events = Event.all

500.times do
  group = groups.sample
  while group.events.empty?
    group = groups.sample
  end

  user = group.members.sample
  event = group.events.sample
  while event.attendees.include?(user)
    GroupMembership.create(user_id: users.sample.id, group_id: group.id)
    user = Group.find(group.id).members.sample
  end

  EventAttendee.create!(user_id: user.id, event_id: event.id)
end

1000.times do
  event = events.sample
  user = event.attendees.sample
  Comment.create!(user_id: user.id,
                  event_id: event.id,
                  body: Faker::Lorem.paragraph(2, true, 1))
end

Image.create!(imageable_type: "Thing", imageable_id: 1, image_url: Image.default_group_url)

genres = Genre.all

groups.each do |group|
  counter = (rand(5) + 1)
  counter.times do
    genre = genres.sample
    GenreTagging.create(genre_id: genre.id, taggable_id: group.id, taggable_type: "Group")
  end
end

users.each do |user|
  counter = (rand(5) + 1)
  counter.times do
    genre = genres.sample
    GenreTagging.create(genre_id: genre.id, taggable_id: user.id, taggable_type: "User")
  end
end
