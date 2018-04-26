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
        <Card key={0} style={articleStyle.card}>
          <CardHeader
            avatar={<Avatar aria-label="Recipe" style={articleStyle.avatar}> D </Avatar>}
            action={<IconButton><MoreVertIcon /></IconButton>}
            title="Human computer interaction"
            subheader="project, infoiasi, hci"
          />
          <CardMedia
            style={articleStyle.media}
            image={hci}
          />
          <CardContent>
            <Typography component="p">
              I'm currently working on one educational project that involves Human computer interaction.
              The project is trying to resurrect Street Figher II with <a href="https://www.vuforia.com/">Vuforia</a>
              &nbsp;and &nbsp;<a href="https://unity3d.com/">Unity3d</a> using interaction design.
            </Typography>
            <hr/>
            <Typography component="p">
              Before doing anything at the project I've invested some time in reading 
              about Information Architecture and Visual Design.
              Also I've invested some days to discover more about branding and personas.
              After that I've started with QOC (Questions, options and criteria) and with 3 ideas 
              putted in 3 wireframes.
            </Typography>
            <hr/>
            <Typography component="p">
              After the documentation was complete I've decided to investigate 
              &nbsp;<a href="https://proto.io/">Proto.io</a> .
              A nice tool that allow you to create prototypes and lucky 
              for me he has material design as default package.
              So I've create a prototype for the app based on my wireframes using this cool tool. 
              &nbsp;<a href="https://danielunguru.proto.io/projects/"> Take a look... </a>
            </Typography>
            <hr/>
            <Typography component="p">
              Follow the project progress at <a href="https://hci.gitbook.io/gamion/">GAMICON Gitbook</a> or&nbsp; 
              <a href="https://github.com/Lulubul/HCI">GAMICON github</a>
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
