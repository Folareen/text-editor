import React from 'react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { IconButton } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth} from '../firebase'
import useUser from '../hooks/useUser';

export default function LogoutButton (){
    const { setUser} = useUser()

    const logout = async () => {

        try{
            await signOut(auth)
            setUser(null) 
            console.log('out')   
        }
        catch{
            alert('failed to sign out')
        }
    }


    return (
        <IconButton sx={{ mr: 0, ml: 2, color:"error.dark", border: 1, bgolor: 'error.dark'}} onClick={logout} >
            <LogoutRoundedIcon />
        </IconButton>
    )
  }