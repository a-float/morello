import './App.css';
import { FunctionComponent, useMemo, useState } from 'react'
import SheetManager from './components/SheetManager'
import SettingsManager from './components/SettingsManager'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles';
import themes from './themes'
import TopBar from './components/TopBar'
import { createTheme } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { TagManager, TagContext } from './TagManager';


type AppState = {
	isSheetsDrawerOpen: boolean,
	isSettingsDrawerOpen: boolean,
	darkMode: boolean,
	themeName: string,
	tagManager: TagManager
	// tagColorMap: Map<string, string>
}

const App: FunctionComponent<{}> = () => {
	const [state, setState] = useState<AppState>({
		isSheetsDrawerOpen: false,
		isSettingsDrawerOpen: false,
		darkMode: false,
		themeName: themes[0].name,
		tagManager: new TagManager()
		// tagColorMap: defaultTagColors
	})

	const toggleSheetDrawer = (toggle: boolean) => {
		setState({ ...state, isSheetsDrawerOpen: toggle })
	}
	const toggleSettingsDrawer = () => {
		setState({ ...state, isSettingsDrawerOpen: !state.isSettingsDrawerOpen })
	}
	const setTheme = (newThemeName: string) => {
		setState({ ...state, themeName: newThemeName })
	}
	const setDarkMode = (isDark: boolean) => {
		setState({ ...state, darkMode: isDark })
	}

	// Update the theme only if the mode changes
	const theme = useMemo(() => {
		const options = themes.find(t => t.name === state.themeName)?.options ?? {}
		options.palette.mode = (state.darkMode ? "dark" : "light")
		return createTheme(options)
	}, [state.themeName, state.darkMode])


	return (
		<ThemeProvider theme={theme}>
			<TagContext.Provider value={state.tagManager}>
				<CssBaseline />
				<Box className="App" sx={{ position: 'relative', background: theme.palette.background.default, overflowX: "hidden", height: "100vh", display: 'flex', flexDirection: 'column' }}>
					<TopBar isSheetDrawerOpen={state.isSheetsDrawerOpen}
						onToggleSheetDrawer={toggleSheetDrawer}
						onToggleSettingsDrawer={toggleSettingsDrawer} />
					<SheetManager onToggleDrawer={toggleSheetDrawer} isDrawerOpen={state.isSheetsDrawerOpen} />
					<SettingsManager onToggleDrawer={toggleSettingsDrawer} isDrawerOpen={state.isSettingsDrawerOpen}
						currentThemeName={state.themeName}
						onSelectTheme={setTheme}
						onSetDarkMode={setDarkMode}
						isDarkMode={state.darkMode} />
					<h1>{state.darkMode}</h1>
				</Box >
			</TagContext.Provider>
		</ThemeProvider>
	)

}

export default App;