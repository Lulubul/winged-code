import * as React from 'react';
import {
    Typography, Grid, List, Paper, ListItemAvatar,
    ListItem, ListItemText, Avatar, StyledComponentProps, WithStyles, Chip, Divider
} from 'material-ui';
import WorkIcon from 'material-ui-icons/Work';
import withStyles from 'material-ui/styles/withStyles';
import { StyleRules } from 'material-ui/styles';

var styles: StyleRules = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px',
        li: {
            padding: '20px',
        }
    },
    grid: {
        padding: '20px',
        margin: 'auto',
        width: '40%'
    },
    chip: {
        margin: '5px',
    }
};

interface ProfileState {
    frameworks: { key: number; label: string }[];
}

type PropsWithStyles = StyledComponentProps & WithStyles<keyof typeof styles>;

class Profile extends React.Component<PropsWithStyles, ProfileState> {

    constructor(props: PropsWithStyles) {
        super(props);
        this.state = {
            frameworks: [
                { key: 0, label: 'Angular' },
                { key: 1, label: 'React' },
                { key: 2, label: 'ASP.Net Core' },
                { key: 3, label: 'Vue.js' },
            ],
        };
    }

    render() {
        const workPlaces = this.listWorkplaces();
        return (
            <Grid container={true} justify={'center'}>
                <Grid item={true} style={styles.grid} >
                    <Paper className={this.props.classes.root}>
                        <List dense={true}>
                            <li>
                                <Typography variant="title" align={'center'}>
                                    My journey as a Software Developer
                                </Typography>
                            </li>
                            <li>
                                <Divider />
                            </li>
                            {workPlaces}
                            <li>
                                <Divider />
                            </li>
                            <li>
                                {this.state.frameworks.map(data => {
                                    return (
                                        <Chip key={data.key} label={data.label} className={this.props.classes.chip} />
                                    );
                                })}
                            </li>
                            <li>
                                <Divider />
                            </li>
                            <li>
                                <Typography align={'center'} variant="title">
                                    My journey on GitHub: <a href="https://github.com/Lulubul">Click</a>
                                </Typography>
                            </li>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        );
    }

    private listWorkplaces = (): JSX.Element[] => {
        const workPlaces = [
            'AROBS Transilvania',
            'Maxcode',
            'Levi9 It Services',
            'Freelancer',
            'Evolve Media',
            'Charge Studios'
        ];
        return workPlaces.map((workPlace, index) => this.creatWorkPlaceElement(workPlace, 'Software Developer', index));
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