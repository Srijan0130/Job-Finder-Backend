// import { createTheme } from '@mui/material/styles';

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#97C8A8"
//         },
//         secondary: {
//             main: "#97C8A8",
//             darkGreen: "#0B1B11"
//         }
//     }
// });
// import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

export const themeColors = (mode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: '#97C8A8',
						white: '#fff',
					},
					secondary: {
						main: '#97C8A8',
						darkGreen: '#0B1B11',
					},
			    }
			: {
					// palette values for dark mode
					primary: {
						main: '#0B1B11',
						white: '#0B1B11',
					},
					secondary: {
						main: "#97C8A8",
						darkGreen: '#0B1B11',
					},
					background: {
						default: '#1e1e1e',
					},
					text: {
						primary: '#fff',
						secondary: grey[500],
					},
			  }),
	},
});
