import React, {useState} from 'react'
import { Grid,Typography, Paper, TextField, Container, Button, FormControl, Link, CircularProgress,Box, Alert } from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import {auth} from '../firebase'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate} from 'react-router-dom'
import useUser from '../hooks/useUser'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const {setUser} = useUser()

  const login = async (e) =>{
    e.preventDefault()
    setError(false)
    setLoading(true)

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password )
      setUser(userCredential)
      navigate('/')
    }
    catch{
      setError(true)
    }
    finally{
      setLoading(false)
    }
  }

    return (
    <Grid container direction="column" justifyContent="center" alignItems="center" height="100vh"
    >

      <Paper elevation={4} sx={{ width: '85%', maxWidth: 400, p:3, position: 'relative'}} >

        {
        error &&
        <Alert elevation={3} onClose={() => {setError(false)}} sx={{position: 'absolute', top: '-50px', right: 0, left: 0}} severity='error'>Invalid Email or Password!</Alert> 
        }

        <Typography variant="h2" gutterBottom align={'center'} color='secondary.dark' sx={{fontSize: 40, fontWeight: 'bold', mb:2}}>
          Text Editor
        </Typography>

        <Typography variant="h3" align='center' sx={{fontSize: 25, fontWeight: 'bold', mb:1, color:'primary.dark'}} >
          Login
        </Typography>

        <FormControl component='form' fullWidth>
          <TextField required id="outlined-required" label="Email Address" sx={{my: 2 }} fullWidth value={email} onChange={(e)=>{setEmail(e.target.value)}}
          />
          <TextField required id="outlined-password-input" label="Password" type="password" autoComplete="current-password" fullWidth sx={{my: 2}} value={password} onChange={(e)=>{setPassword(e.target.value)}}
          />        

          <Box sx={{position: 'relative'}}>

            <Button variant="contained"  align='center' type='submit' sx={{my: 2, py: 2, fontWeight: 'bold', bgcolor:'primary.dark', color: 'primary'}} onClick={login} disabled={loading} fullWidth>Login</Button>

            {loading && (
              <CircularProgress
                size={24}
                sx={{color: 'success.main',position: 'absolute',top: '50%',left: '50%',marginTop: '-12px',marginLeft: '-12px',
                }}
            />
            )}

          </Box>



          <Container sx={{display: 'flex', justifyContent:'center', alignItems:'center'}} >
            <Typography component='p' sx={{p:0.5}}>
              Don't have an account?
            </Typography>
            <Link to='/signup' component={RouterLink}  sx={{color:'background.paper', p:0.5, bgcolor:'primary.main'}} underline="none" >
              Signup
            </Link>
          </Container>
        
        </FormControl>

      </Paper>
    </Grid>
    )
  }