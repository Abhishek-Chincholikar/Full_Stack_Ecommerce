// import React, { useEffect, useState } from 'react'
// import Hero from '../Components/Hero/Hero'
// import Popular from '../Components/Popular/Popular'
// import Offers from '../Components/Offers/Offers'
// import NewCollections from '../Components/NewCollections/NewCollections'
// import NewsLetter from '../Components/NewsLetter/NewsLetter'

// const Shop = () => {

//   const [popular, setPopular] = useState([]);
//   const [newcollection, setNewCollection] = useState([]);

//   const fetchInfo = () => { 
//     fetch('https://quick-cart-backend-z224.onrender.com/popularinwomen') 
//             .then((res) => res.json()) 
//             .then((data) => setPopular(data))
//     fetch('https://quick-cart-backend-z224.onrender.com/newcollections') 
//             .then((res) => res.json()) 
//             .then((data) => setNewCollection(data))
//     }

//     useEffect(() => {
//       fetchInfo();
//     }, [])


//   return (
//     <div>
//       <Hero/>
//       <Popular data={popular}/>
//       <Offers/>
//       <NewCollections data={newcollection}/>
//       <NewsLetter/>
//     </div>
//   )
// }

// export default Shop



import React, { useEffect, useState, useRef } from 'react' // 1. IMPORT useRef
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {

    const [popular, setPopular] = useState([]);
    const [newcollection, setNewCollection] = useState([]);
    
    // 2. CREATE THE REF
    const newCollectionsRef = useRef(null); 

    const fetchInfo = () => { 
        fetch('https://quick-cart-backend-z224.onrender.com/popularinwomen') 
            .then((res) => res.json()) 
            .then((data) => setPopular(data))
        fetch('https://quick-cart-backend-z224.onrender.com/newcollections') 
            .then((res) => res.json()) 
            .then((data) => setNewCollection(data))
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    // 3. CREATE THE SCROLL FUNCTION AND PASS IT TO HERO
    const scrollToNewCollections = () => {
        if (newCollectionsRef.current) {
            newCollectionsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div>
            {/* 4. PASS THE SCROLL FUNCTION TO THE HERO */}
            <Hero onScrollClick={scrollToNewCollections} /> 
            <Popular data={popular} />
            <Offers />
            {/* 5. ATTACH THE REF TO THE NEWCOLLECTIONS COMPONENT */}
            <NewCollections ref={newCollectionsRef} data={newcollection} /> 
            <NewsLetter />
        </div>
    )
}

export default Shop