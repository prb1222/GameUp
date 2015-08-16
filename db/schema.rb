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

ActiveRecord::Schema.define(version: 20150815085719) do

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
  add_index "event_attendees", ["user_id"], name: "index_event_attendees_on_user_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.integer  "group_id",     null: false
    t.string   "title",        null: false
    t.string   "description",  null: false
    t.datetime "date",         null: false
    t.string   "location",     null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "organizer_id"
  end

  add_index "events", ["group_id"], name: "index_events_on_group_id", using: :btree

  create_table "group_memberships", force: :cascade do |t|
    t.integer  "group_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "group_memberships", ["group_id"], name: "index_group_memberships_on_group_id", using: :btree
  add_index "group_memberships", ["user_id"], name: "index_group_memberships_on_user_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.integer  "owner_id",    null: false
    t.string   "title",       null: false
    t.string   "location",    null: false
    t.string   "description", null: false
    t.string   "member_name", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "groups", ["owner_id"], name: "index_groups_on_owner_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
