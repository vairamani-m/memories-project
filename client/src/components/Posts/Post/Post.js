import React from 'react';
import { Card , CardActions , CardContent , Button , Typography, CardMedia , Tooltip} from '@material-ui/core';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import  DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './style.js';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost , likePost } from '../../../actions/posts'



const Post =({post , setCurrentId}) => {
    
  const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

    return (
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title } />
                    <div className={classes.overlay} >
                        <Typography variant="h6">{post.name}</Typography>
                        <Typography varient="body2">{moment(post.createdAt).fromNow()}</Typography>
                    </div>
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Tooltip title="Edit Details">
                        <Button style={{color:'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="default"  />
                        </Button>
                        </Tooltip>
                    </div>)}
                    <div className={classes.details}>
                         <Typography varient="body2" color="textSecondary">{post.tags.map((tag)=> tag ? `#${tag} ` : '')}</Typography>
                    </div>
                        <Typography className={classes.title} varient="h5" gutterBottom >{post.title}</Typography>
                    <CardContent>
                        <Typography  variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Tooltip title="Like">
                       <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))} disabled={!user?.result}><Likes /></Button>
                       </Tooltip>
                       {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                       <Button size="small" color="primary"  onClick={handleClickOpen}><DeleteIcon fontSize="small" />Delete</Button>
                       )}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{post.title} posted by {post.name}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure to delete this memory?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="primary">
                                No
                            </Button>
                            <Button onClick={() => dispatch(deletePost(post._id))} variant="contained" color="secondary" autoFocus>
                                Yes
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </CardActions>
             </Card>
    )
}

export default Post