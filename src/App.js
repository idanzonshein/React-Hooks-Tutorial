import React, { useState } from 'react'
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm.js'
import EditUserForm from './forms/EditUserForm'

const App = () => {
  const usersData = [
    { id: 1, name: "Idan", username: "idan50z", spiritAnimal: "Dog" },
    { id: 2, name: "Kait", username: "nurselover12", spiritAnimal: "Wolf" },
    { id: 3, name: "John", username: "golfhobby90", spiritAnimal: "Whale" },
  ]

  const [users, setUsers] = useState(usersData)

  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = (id) => {
    setEditing(false)

    setUsers(users.filter((user) => user.id !== id))
  }

  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', username: '', spiritAnimal: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const editRow = (user) => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username, spiritAnimal: user.spiritAnimal})
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  const deleteUsers = (event) => {
    event.preventDefault()

    setUsers([])
  }



  return(
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
      <div className="flex-large">
  {editing ? (
    <div>
      <h2>Edit user</h2>
      <EditUserForm
        setEditing={setEditing}
        currentUser={currentUser}
        updateUser={updateUser}
      />
    </div>
  ) : (
    <div>
      <h2>Add user</h2>
      <AddUserForm addUser={addUser} />
    </div>
  )}
</div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
          <button
            className="button muted-button"
            onClick={deleteUsers}>
            {'Delete All Users'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App;
