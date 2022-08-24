import React, { useEffect, useState} from 'react'
import { AppBar, Box, Toolbar, IconButton, InputBase, Grid, Typography, Button,Dialog, DialogTitle, DialogActions, DialogContent,TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import DocumentPreviewCard from '../components/DocumentPreviewCard';
import LogoutButton from '../components/LogoutButton';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import ColorModeButton from '../components/ColorModeButton'
import '../styles/style.css'
import { db } from '../firebase'
import { collection, addDoc} from "firebase/firestore";
import useDocuments from '../hooks/useDocuments';
import useUser from '../hooks/useUser';
import getAllDocuments from '../utils/getAllDocuments';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import displayDateAndTime from '../utils/displayDateAndTIme'


export default function DocumentsPreview () {
    const { user} = useUser()
    const [displayedDocuments, setDisplayedDocuments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [newDocTitle, setNewDocTitle] = useState('');
    const [newDocDescription, setNewDocDescription] = useState('')
    const [newDocCreating, setNewDocCreating] = useState(false)
    const navigate = useNavigate()

    const {documents, setDocuments} = useDocuments()

    const addNewDoc = async (e) =>{
        e.preventDefault()
        setNewDocCreating(true)

        const docRef = await addDoc(collection(db, user.uid), {
            title: newDocTitle,
            description: newDocDescription,
            date: displayDateAndTime()
        });
        setDocuments(await getAllDocuments(user))
        setShowModal(false)
        navigate(`/${docRef.id}`)
    }

    const showAddNewDocumentModal = () =>{
        setShowModal(true)
        setNewDocTitle('')
        setNewDocDescription('')
    }

    useEffect(
        ()=> {
            setDisplayedDocuments(documents)
            console.log(displayedDocuments)
            console.log('set new displayed documents!!')
        }, [documents]
    )


    return (
    <Box >
        <AppBar position="sticky" sx={{color:'text.primary', py: 0.5}} elevation={10}>
            <Toolbar sx={{display: 'flex', justifyContent:'space-between'}} >

                <Box sx={{flex: 1, border:1,borderRadius: 10, display:'flex', p: 0.8}}>
                    <InputBase
                        sx={{ flex: 1,px:1, color: 'text.primary', fontSize: { xs: 16, md: 20}}}
                        placeholder="Search Document with title"
                        inputProps={{ 'aria-label': 'search Document' }}
                        type='search'
                    />

                    <IconButton type="button" sx={{border: 1 }} aria-label="search">
                        <SearchIcon />
                    </IconButton>            
                </Box>

                <ColorModeButton />
                
                <LogoutButton/>

            </Toolbar>
        </AppBar>

        <Typography component='p' sx={{textAlign: 'center',p: 1, color: 'primary.main', fontSize: 30 }} >
            Welcome, <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>
            {
                user && user.displayName
            }
            </span>.
        </Typography>


        {displayedDocuments && displayedDocuments.length > 0 ?
            <Grid container spacing={3} sx={{p:2}}>
            { displayedDocuments && 
                displayedDocuments.map(
                    ({id, data}) => {
                        const {title, description, date} = data
                        return <Grid item xs={12} sm={6} md={4} xxl={2} key={id}>
                        <DocumentPreviewCard id={id} title={title} description={description} date={date}/>
                        </Grid>
                    }
                )
            }
            </Grid>
            : 
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography component='p'>
                    No Documents found..
                    Add a Document with the floating green button below
                </Typography>
            </Box>   

        }

        <Dialog
                onClose={()=>{setShowModal(false)}}
                aria-labelledby="Create new document modal"
                open={showModal}
            >
        <DialogTitle id="New document title" onClose={()=>{setShowModal(false)}}>
          Create new Document
            <IconButton
            aria-label="close"
            onClick={()=>{setShowModal(false)}}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseRoundedIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField id="outlined" label="Title" required sx={{my: 2}} fullWidth onChange={(e) => {setNewDocTitle(e.target.value)}} value={newDocTitle}
          />
          <TextField id="outlined" label="Description" required sx={{my: 2}} fullWidth onChange={(e) => {setNewDocDescription(e.target.value)}} value={newDocDescription} multiline rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit' onClick={addNewDoc} color='success' variant='contained' disabled={newDocCreating}>
            {newDocCreating ? 'Creating..' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
        {/* } */}

        <IconButton elevation={5} sx={{boxShadow: 10, border: 1, p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', position: 'fixed', bottom: 10, right: 10, bgcolor: 'background.paper', '&:hover': {bgcolor: 'success.light'}}} 
            color='success' onClick={showAddNewDocumentModal} size='large'>
            <NoteAddRoundedIcon sx={{fontSize: {xs: 40, sm: 60, lg: 80}}}/>
        </IconButton>

    </Box>

  );
  }