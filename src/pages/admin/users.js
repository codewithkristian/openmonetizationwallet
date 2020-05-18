import React, {useEffect, useState} from "react"

import { Link } from 'gatsby'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import { v4 as uuidv4 } from 'uuid';

const UserForm = ({ onChange, user }) =>
  <div>
    <input
      name="name"
      onChange={evt => onChange('name', evt.target.value)}
      placeholder="Name"
      required
      value={user.name} />
    <input
      name="wallet"
      onChange={evt => onChange('wallet', evt.target.value)}
      placeholder="Wallet URL"
      required
      value={user.wallet} />
    <input
      name="share"
      onChange={evt => onChange('share', evt.target.value)}
      placeholder="Share (must add up to 100)"
      required
      type="number"
      value={user.share} />
  </div>

const User = ({ user }) =>
  <div>
    <div>
      {user.name} / {user.wallet} / {user.share}
    </div>
  </div>

const AdminUsersPage = () => {
  const [users, setUsers] = useState({})
  const [editing, setEditing] = useState(false)
  const [editedUsers, setEditedUsers] = useState(null)

  useEffect(() => {
    // do stuff here on window init
    // setUsers({})

    const id = uuidv4()
    setUsers({
      [id]: {
        id,
        name: "@signalnerve",
        wallet: "$signalnerve.com",
        share: 100
      }
    })
  }, [])

  const userKeys = Object.keys(users)

  const stopEdit = () => setEditing(false)
  const startEdit = () => {
    if (!editedUsers) {
      setEditedUsers(users)
    }
    setEditing(true)
  }

  const onChange = key => (field, value) => {
    const newUsers = Object.assign({}, editedUsers, {
      [key]: Object.assign({}, editedUsers[key], {
        [field]: value
      })
    })

    setEditedUsers(newUsers)
  }

  const save = evt => {
    evt.preventDefault()
    setUsers(editedUsers)
    setEditedUsers(null)
    setEditing(false)
  }

  const addWallet = evt => {
    evt.preventDefault()

    const id = uuidv4()
    setEditedUsers(Object.assign({}, editedUsers, {
      [id]: {
        id,
        name: '',
        wallet: '',
        share: null
      }
    }))
  }

  return (
    <Layout>
      <SEO title="Admin" />
      <h1>Users</h1>

      {editing ? (
        <form onSubmit={save}>
          {Object.keys(editedUsers).map(key =>
            <div>
              <UserForm key={key} onChange={onChange(key)} user={editedUsers[key]}/>
            </div>
          )}

          <button onClick={addWallet}>Add new wallet</button>
          <button type="submit">Save wallet configuration</button>
        </form>
      )
        : (
          <div>
            {userKeys.map(key =>
              <User key={key} user={users[key]} />)}
          </div>
        )
      }

      <div>
        {editing ?
         <button onClick={stopEdit}>Cancel edit</button>
         : <button onClick={startEdit}>Edit wallet configuration</button>}
      </div>
    </Layout>
  )
}

export default AdminUsersPage
