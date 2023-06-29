db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [
      {
        role: "readWrite",
        db:"tasks_manager_for_true_global"
      }
    ]

  }
)