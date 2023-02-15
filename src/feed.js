import React, { useState, useEffect } from 'react';
//import styles from './feed.module.css';
import { Card, CardHeader,CardContent, Input, IconButton, Face, Link, Typography, Stack, Avatar, Grid, Fab, Box, Modal, TextField, Button, CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { CardOverflow } from '@mui/joy';
//import Face from '@mui/icons-material/Face';
import CommentIcon from '@mui/icons-material/Comment';
//import Face from '@mui/icons-material/Face';
import { red } from '@mui/material/colors';
import Search from './search';
import axios from 'axios';
import { POST_URL } from './url';

function Item({ name, username, message }) {
  return (
    <Card sx={{
      minWidth: 200,
    }}>
      <CardHeader avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {name[0].toUpperCase()}
        </Avatar>
      }
        name={name}
        subheader={username}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </CardContent>
    </Card>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return debouncedValue;
}

async function searchPost(query) {
  try {
    let url = POST_URL;
    if (query) {
      url = `${POST_URL}?q=${query}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function createPost(name, username, message) {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const response = await axios.post(POST_URL, { name, username, message, user_email: user.email });
    return response.data.post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function Feed() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 500);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const refresh = async(debouncedSearchTerm) => {
    const data = await searchPost(debouncedSearchTerm ?? undefined);
        if (data) {
          setList(data.posts);
        } else {
          setList([]);
        }
  }
  useEffect(() => {
    (async() => {
      if (debouncedSearchTerm) {
        setLoading(true);
        refresh(debouncedSearchTerm);
      } else {
        setLoading(true);
        refresh(null);
      }
      setLoading(false);
    })();
  }, [debouncedSearchTerm]);
  return (<Stack style={{
    width: '100%',
    height: '100%',
  }}>
    <Search value={search} onChange={e => setSearch(e.target.value)} />
    <Box position={"relative"} height={'100%'}>
      {loading ? (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <CircularProgress />
        </div>
      ) : list.length > 0 ? <Grid sx={{
        marginTop: 1,
        paddingLeft: 1,
        width: '100%',
        position: 'absolute',
        height: 'calc(100% - 64px)',
        overflowX: 'hidden',
        overflowY: 'auto'
      }} container spacing={2}>
        {list.map((item) => <Grid padding={0} key={item} item xs={12} sm={6} md={4} sx={{
          padding: 0,
        }}>
          <Item name={item.user.name} username={item.username}  message={item.message} />
        </Grid>)}
      </Grid> : (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,

        }}>
          {(debouncedSearchTerm && !loading) ? "No results found! Create first post regarding this" : "Empty feed, click below to add items"}
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-name"
        aria-describedby="modal-modal-description"
      >
        <AddPost onClick={async (name, username, message) => {
          const post = await createPost(name, username, message);
          if (post) {
            setLoading(true);
            if (debouncedSearchTerm) {
              refresh(debouncedSearchTerm);
            } else {
              refresh(null);
            }
            setLoading(false);
          }
          handleClose();
        }} />
      </Modal>
      <Fab style={{
        position: 'absolute',
        bottom: 20,
        marginTop: 10,
        left: 20,
      }} color="primary" onClick={handleOpen} aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  </Stack>
  );

}

function AddPost(props) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [message, setMsg] = useState('');
  return (<Stack sx={style}>
    <TextField label="name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
    <TextField label="username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
    <TextField label="message" variant="outlined" value={message} onChange={(e) => setMsg(e.target.value)} />
    <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon   />
              </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="  Add a comment…"
          sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
        />

      <Link disabled underline="none" role="button">
        <br></br>
        POST
      </Link>
      </CardOverflow>
      
    <Button onClick={() => props.onClick(name, username, message)}>
        Post
    </Button>
  </Stack>
  );
}

Feed.propTypes = {};

Feed.defaultProps = {};

export default Feed;
