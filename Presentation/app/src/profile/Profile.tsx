import * as React from 'react';
import {
    Typography, Grid, List, Paper, ListItemAvatar,
    ListItem, ListItemText, Avatar, StyledComponentProps, WithStyles, Chip, Divider
} from 'material-ui';
import firebase from 'firebase/app';
import 'firebase/firestore';
import WorkIcon from 'material-ui-icons/Work';
import withStyles from 'material-ui/styles/withStyles';
import { StyleRules } from 'material-ui/styles';
import { StoreCollections } from '../shared/StoreCollections';

const styles: StyleRules = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px',
        li: {
            padding: '20px',
        }
    },
    gridItem: {
        padding: '20px',
        margin: 'auto'
    },
    chip: {
        margin: '5px',
    }
};

interface WorkPlace {
    name: string;
}

interface Framework {
    name: string;
}

interface ProfileState {
    frameworks: Framework[];
    workplaces: WorkPlace[];
}

type PropsWithStyles = StyledComponentProps & WithStyles<keyof typeof styles>;

class Profile extends React.Component<PropsWithStyles, ProfileState> {

    private store: firebase.firestore.Firestore;

    constructor(props: PropsWithStyles) {
        super(props);
        this.store = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true};
        this.store.settings(settings);
        this.state = { workplaces: [], frameworks: [] };
    }

    async componentDidMount() {
        const [workplaceSnapshot, frameworksSnapshot ] = await Promise.all([
            this.store.collection(StoreCollections.Workplaces).get(),
            this.store.collection(StoreCollections.Frameworks).get()
        ]);
        const workplaces = workplaceSnapshot.docs.map(doc => doc.data() as WorkPlace);
        const frameworks = frameworksSnapshot.docs.map(doc => doc.data() as Framework);
        this.setState({ workplaces, frameworks});
    }

    render() {
        const workPlaces = this.listWorkplaces();
        return (
            <Grid container={true} justify={'center'}>
                <Grid item={true} style={styles.gridItem} xs={12}>
                    <Paper className={this.props.classes.root}>
                        <List dense={true}>
                            <ListItem>
                                <Typography variant="title" align={'center'}>
                                    My journey as a Software Developer
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Divider />
                            </ListItem>
                            {workPlaces}
                            <ListItem>
                                <Divider />
                            </ListItem>
                            <ListItem>
                                {this.state.frameworks.map((data, index) => {
                                    return (
                                        <Chip key={index} label={data.name} className={this.props.classes.chip} />
                                    );
                                })}
                            </ListItem>
                            <ListItem>
                                <Divider />
                            </ListItem>
                            <ListItem>
                                <Typography align={'center'} variant="title">
                                    My journey on GitHub: <a href="https://github.com/Lulubul">Click</a>
                                </Typography>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        );
    }

    private listWorkplaces = (): JSX.Element[] => {
        return this.state.workplaces
            .map((workPlace, index) =>  {
                return this.creatWorkPlaceElement(workPlace.name, 'Software Developer', index);
            });
    }

    private creatWorkPlaceElement = (workplace: string, position: string, index: number): JSX.Element => {
        return (
            <ListItem key={index}>
                <ListItemAvatar>
                    <Avatar><WorkIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={workplace} secondary={position} />
            </ListItem>
        );
    }
}

export default withStyles(styles)<PropsWithStyles>(Profile);