// import React from 'react'
// import './NewCollections.css'
// import Item from '../Item/Item'

// const NewCollections = (props) => {
//   return (
//     <div className='new-collections' id='newcollections'>
//       <h1>NEW COLLECTIONS</h1>
//       <hr />
//       <div className="collections">
//         {props.data.map((item,index)=>{
//                 return <Item id={item.id} key={index} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
//             })}
//       </div>
//     </div>
//   )
// }

// export default NewCollections


import React, { forwardRef } from 'react' // 1. Import forwardRef
import './NewCollections.css'
import Item from '../Item/Item'

// 2. Wrap the component in forwardRef and accept the 'ref' prop
const NewCollections = forwardRef((props, ref) => {
  return (
    // 3. Attach the received ref to the main div
    <div className='new-collections' ref={ref}> 
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {props.data.map((item,index)=>{
                return <Item id={item.id} key={index} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
            })}
      </div>
    </div>
  )
}) // Closing parenthesis and semicolon for forwardRef

export default NewCollections