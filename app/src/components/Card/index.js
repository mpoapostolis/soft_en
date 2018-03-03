import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classnames from "classnames";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import red from "material-ui/colors/red";
import Pindrop from "material-ui-icons/PinDrop";
import Favorite from "material-ui-icons/Favorite";
import ShareIcon from "material-ui-icons/Share";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import MoreVertIcon from "material-ui-icons/MoreVert";
import Button from "material-ui/Button";

const styles = theme => {
  return {
    card: {
      margin: "20px",
      maxWidth: 365,
      minWidth: 365
    },
    media: {
      height: 194
    },
    actions: {
      display: "flex"
    },
    expand: {
      margin: "10px",
      marginLeft: "auto"
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    },
    bookBtn: {
      justifyContent: "flex-end"
    }
  };
};

class RecipeReviewCard extends React.Component {
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, ActivityName, Pictures, CompanyName, Price } = this.props;

    return (
      <div>
        <Card className={classes.card} style={{ zIndex: 0 }}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {ActivityName[0]}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={ActivityName}
            subheader={`${CompanyName}`}
          />
          <CardMedia
            className={classes.media}
            image={`https://191.232.161.178:4001${Pictures[0]}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p" >{Price}€</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <Pindrop />
            </IconButton>
            <IconButton aria-label="Share">
              <Favorite />
            </IconButton>
            <IconButton aria-label="Share" />
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
