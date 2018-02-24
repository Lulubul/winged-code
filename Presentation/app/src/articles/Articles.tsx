import * as React from 'react';
import { Grid, CardHeader, Card, Avatar, IconButton } from 'material-ui';
import { CardMedia, CardContent, Typography, CardActions } from 'material-ui';
import { red } from 'material-ui/colors';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import * as firebase from 'firebase';
require('firebase/firestore');
import core from './images/core.png';
import microservices from './images/microservices.png';
import pwa from './images/pwa.png';

const styles = ({
  item: {
    maxWidth: 800,
    width: '98%',
  },
  card: {
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
  title: string;
  pubDate: string;
  image: string;
  summary: string;
}

interface ArticlesState {
  articles: Article[];
}

export default class Articles extends React.Component<{}, ArticlesState> {
  private store: firebase.firestore.Firestore;
  private images = { core, microservices, pwa };

  constructor(props: {}) {
    super(props);
    this.state = { articles: []};
    this.store = firebase.firestore();
  }

  render() {
    const articles = this.state.articles;
    if (articles == null) {
      return;
    }
    return (
      <Grid container={true} justify={'center'} spacing={24}>
        <Grid item={true} xs={12} style={styles.item}>
          {articles.map((article, index) => this.createCard(index, article))}
        </Grid>
      </Grid>
    );
  }

  componentDidMount() {
    this.store
      .collection('articles')
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        const articles: Article[] = querySnapshot.docs.map(doc => doc.data() as Article);
        this.setState({articles: articles});
      });
  }

  private createCard = (index: number, article: Article) => {
    return (
      <Card key={index} style={styles.card}>
        <CardHeader
          avatar={<Avatar aria-label="Recipe" style={styles.avatar}> D </Avatar>}
          action={<IconButton><MoreVertIcon /></IconButton>}
          title={article.title}
          subheader={article.pubDate}
        />
        <CardMedia
          style={styles.media}
          image={this.images[article.image]}
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
