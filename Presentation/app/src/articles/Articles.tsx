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
    marginTop: 25
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

interface Article {
  index: number;
  title: string;
  subheader: string;
  image: string;
  summary: string;
}

export default class Articles extends React.Component {

  render() {

    const articles: Article[] = [
      {
        index: 1,
        title: 'Intro into ASP.NET CORE 2',
        subheader: 'January 14, 2018',
        image: 'https://goo.gl/dWF3c8',
        summary: `NET Core MVC with controllers and views. Razor Pages is a new alternative in ASP.NET Core 2.0,
                  a page-based programming model that makes building web UI easier and more productive.`
      },
      {
        index: 2,
        title: 'Micro Applications and Microservices Together',
        subheader: 'January 18, 2018',
        image: 'https://goo.gl/5jJvUy',
        summary: `This post discusses the integration between rich-UI and backend services. 
                  A rich-UI is decomposed as multiple logical pieces, each called a micro-application.
                  The backend services are similarly broken into multiple pieces as microservices.`
      },
      {
        index: 3,
        title: 'Progressive Web Apps',
        subheader: 'January 24, 2018',
        image: 'https://goo.gl/dWfuVF',
        summary: `A new way to deliver amazing user experiences on the web.`
      }
    ];

    return (
      <Grid container={true} justify={'center'}>
        <Grid item={true}>
          {articles.map(article => this.createCard(article))}
        </Grid>
      </Grid>
    );
  }

  private createCard = (article: Article) => {
    return (
      <Card style={styles.card} key={article.index}>
        <CardHeader
          avatar={<Avatar aria-label="Recipe" style={styles.avatar}> D </Avatar>}
          action={<IconButton><MoreVertIcon /></IconButton>}
          title={article.title}
          subheader={article.subheader}
        />
        <CardMedia
          style={styles.media}
          image={article.image}
        />
        <CardContent>
          <Typography component="p">
            {article.summary}
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
