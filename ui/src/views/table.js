import {UserContext} from '../App'
import { useState, useEffect, useContext } from 'react'
import {TextInput} from 'react-native'

const Home = () => {
  const {user, setUser} = useContext(UserContext)
  const [items, setItems] = useState([])
  const [fetchTime, setFetchTime] = useState(false)
  const [globalEditMode, setGlobalEditMode] = useState(false)
  const [filter, setFilter] = useState(true)


  useEffect(() => {
    setFetchTime(false)
    fetch('http://localhost:8080/inventory')
    .then(res => res.json())
    .then(data => {
      data.forEach(e => e.editMode = false)
      data = data.sort((a,b) => a.id - b.id)
      if(filter && user){
        data = data.filter(e => e.userid === user.id)
      }
      setItems(data)
    })
  }, [fetchTime, filter])

  const deleteItem = (item) => {
    fetch('http://localhost:8080/inventory', {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setFetchTime(true)
    })
  }

  const handleChange = (key, value, index) => {
    let mutableItems = [...items]
    mutableItems[index][key] = value
    setItems(mutableItems)
  }

  const updateItem = (item) => {
    let sentItem = {...item}
    delete sentItem.editMode
    fetch('http://localhost:8080/inventory', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentItem),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setGlobalEditMode(false)
      setFetchTime(true)
    })
  }

  const createItem = () => {
    setGlobalEditMode(true)
    let item = {id:0, name:"FILL ME IN", desc:"FILL ME IN", quantity:0, userid: user.id, editMode: true, initialCreate: true}
    let mutableItems = [...items]
    mutableItems.unshift(item)
    setItems(mutableItems)
  }

  const submitItem = (item) => {
    let sentItem = {...item}
    delete sentItem.editMode
    delete sentItem.initialCreate
    delete sentItem.id
    fetch('http://localhost:8080/inventory', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentItem),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setGlobalEditMode(false)
      setFetchTime(true)
    })

  }


  return (
    <div style={{height: "100vh"}} className="bg-dark">
      {user ?
        <>
          <button className='btn w-100 btn-success' onClick={() => createItem()} disabled={globalEditMode}>Create Item</button>
          <button className='btn w-100 btn-info' onClick={() => setFilter(!filter)} disabled={globalEditMode}>{filter ? <>See all items</> : <>See my items</>}</button>
        </>
        :
        <></>
      }
      
      
      <table className="table table-hover table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Item #</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Manager ID</th>
            <th scope="col">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {items ? (
          <>
            {items.map((e,i) => (
              <tr key={i} style={{height: '20%'}}>
                <th scope='col'>{e.id}</th>
                <td><input type="text" onChange={e => handleChange('name', e.target.value, i)} value={e.name} disabled={!e.editMode}/></td>
                <td className='w-25'><TextInput style={{width: "100%", height: 50, color: "white"}} maxLength={100} multiline onChange={e => handleChange('desc', e.target.value, i)} value={e.desc} disabled={!e.editMode}/></td>
                <td><input type="number" onChange={e => handleChange('quantity', e.target.value, i)} value={e.quantity} min={0} disabled={!e.editMode}/></td>
                <td>{e.userid}</td>
                <td>
                  {e.editMode ? (
                    <>
                      <button className='btn btn-success' onClick={() => {e.initialCreate ? submitItem(e) : updateItem(e)}}>Submit</button>
                      <button className='btn btn-danger' disabled>Delete</button>
                    </>
                  ):(<>
                      <button className='btn btn-warning' onClick={() => {setGlobalEditMode(true);handleChange('editMode', true, i)}} disabled={globalEditMode || !user || !filter}>Edit</button>
                      <button className='btn btn-danger' onClick={() => deleteItem(e)} disabled={globalEditMode || !user || !filter}>Delete</button>
                    </>)}
                  
                </td>
              </tr>
            ))}
          </>) 
          : (<></>)}
        </tbody>
      </table>
    </div>
  )
}

export default Home