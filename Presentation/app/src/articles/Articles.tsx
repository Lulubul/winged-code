import * as React from 'react';
import { 
  Grid, CardHeader, Card, Avatar, IconButton, StyledComponentProps, WithStyles, withStyles
} from 'material-ui';
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
import { StyleRules } from 'material-ui/styles';

const articleStyle: StyleRules = {
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
};

interface Article {
  title: string;
  pubDate: string;
  image: string;
  summary: string;
}

interface ArticlesState {
  articles: Article[];
}

type PropsWithStyles = StyledComponentProps & WithStyles<keyof typeof articleStyle>;

class Articles extends React.Component<PropsWithStyles, ArticlesState> {
  private store: firebase.firestore.Firestore;
  private images = { core, microservices, pwa };

  constructor(props: PropsWithStyles) {
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
        <Grid item={true} xs={12} style={articleStyle.item}>
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
      <Card key={index} style={articleStyle.card}>
        <CardHeader
          avatar={<Avatar aria-label="Recipe" style={articleStyle.avatar}> D </Avatar>}
          action={<IconButton><MoreVertIcon /></IconButton>}
          title={article.title}
          subheader={article.pubDate}
        />
        <CardMedia
          style={articleStyle.media}
          image={this.images[article.image]}
        />
        <CardContent>
          <Typography component="p">
            {article.summary}
          </Typography>
        </CardContent>
        <CardActions style={articleStyle.actions} disableActionSpacing={true}>
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

export default withStyles(articleStyle)<PropsWithStyles>(Articles);
