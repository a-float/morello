import './App.css';
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'
import SheetSelectDrawer from './components/sheetDrawer/SheetSelectDrawer'
import SettingsManager from './components/settingsDrawer/SettingsManager'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles';
import themes from './themes'
import TopBar from './components/TopBar'
import { createTheme } from "@mui/material";
import { TagManager, TagContext, Tag } from './TagManager';
import { SheetData, columns, tasks } from './database'
import SheetManager from './SheetManager';
import { TaskDisplay } from './components/tasks/TaskDisplay';

const LOCAL_STORAGE_KEY = "MyToDO"

type AppState = {
	isSheetsDrawerOpen: boolean,
	isSettingsDrawerOpen: boolean,
	darkMode: boolean,
	themeName: string,
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
		darkMode: false,
		themeName: themes[0].name,
	})
	const [tags, setTags] = useState<Tag[]>(TagManager.defaultTags)
	const [sheets, setSheets] = useState<SheetState>({
		sheets: { 'Basic sheet': { columns, tasks } }, // TODO change the initialization?
		currentSheet: 'Basic sheet'
	})

	const sheetManagerRef = useRef<SheetManager>(new SheetManager(sheets, setSheets))

	useEffect(() => {
		const storage = window.localStorage
		const data = storage.getItem(LOCAL_STORAGE_KEY)
		if (data !== null) {
			const json = JSON.parse(data)
			setSheets(json)
		}
	}, [])

	useEffect(() => {
		window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sheets))
		sheetManagerRef.current.sheetState = sheets	// update managers' states
		tagManagerRef.current.tags = tags
	}, [sheets, tags])

	const removeTagFromTasks = (targetId: number) => {
		setSheets(prevState => {
			console.log(prevState);
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

	const currentSheetData = sheets.sheets[sheets.currentSheet]
	return (
		<ThemeProvider theme={theme}>
			<TagContext.Provider value={{ tags, tagManager: tagManagerRef.current }}>
				<Box className="App" sx={{ position: 'relative', background: theme.palette.background.default, overflowX: "hidden", height: "100vh", display: 'flex', flexDirection: 'column' }}>
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

					<SettingsManager onToggleDrawer={toggleSettingsDrawer} isDrawerOpen={state.isSettingsDrawerOpen}
						currentThemeName={state.themeName}
						onSelectTheme={setTheme}
						onSetDarkMode={setDarkMode}
						isDarkMode={state.darkMode} />
				</Box >
			</TagContext.Provider>
		</ThemeProvider>
	)

}

export default App;