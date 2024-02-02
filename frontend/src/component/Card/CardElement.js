import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';

const CardElement = ({ jobTitle, description, category, location, id }) => {
	const { palette } = useTheme();

	console.log(description);
	return (
		<Card sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor: palette.primary.white }}>
			<CardContent>
				<Typography
					sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }}
					gutterBottom
				>
					<IconButton>
						<LocationOnIcon
							sx={{ color: palette.secondary.main, fontSize: 18 }}
						/>
					</IconButton>{' '}
					{location}
				</Typography>
				<Typography variant="h5" component="div">
					{jobTitle}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{category}
				</Typography>
				<Typography variant="body2">
					{/* Description: {description.split(' ').slice(0, 15).join(' ') + '...'} */}
					Description: {description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					disableElevation
					variant="contained"
					size="small"
					startIcon={<AddIcon />}
				>
					<Link
						style={{ textDecoration: 'none', color: 'white', boxShadow: 0 }}
						to={`/job/${id}`}
					>
						More Details
					</Link>
				</Button>
			</CardActions>
		</Card>
	);
};

export default CardElement;
