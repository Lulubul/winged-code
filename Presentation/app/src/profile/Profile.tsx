import * as React from 'react';
import { Grid, Typography, ListItemText, ListItem, List, Avatar, ListItemAvatar } from 'material-ui';
import WorkIcon from 'material-ui-icons/Work';

const styles = {
    grid: {
        padding: 20,
    }
};

class Profile extends React.Component {
    render() {
        const workPlaces = this.listWorkplaces();

        return (
            <Grid container={true} justify={'center'}>
                <Grid item={true} style={styles.grid}>
                    <Typography>My journey as a Software Developer</Typography>
                    <List dense={true}>
                        {workPlaces}
                    </List>
                    <Typography>My journey on GitHub: <a href="https://github.com/Lulubul">Click</a></Typography>
                </Grid>
            </Grid>
        );
    }

    private listWorkplaces = (): JSX.Element[] => {
        const workPlaces = ['AROBS Transilvania', 'Maxcode', 'Levi9 It Services', 'Evolve Media', 'Charge Studios'];
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

export default Profile;
