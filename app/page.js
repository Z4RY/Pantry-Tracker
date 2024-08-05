"use client"

import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, setDoc, deleteDoc, getDoc} from "firebase/firestore";
import { yellow } from "@mui/material/colors";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 190,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const firebaseConfig = {
  apiKey: "AIzaSyCqHyx2ngYQNFWdESvZ9UMrzK4vGllPkOA",
  authDomain: "abpantryapp.firebaseapp.com",
  projectId: "abpantryapp",
  storageBucket: "abpantryapp.appspot.com",
  messagingSenderId: "383889454890",
  appId: "1:383889454890:web:df9ed0ee52663336459053",
  measurementId: "G-FRJJ2PE88Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    try {
      const pantryCollection = collection(firestore, 'pantry');
      const snapshot = query(pantryCollection);
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        pantryList.push({"name": doc.id, ...doc.data()});
      });
      console.log(pantryList);
      setPantry(pantryList);
    } catch (err) {
      console.error("Error fetching pantry items: ", err);
      setError("Failed to fetch pantry items.");
    }
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const normalizedItem = item.toLowerCase();
    const docRef = doc(collection(firestore, 'pantry'), normalizedItem);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const normalizedItem = item.toLowerCase();
    const docRef = doc(collection(firestore, 'pantry'), normalizedItem);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updatePantry();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPantry = pantry.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={'center'}
      flexDirection={"column"}
      alignItems={'center'}
      gap={'5'}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        paddingY={1}
        paddingX={2}
        color={'black'}
      >
        <Typography fontFamily={'Product sans'} marginLeft={'39vw'} fontSize={'3vw'} id="modal-modal-title" variant="h6" component="h2">
          Pantry Tracker
        </Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color={'black'} fontSize={'2vw'} fontFamily={'poppins'} paddingBottom={'1vw'}>
            Add Item
          </Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField
              id="outlined"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={async () => {
                await addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box display="flex" flexDirection="row" alignItems="flex-start" backgroundColor={'transparent'} width={'100%'} height={'85%'} position={'absolute'} top={'15%'} gap={20}>
        <Box
        width={'23vw'}
        height={'15vw'}
        // bgcolor={'red'}
        marginTop={'5vw'}
        marginLeft={'4vw'}
        >
          <Typography
          fontSize={'2vw'}
          fontFamily={'product sans'}
          color={'black'}
          >
              Keep track of Items
          </Typography>
          <Typography
          marginBottom={'2vw'}
          fontFamily={'poppins'}
          lineHeight={'1.4vw'}
          paddingTop={'0.5vw'}
          color={'black'}
          >
          Add pantry item to the list, and keep track of your inventory.
          </Typography>
        <Button id="add" variant="contained" fontSize = "5vw" onClick={handleOpen}>
          Add
        </Button>
        </Box>
        <Box width="1000px" bgcolor={'transparent'} id="box2" >
          <Box width="100%" height="535px" overflow={'auto'}>
          <Box
          width={'100%'}
          height={'9%'}
          bgcolor={'white'}
          borderRadius={'15px'}
          id = {'noob'}
          display={'flex'}
          justifyContent={'space-between'}
          >
          <Typography
          fontFamily={'reem kufi'}
          fontSize={'2vw'}
          paddingLeft={'0.7vw'}
          paddingBottom={'1vw'}
          color={'white'}
          >Items</Typography>
          <TextField
          label="Search"
          variant="outlined"
          // marginLeft= '10vw'
          // width = '10%'
          // height = '5%'
          value={searchQuery}
          bgcolor="white"
          id="search"
          onChange={handleSearchChange}
          // margin="normal"
        />
          </Box>
          <Box  
          marginTop={'1vw'}
          width={'95%'}
          height={'7.5%'}
          marginLeft={'2vw'}
          bgcolor={'#FEF4CD'}
          borderRadius={'15px'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          >
            <Typography color={'black'} fontFamily={'product sans'} paddingLeft={'0.5vw'}>
              Name
            </Typography>
            <Typography color={'black'} fontFamily={'product sans'}>
              quantity
            </Typography>
            <Typography color={'black'} fontFamily={'product sans'} paddingRight={'3.5vw'}>
              Actions
            </Typography>
          </Box>
            <Stack marginTop={'1vw'} width={'95%'} marginLeft={'2vw'} spacing={2}>
              {error ? (
                <Typography color={'red'}>{error}</Typography>
              ) : (
                filteredPantry.map(({ name, count }) => (
                  <Box
                    key={name}
                    width="100%"
                    height="7%"
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    bgcolor={'#FBF9F1'}
                    padding={0.2}
                    borderRadius={'15px'}
                  >
                    <Typography variant={'h6'} fontFamily={'poppins'} color={'#000'} paddingLeft={'0.5vw'} textAlign={'left'}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant={'h6'} color={'#333'}   paddingLeft={4} textAlign={'center'}>
                      {count}
                    </Typography>
                    <Stack direction="row" paddingRight={'0.5vw'}  spacing={1}>
                      <Button variant="contained" id="plus" onClick={() => addItem(name)}>
                        +
                      </Button>
                      <Button variant="contained" id="min" onClick={() => removeItem(name)}>
                        -
                      </Button>
                    </Stack>
                  </Box>
                ))
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}