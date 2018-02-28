import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import Pindrop from 'material-ui-icons/PinDrop';
import Favorite from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Button from 'material-ui/Button';

const styles = theme => {
  return {
    card: {
      margin: '20px',
      maxWidth: 365,
    },
    media: {
      height: 194,
    },
    actions: {
      display: 'flex',
    },
    expand: {
      margin: '10px',
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    bookBtn: {
      justifyContent: 'flex-end',
    },
  };
};

class RecipeReviewCard extends React.Component {
  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Card className={classes.card} style={{zIndex: 0}}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3oLi28mehYu35oqgIz4mhi5gx3mo4HhLbEAuYI_kP4mqOLUA"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <Pindrop />
            </IconButton>
            <IconButton aria-label="Share">
              <Favorite />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <Button className={classes.expand} mini variant="raised">
              BOOK
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
