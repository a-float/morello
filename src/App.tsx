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
import SheetManager, {SheetData} from './logic/SheetManager';
import TaskDisplay from './components/tasks/TaskDisplay';

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

export type SheetState = {
	sheets: {
		[key: string]: SheetData
	},
	currentSheet: string
}

const App: FunctionComponent<{}> = () => {
	const [state, setState] = useState<AppState>({
		isSheetsDrawerOpen: false,
		isSettingsDrawerOpen: false,
	})
	const [themeState, setThemeState] = useState<ThemeState>({
		darkMode: false,
		themeName: themes[0].name,
	})
	const [tags, setTags] = useState<Tag[]>(TagManager.defaultTags)
	const [sheets, setSheets] = useState<SheetState>({
		sheets: {
			'My first todo sheet': {
				columns: [...SheetManager.defaultColumns],
				tasks: [
					{ id: "0", columnId: 0, name: "Arrive", descr: "Happy to see you c:", tagIds: [] },
					{ id: "1", columnId: 1, name: "Look around!", descr: "Take your time", tagIds: [] },
					{ id: "2", columnId: 2, name: "Try draggin tasks to other columns", tagIds: [1] },
					{ id: "3", columnId: 2, name: "Edit?", descr: "Double click on tasks or column names to edit them", tagIds: [3, 4, 5] },
					{ id: "4", columnId: 2, name: "Click on the cog icon to customize the theme", tagIds: [2] },
					{ id: "5", columnId: 2, name: "Enjoy!", tagIds: [3] },
				]
			}
		},
		currentSheet: 'My first todo sheet'
	})

	const sheetManagerRef = useRef<SheetManager>(new SheetManager(sheets, setSheets))

	// load all data from local storage on startup
	useEffect(() => {
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
			setSheets(JSON.parse(sheets))
		}
		const theme = storage.getItem(LS_THEME_KEY)
		if (theme !== null) {
			setThemeState(JSON.parse(theme))
		}
	}, [])

	// save sheets
	useEffect(() => {
		window.localStorage.setItem(LS_SHEETS_KEY, JSON.stringify(sheets))
		sheetManagerRef.current.sheetState = sheets	// update manager state
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
		setSheets(prevState => {
			const copy: { [key: string]: SheetData } = {}
			for (const sheetName of [...Object.keys(prevState.sheets)]) {
				copy[sheetName] = {
					columns: [...prevState.sheets[sheetName].columns],
					tasks: [...prevState.sheets[sheetName].tasks]
				}
				for (const task of copy[sheetName].tasks) {
					task.tagIds = task.tagIds.filter(tag => tag !== targetId)
				}
			}
			return ({
				currentSheet: prevState.currentSheet,
				sheets: copy
			})
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
			<TagContext.Provider value={{ tags, tagManager: tagManagerRef.current }}>
				<Box className="App" sx={{ background: theme.palette.background.default, height: "100vh", display: 'flex', flexDirection: 'column' }}>
					<TopBar isSheetDrawerOpen={state.isSheetsDrawerOpen}
						onToggleSheetDrawer={toggleSheetDrawer}
						onToggleSettingsDrawer={toggleSettingsDrawer} />

					<TaskDisplay
						tasks={currentSheetData.tasks}
						columns={currentSheetData.columns}
						onModifySheet={sheetManagerRef.current.updateSheet}
						widthOffsets={{ left: state.isSheetsDrawerOpen ? 200 : 0, right: 0 }} />

					<SheetSelectDrawer onToggleDrawer={toggleSheetDrawer}
						isDrawerOpen={state.isSheetsDrawerOpen}
						sheetNames={[...Object.keys(sheets.sheets)]}
						addSheet={sheetManagerRef.current.addSheet}
						selectSheet={sheetManagerRef.current.selectSheet}
						renameSheet={sheetManagerRef.current.renameSheet}
						deleteSheet={sheetManagerRef.current.deleteSheet}
						selectedSheet={sheets.currentSheet} />

					<SettingsDrawer onToggleDrawer={toggleSettingsDrawer} isDrawerOpen={state.isSettingsDrawerOpen}
						currentThemeName={themeState.themeName}
						onSelectTheme={setTheme}
						onSetDarkMode={setDarkMode}
						isDarkMode={themeState.darkMode} />
				</Box >
			</TagContext.Provider>
		</ThemeProvider>
	)

}

export default App;