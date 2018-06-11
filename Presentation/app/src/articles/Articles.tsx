import * as React from 'react';
import { 
  Grid, CardHeader, Card, Avatar, IconButton, StyledComponentProps, WithStyles, withStyles
} from 'material-ui';
import { CardMedia, CardContent, Typography, CardActions } from 'material-ui';
import { red } from 'material-ui/colors';
import { Favorite, Share, MoreVert } from 'material-ui-icons';
import * as firebase from 'firebase';
require('firebase/firestore');
import core from './images/core.png';
import microservices from './images/microservices.png';
import pwa from './images/pwa.png';
import hci from './images/hci.png';
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

interface ArticleInfo {
  title: string;
  pubDate: string;
  image: string;
  summary: string;
}

interface ArticlesState {
  articles: ArticleInfo[];
}

type PropsWithStyles = StyledComponentProps & WithStyles<keyof typeof articleStyle>;

class Articles extends React.Component<PropsWithStyles, ArticlesState> {
  private fireStore: firebase.firestore.Firestore;
  private images = { core, microservices, pwa, hci };

  constructor(props: PropsWithStyles) {
    super(props);
    this.state = { articles: []};
    this.fireStore = firebase.firestore();
    this.fireStore.settings({ timestampsInSnapshots: true});
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
    this.fireStore
      .collection('articles')
      .orderBy('pubDate', 'desc')
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        const articles: ArticleInfo[] = querySnapshot.docs.map(doc => doc.data() as ArticleInfo);
        this.setState({articles: articles});
      });
  }

  private createCard = (index: number, article: ArticleInfo) => {
    return (
      <Card key={index} style={articleStyle.card}>
        <CardHeader
          avatar={<Avatar aria-label="Recipe" style={articleStyle.avatar}> D </Avatar>}
          action={<IconButton><MoreVert /></IconButton>}
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
            <Favorite />
          </IconButton>
          <IconButton aria-label="Share">
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(articleStyle)<PropsWithStyles>(Articles);
