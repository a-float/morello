import './App.css';
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'
import SheetSelectDrawer from './components/sheetDrawer/SheetSelectDrawer'
import SettingsDrawer from './components/settingsDrawer/SettingsDrawer'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles';
import themes, { createOptions } from './themes'
import TopBar from './components/TopBar'
import { createTheme } from "@mui/material";
import { TagManager, TagContext, Tag } from './logic/TagManager';
import TaskDisplay from './components/tasks/TaskDisplay';
import { createContext } from 'react';
import { SheetActionType, SheetData } from './logic/sheets/sheetTypes';
import { SheetState, useSheets } from './logic/sheets/useSheets';

const LS_VERSION_KEY = 'version'
const LS_SHEETS_KEY = "sheet_data"
const LS_TAGS_KEY = "tags"
const LS_THEME_KEY = "theme"
const CURRENT_VERSION = "0.123"

type AppState = {
	isSheetsDrawerOpen: boolean,
	isSettingsDrawerOpen: boolean,
}

type ThemeState = {
	darkMode: boolean,
	themeName: string
}

export const WindowSizeContext = createContext(false)

const App: FunctionComponent<{}> = () => {
	const [isMobile, setIsMobile] = useState(false)
	const [state, setState] = useState<AppState>({
		isSheetsDrawerOpen: false,
		isSettingsDrawerOpen: false,
	})
	const [themeState, setThemeState] = useState<ThemeState>({
		darkMode: false,
		themeName: themes[0].name,
	})
	const [tags, setTags] = useState<Tag[]>(TagManager.defaultTags)
	const [sheets, dispatchSheets] = useSheets()

	//choose the screen size 
	const handleResize = () => {
		if (window.innerWidth < 600) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}

	// load all data from local storage on startup
	useEffect(() => {
		window.addEventListener("resize", handleResize)
		const storage = window.localStorage
		const version = storage.getItem(LS_VERSION_KEY)
		if (!version || version !== CURRENT_VERSION) {
			console.log("Invalid version number. Clearing the local storage.");
			storage.clear()
			storage.setItem(LS_VERSION_KEY, CURRENT_VERSION)
			return
		}
		// TODO elements do not rerender when tags change
		const tags = storage.getItem(LS_TAGS_KEY)
		if (tags !== null) {
			setTags(JSON.parse(tags))
		}
		const sheets = storage.getItem(LS_SHEETS_KEY)
		if (sheets !== null) {
			const data = JSON.parse(sheets) as SheetState
			dispatchSheets({
				type: SheetActionType.FETCH,
				payload: { data }
			})
		}
		const theme = storage.getItem(LS_THEME_KEY)
		if (theme !== null) {
			setThemeState(JSON.parse(theme))
		}
	}, [dispatchSheets])

	// save sheets
	useEffect(() => {
		window.localStorage.setItem(LS_SHEETS_KEY, JSON.stringify(sheets))
	}, [sheets])

	// save tags
	useEffect(() => {
		window.localStorage.setItem(LS_TAGS_KEY, JSON.stringify(tags))
		tagManagerRef.current.tags = tags // update manager state
	}, [tags])

	// save theme
	useEffect(() => {
		window.localStorage.setItem(LS_THEME_KEY, JSON.stringify(themeState))
	}, [themeState])

	const removeTagFromTasks = (targetId: number) => {
		dispatchSheets({
			type: SheetActionType.REMOVE_TAG,
			payload: { tagId: targetId }
		})
	}

	const tagManagerRef = useRef<TagManager>(new TagManager(tags, setTags, removeTagFromTasks))

	const toggleSheetDrawer = (toggle: boolean) => {
		setState({ ...state, isSheetsDrawerOpen: toggle })
	}
	const toggleSettingsDrawer = () => {
		setState({ ...state, isSettingsDrawerOpen: !state.isSettingsDrawerOpen })
	}
	const setTheme = (newThemeName: string) => {
		setThemeState(prevState => ({ ...prevState, themeName: newThemeName }))
	}
	const setDarkMode = (isDark: boolean) => {
		setThemeState(prevState => ({ ...prevState, darkMode: isDark }))
	}


	const handleModifySheet = (data: SheetData) => {
		dispatchSheets({
			type: SheetActionType.UPDATE,
			payload: { data }
		})
	}
	// Update the theme only if the mode changes
	// TODO does it actually make a difference?
	const theme = useMemo(() => {
		let options = themes.find(t => t.name === themeState.themeName)?.options ?? {}
		options = createOptions(options, themeState.darkMode)
		return createTheme(options)
	}, [themeState])

	const currentSheetData = sheets.sheets[sheets.currentSheet]
	return (
		<ThemeProvider theme={theme}>
			<WindowSizeContext.Provider value={isMobile}>
				<TagContext.Provider value={{ tags, tagManager: tagManagerRef.current }}>
					<Box className="App" sx={{ background: theme.palette.background.default, height: "100vh", display: 'flex', flexDirection: 'column' }}>
						<TopBar isSheetDrawerOpen={state.isSheetsDrawerOpen}
							onToggleSheetDrawer={toggleSheetDrawer}
							onToggleSettingsDrawer={toggleSettingsDrawer} />

						<TaskDisplay
							tasks={currentSheetData.tasks}
							columns={currentSheetData.columns}
							onModifySheet={handleModifySheet}
							widthOffsets={{ left: state.isSheetsDrawerOpen ? 200 : 0, right: 0 }} />

						<SheetSelectDrawer onToggleDrawer={toggleSheetDrawer}
							isDrawerOpen={state.isSheetsDrawerOpen}
							sheetNames={[...Object.keys(sheets.sheets)]}
							sheetDispatch={dispatchSheets}
							selectedSheet={sheets.currentSheet} />

						<SettingsDrawer onToggleDrawer={toggleSettingsDrawer} isDrawerOpen={state.isSettingsDrawerOpen}
							currentThemeName={themeState.themeName}
							onSelectTheme={setTheme}
							onSetDarkMode={setDarkMode}
							isDarkMode={themeState.darkMode} />
					</Box >
				</TagContext.Provider>
			</WindowSizeContext.Provider>
		</ThemeProvider>
	)

}

export default App;