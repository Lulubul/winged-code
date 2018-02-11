import * as React from 'react';
import { Grid, CardHeader, Card, Avatar, IconButton } from 'material-ui';
import { CardMedia, CardContent, Typography, CardActions } from 'material-ui';
import { red } from 'material-ui/colors';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const styles = ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 194,
    margin: 10
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export default class Articles extends React.Component {

  render() {
    const articles = [1, 2, 3].map(x => this.createCard(x));
    return (
      <Grid container={true} justify={'center'}>
        <Grid item={true} style={{ padding: 20 }}>
          {articles}
        </Grid>
      </Grid>
    );
  }

  private createCard = (index: number) => {
    return (
      <Card style={styles.card} key={index}>
        <CardHeader
          avatar={<Avatar aria-label="Recipe" style={styles.avatar}> D </Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Intro into ASP.NET CORE 2"
          subheader="September 14, 2018"
        />
        <CardMedia
          style={styles.media}
          // tslint:disable-next-line:max-line-length
          image="http://www.gokhan-gokalp.com/wp-content/uploads/2017/06/ASP.NET-Core-Logo_2colors_Boxed_RGB_bitmap_BIG.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography component="p">
            NET Core MVC with controllers and views. Razor Pages is a new alternative in ASP.NET Core 2.0,
            a page-based programming model that makes building web UI easier and more productive.
      </Typography>
        </CardContent>
        <CardActions style={styles.actions} disableActionSpacing={true}>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
