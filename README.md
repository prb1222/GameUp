# Game Up
[Heroku link][heroku]

[heroku]: https://enigmatic-sierra-3429.herokuapp.com
## Minimum Viable Product
GameUp is a board game meet up sign in the vein of MeetUp. My main inspiration for this was highly personal. I have often found myself wanting to play a board game with other people, but finding the people can be the most difficult part. This website allows you to search for users in a certain area around the user's location. Filtering by type of board game is also supported. Additionally, users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create accounts
- [X] Create sessions (log in)
- [X] Create groups
- [X] Create events
- [X] View groups and events
- [X] Subscribe to groups
- [X] RSVP to events
- [X] View subscribed Groups
- [X] Edit Events
- [X] Edit Groups
- [X] Comment on Event
- [X] Add calendar view
- [X] Search for groups

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Group and Event Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. This phase will allow users to create groups and events and visit rudimentary pages with each of these resources. The app will be pushed to Heroku before continuing.

[Details][phase-one]

### Phase 2: Viewing Groups and Events (~2 days)
I will add API routes which will render json and parse out association data. With the JSON data I will be able to display individual show pages for groups and events as well as display indeces of both. I will also finish the user show page to display all of the groups a user belongs to.

[Details][phase-two]

### Phase 3: Editing and Displaying Groups and Events (~2 days)
I will create forms for creating and editing groups and events. Successful submission of these forms redirects the user to the created resource's show page. As a bonus, I will add Filepicker to enable user upload of images for profile pics and groups.

[Details][phase-three]

### Phase 4: Comments and Event Feed (~1-2 days)
I'll add a Comment model which will allow users to comment on events and I will create a Backbone view to display comments on an individual event show page. Additionally, I will create an events feed which will be displayed in place of the groups index which shows upcoming events for groups the user subscribes to.

[Details][phase-four]

### Phase 5: Searching (~2 days)
Adds views to the main page which allow for querying groups based on their geographic location, and displays groups without a page reload.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Create tags and allow tags to belong to both users and groups
- [ ] Add pictures for blogs and users

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
