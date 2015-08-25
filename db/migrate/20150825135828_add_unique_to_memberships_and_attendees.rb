class AddUniqueToMembershipsAndAttendees < ActiveRecord::Migration
  def change
    add_index :event_attendees, [:user_id, :event_id], unique: true
    add_index :group_memberships, [:user_id, :group_id], unique: true
  end
end
