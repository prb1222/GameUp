# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151025020631) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "event_id",   null: false
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["event_id"], name: "index_comments_on_event_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "event_attendees", force: :cascade do |t|
    t.integer  "event_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "event_attendees", ["event_id"], name: "index_event_attendees_on_event_id", using: :btree
  add_index "event_attendees", ["user_id", "event_id"], name: "index_event_attendees_on_user_id_and_event_id", unique: true, using: :btree
  add_index "event_attendees", ["user_id"], name: "index_event_attendees_on_user_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.integer  "group_id",     null: false
    t.string   "title",        null: false
    t.string   "description",  null: false
    t.datetime "date",         null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "organizer_id"
    t.string   "address",      null: false
    t.string   "city",         null: false
    t.string   "state"
    t.float    "longitude",    null: false
    t.float    "latitude",     null: false
  end

  add_index "events", ["group_id"], name: "index_events_on_group_id", using: :btree

  create_table "genre_taggings", force: :cascade do |t|
    t.integer  "genre_id",      null: false
    t.integer  "taggable_id",   null: false
    t.string   "taggable_type", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "genre_taggings", ["genre_id"], name: "index_genre_taggings_on_genre_id", using: :btree
  add_index "genre_taggings", ["taggable_type", "taggable_id"], name: "index_genre_taggings_on_taggable_type_and_taggable_id", using: :btree

  create_table "genres", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "group_memberships", force: :cascade do |t|
    t.integer  "group_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "group_memberships", ["group_id"], name: "index_group_memberships_on_group_id", using: :btree
  add_index "group_memberships", ["user_id", "group_id"], name: "index_group_memberships_on_user_id_and_group_id", unique: true, using: :btree
  add_index "group_memberships", ["user_id"], name: "index_group_memberships_on_user_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.integer  "owner_id",    null: false
    t.string   "title",       null: false
    t.string   "description", null: false
    t.string   "member_name", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "profile_id"
    t.integer  "jumbo_id"
    t.string   "city",        null: false
    t.string   "state"
    t.float    "longitude",   null: false
    t.float    "latitude",    null: false
  end

  add_index "groups", ["owner_id"], name: "index_groups_on_owner_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "image_url",      null: false
    t.integer  "imageable_id",   null: false
    t.string   "imageable_type", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "images", ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.text     "bio"
    t.string   "location",        null: false
    t.float    "longitude",       null: false
    t.float    "latitude",        null: false
  end

end
