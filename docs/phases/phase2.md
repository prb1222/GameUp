# Phase 2: Viewing Groups and Events

## Rails
### Models

### Controllers
Api::GroupsController (create, destroy, index, show)
Api::EventsController (create, destroy, show, update)

### Views
* groups/show.json.jbuilder
* events/show.json.jbuilder

## Backbone
### Models
* Group (parses nested `events` association)
* Event

### Collections
* Groups
* Events

### Views
* GroupShow (composite view, contains GroupDetail subview, EventFeed subview)
* GroupDetail
* GroupIndex (composite view contains GroupItem subview)
* EventsIndex (composite view, contains EventItem subviews)
* EventItem
* EventShow


## Gems/Libraries
