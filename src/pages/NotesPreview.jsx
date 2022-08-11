import React, { Component } from 'react'
import { AppBar, Box, Toolbar, IconButton, InputBase, Grid} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotesPreviewCard from '../components/NotesPreviewCard';

export default class NotesPreview extends Component {
  render() {
    return (
    <Box >
        <AppBar position="sticky" sx={{color:'info.main', py: 1}} elevation={10}>
            <Toolbar sx={{display: 'flex', justifyContent:'space-between'}} >

                <Box sx={{flex: 1, border:1,borderRadius: 10, display:'flex', color: 'info.main', p: 0.8}}>
                    <InputBase
                        sx={{ flex: 1, color:'info.main', px:1}}
                        placeholder="Search Notes with title"
                        inputProps={{ 'aria-label': 'search note' }}
                    />

                    <IconButton type="button" sx={{border: 1, color: 'secondary.main' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>            
                </Box>

                <IconButton sx={{border:1, mr: 0, ml: 2, color:"danger.main"}} >
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        <Grid>
            <NotesPreviewCard/>
        </Grid>
    </Box>

  );
  }
}





